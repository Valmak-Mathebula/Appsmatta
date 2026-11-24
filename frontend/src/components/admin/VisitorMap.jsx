import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { getVisitorLocations, formatDuration } from "../../services/analytics";

// Visitor data is untrusted text, so it is always escaped before going into a popup
const esc = (value) =>
  String(value ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

function popupHtml(v) {
  const place =
    [v.suburb, v.city].filter(Boolean).join(", ") ||
    [v.region, v.country].filter(Boolean).join(", ") ||
    "Unknown place";
  const precise = v.source === "browser";
  const pages = (v.pages || [])
    .slice(0, 8)
    .map((p) => `<li>${esc(p.page)} <span class="text-muted">· ${p.views}× · ${esc(formatDuration(p.seconds))}</span></li>`)
    .join("");

  const row = (label, value) =>
    `<tr><td class="text-muted pe-2">${label}</td><td>${esc(value)}</td></tr>`;

  return `
    <div style="min-width:230px;max-width:290px">
      <div class="fw-bold fs-6">${esc(place)}</div>
      <div class="small mb-2 ${precise ? "text-success" : "text-warning"}">
        ${precise ? "Precise area (shared by visitor)" : "Approximate (from IP address)"}
      </div>
      <table style="font-size:12px" class="mb-2"><tbody>
        ${row("Device", [v.device, v.browser, v.operating_system].filter(Boolean).join(" · "))}
        ${row("Came from", v.referrer_host || "Direct")}
        ${row("Visits", v.sessions)}
        ${row("Page views", v.views)}
        ${row("Total time", formatDuration(v.total_seconds))}
        ${row("First seen", v.first_seen)}
        ${row("Last seen", v.last_seen)}
        ${v.accuracy_m ? row("Accuracy", `about ${Number(v.accuracy_m) >= 1000 ? (v.accuracy_m / 1000).toFixed(1) + " km" : v.accuracy_m + " m"}`) : ""}
      </tbody></table>
      <div class="fw-bold" style="font-size:12px">Pages visited</div>
      <ul class="ps-3 mb-0" style="font-size:12px">${pages || "<li>-</li>"}</ul>
    </div>`;
}

function VisitorMap({ days }) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const layerRef = useRef(null);
  const [info, setInfo] = useState({ precise: 0, approx: 0, missing: 0 });
  const [error, setError] = useState("");

  // Create the map once
  useEffect(() => {
    const map = L.map(containerRef.current, { scrollWheelZoom: true }).setView([-28.5, 24.7], 5);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18,
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    layerRef.current = L.layerGroup().addTo(map);
    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Load the visitors and draw the points
  useEffect(() => {
    let active = true;

    getVisitorLocations(days)
      .then((data) => {
        if (!active || !mapRef.current) return;
        setError("");

        const layer = layerRef.current;
        layer.clearLayers();

        const points = [];
        let precise = 0;
        let approx = 0;

        data.visitors.forEach((v) => {
          const lat = Number(v.latitude);
          const lng = Number(v.longitude);
          const isPrecise = v.source === "browser";
          isPrecise ? precise++ : approx++;

          L.circleMarker([lat, lng], {
            radius: isPrecise ? 9 : 7,
            color: isPrecise ? "#0a58ca" : "#fd7e14",
            fillColor: isPrecise ? "#0d6efd" : "#fd7e14",
            fillOpacity: isPrecise ? 0.85 : 0.35,
            weight: 2,
          })
            .bindPopup(popupHtml(v), { maxHeight: 320 })
            .addTo(layer);

          points.push([lat, lng]);
        });

        setInfo({ precise, approx, missing: data.without_location });

        if (points.length > 0) {
          mapRef.current.fitBounds(points, { padding: [40, 40], maxZoom: 12 });
        }
      })
      .catch((err) => {
        if (active) setError(err.response?.data?.message || "Could not load the visitor map.");
      });

    return () => {
      active = false;
    };
  }, [days]);

  return (
    <div className="card border-0 shadow mb-4">
      <div className="card-header bg-white d-flex flex-wrap justify-content-between align-items-center gap-2">
        <h5 className="mb-0">Where visitors are</h5>
        <div className="small">
          <span className="me-3">
            <span className="badge rounded-pill" style={{ background: "#0d6efd" }}>&nbsp;</span> Precise ({info.precise})
          </span>
          <span className="me-3">
            <span className="badge rounded-pill" style={{ background: "#fd7e14" }}>&nbsp;</span> Approximate ({info.approx})
          </span>
          {info.missing > 0 && <span className="text-muted">{info.missing} with no location</span>}
        </div>
      </div>
      <div className="card-body p-0">
        {error && <div className="alert alert-danger m-3">{error}</div>}
        <div ref={containerRef} style={{ height: 460, width: "100%", borderRadius: "0 0 .375rem .375rem" }} />
      </div>
      <div className="card-footer bg-white text-muted small">
        Click a point for the visitor's details. Precise = the visitor allowed their browser to share
        their area (suburb/town level). Approximate = estimated from their IP address, which can be
        off by many kilometres.
      </div>
    </div>
  );
}

export default VisitorMap;
