import { useEffect, useRef, useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { sendLocation } from "../services/analytics";

const KEY = "loc_choice";
const DAY = 24 * 60 * 60 * 1000;

const readChoice = () => {
  try {
    return JSON.parse(localStorage.getItem(KEY));
  } catch {
    return null;
  }
};
const saveChoice = (state) => {
  try {
    localStorage.setItem(KEY, JSON.stringify({ state, at: Date.now() }));
  } catch {
    /* ignore */
  }
};

/*
  Asks - once, politely - for the visitor's area (suburb / town level).
  - Appears after 10 seconds, small, bottom-left, and can be dismissed.
  - "No thanks" is remembered for 90 days. If the browser has blocked
    location, we never ask at all.
  - If a visitor already allowed it before, it refreshes quietly (max once
    a week) with no prompt.
  - Needs https; on plain http it silently does nothing.
*/
function LocationPrompt() {
  const [show, setShow] = useState(false);
  const started = useRef(false);

  const capture = () => {
    const visitorId = localStorage.getItem("visitor_id");
    if (!visitorId || !navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        saveChoice("shared");
        sendLocation({
          visitor_id: visitorId,
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
        }).catch(() => {});
      },
      (err) => {
        if (err.code === 1) saveChoice("declined"); // permission denied
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 10 * 60 * 1000 },
    );
  };

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    let timer;
    let cancelled = false;

    (async () => {
      try {
        if (!window.isSecureContext || !navigator.geolocation) return;
        if (localStorage.getItem("token")) return; // never for the admin

        const choice = readChoice();

        let permission = "prompt";
        try {
          permission = (await navigator.permissions.query({ name: "geolocation" })).state;
        } catch {
          /* some browsers can't tell us - treat as "prompt" */
        }
        if (cancelled || permission === "denied") return;

        if (permission === "granted") {
          if (!choice || Date.now() - choice.at > 7 * DAY) capture();
          return;
        }

        if (choice?.state === "declined" && Date.now() - choice.at < 90 * DAY) return;

        timer = setTimeout(() => {
          if (!window.location.pathname.startsWith("/admin")) setShow(true);
        }, 10000);
      } catch {
        /* location is optional - never break the site */
      }
    })();

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, []);

  if (!show) return null;

  return (
    <div
      className="card shadow-lg border-0"
      style={{ position: "fixed", left: 16, bottom: 16, maxWidth: 340, zIndex: 1040, borderRadius: 16 }}
      role="dialog"
      aria-label="Share your area"
    >
      <div className="card-body p-3">
        <div className="d-flex">
          <FaMapMarkerAlt className="text-primary me-2 mt-1 flex-shrink-0" size={20} />
          <div>
            <div className="fw-bold">Where are you visiting from?</div>
            <p className="small text-muted mb-2">
              Optionally share your area (suburb or town only) so we can see where our visitors are.
              Your browser will ask you to confirm.
            </p>
            <div className="d-flex gap-2">
              <button
                className="btn btn-primary btn-sm px-3 py-1"
                onClick={() => {
                  setShow(false);
                  capture();
                }}
              >
                Share my area
              </button>
              <button
                className="btn btn-outline-secondary btn-sm px-3 py-1"
                onClick={() => {
                  saveChoice("declined");
                  setShow(false);
                }}
              >
                No thanks
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LocationPrompt;
