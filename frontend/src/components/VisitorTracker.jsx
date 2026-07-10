import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackVisitor } from "../services/visitor";

function VisitorTracker() {
  const location = useLocation();

  useEffect(() => {
    const recordVisit = async () => {
      const visitorId =
        localStorage.getItem("visitor_id") || crypto.randomUUID();

      localStorage.setItem("visitor_id", visitorId);

      const visitor = {
        visitor_id: visitorId,

        language: navigator.language,

        screen_width: window.screen.width,

        screen_height: window.screen.height,

        referrer: document.referrer,

        landing_page:
          sessionStorage.getItem("landing_page") || window.location.pathname,

        current_page: window.location.pathname,
      };

      sessionStorage.setItem("landing_page", visitor.landing_page);

      try {
        await trackVisitor(visitor);
      } catch (err) {
        console.error(err);
      }
    };

    recordVisit();
  }, [location]);

  return null;
}

export default VisitorTracker;
