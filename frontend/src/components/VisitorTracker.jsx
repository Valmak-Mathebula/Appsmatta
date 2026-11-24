import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { API_URL } from "../services/api";

const post = (path, body) =>
  fetch(`${API_URL}/analytics/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    keepalive: true, // lets the final time update go through when the tab closes
  });

const getId = (storage, key) => {
  let id = storage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    storage.setItem(key, id);
  }
  return id;
};

/*
  Records every page view and how long the visitor actively spends on it
  (time only counts while the tab is visible). Admin pages and visits from
  a logged-in admin are never counted.
*/
function VisitorTracker() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname.startsWith("/admin") || localStorage.getItem("token")) return;

    const visitorId = getId(localStorage, "visitor_id");
    const sessionId = getId(sessionStorage, "session_id");

    // Only the first page of a visit carries the referrer
    let referrer = "";
    if (!sessionStorage.getItem("referrer_sent")) {
      referrer = document.referrer;
      sessionStorage.setItem("referrer_sent", "1");
    }

    let viewId = null;
    let cancelled = false;
    let activeMs = 0;
    let lastTick = document.hidden ? null : Date.now();

    const seconds = () =>
      Math.round((activeMs + (lastTick ? Date.now() - lastTick : 0)) / 1000);

    const sendTime = () => {
      if (!viewId) return;
      post("ping", { view_id: viewId, visitor_id: visitorId, seconds: seconds() }).catch(() => {});
    };

    const onVisibility = () => {
      if (document.hidden) {
        if (lastTick) {
          activeMs += Date.now() - lastTick;
          lastTick = null;
        }
        sendTime();
      } else {
        lastTick = Date.now();
      }
    };

    post("view", {
      visitor_id: visitorId,
      session_id: sessionId,
      page: pathname,
      referrer,
      language: navigator.language,
      screen_width: window.screen.width,
      screen_height: window.screen.height,
    })
      .then((r) => r.json())
      .then((data) => {
        if (!cancelled) viewId = data.view_id;
      })
      .catch(() => {});

    const timer = setInterval(() => {
      if (!document.hidden) sendTime();
    }, 15000);

    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pagehide", sendTime);

    return () => {
      clearInterval(timer);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pagehide", sendTime);
      sendTime(); // final time for the page being left
      cancelled = true;
    };
  }, [pathname]);

  return null;
}

export default VisitorTracker;
