import { useEffect, useState } from "react";
import { getVisitorSummary, formatDuration } from "../../services/analytics";

const periods = [
  { label: "Today", days: 1 },
  { label: "Last 7 days", days: 7 },
  { label: "Last 30 days", days: 30 },
  { label: "Last 90 days", days: 90 },
  { label: "All time", days: 0 },
];

function BreakdownList({ title, items }) {
  const max = Math.max(1, ...items.map((i) => Number(i.sessions)));
  return (
    <div className="card border-0 shadow h-100">
      <div className="card-header bg-white">
        <h5 className="mb-0">{title}</h5>
      </div>
      <div className="card-body">
        {items.length === 0 && <div className="text-muted">No data yet</div>}
        {items.map((i) => (
          <div key={i.name} className="mb-3">
            <div className="d-flex justify-content-between small">
              <span className="text-capitalize">{i.name}</span>
              <strong>{i.sessions}</strong>
            </div>
            <div className="progress" style={{ height: 6 }}>
              <div className="progress-bar" style={{ width: `${(Number(i.sessions) / max) * 100}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Visitors() {
  const [days, setDays] = useState(30);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    getVisitorSummary(days)
      .then((d) => {
        if (active) {
          setData(d);
          setError("");
        }
      })
      .catch((err) => {
        if (active) setError(err.response?.data?.message || "Could not load visitor statistics.");
      });
    return () => {
      active = false;
    };
  }, [days]);

  const o = data?.overall || {};
  const cards = [
    { title: "Online now", value: o.online_now ?? 0, color: "danger" },
    { title: "Unique visitors", value: o.visitors ?? 0, color: "primary" },
    { title: "Visits (sessions)", value: o.sessions ?? 0, color: "success" },
    { title: "Page views", value: o.page_views ?? 0, color: "warning" },
    { title: "Avg time per page", value: formatDuration(o.avg_seconds_per_page), color: "info" },
    { title: "Avg time per visit", value: formatDuration(o.avg_session_seconds), color: "secondary" },
  ];

  const daily = data?.daily || [];
  const maxViews = Math.max(1, ...daily.map((d) => Number(d.views)));

  return (
    <div className="container-fluid p-4">
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
        <h2 className="fw-bold mb-0">Website Visitors</h2>

        <select
          className="form-select w-auto"
          value={days}
          onChange={(e) => setDays(Number(e.target.value))}
        >
          {periods.map((p) => (
            <option key={p.days} value={p.days}>
              {p.label}
            </option>
          ))}
        </select>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row g-4 mb-4">
        {cards.map((c) => (
          <div className="col-6 col-lg-4 col-xxl-2" key={c.title}>
            <div className={`card border-0 shadow border-start border-5 border-${c.color} h-100`}>
              <div className="card-body">
                <h6 className="text-muted">{c.title}</h6>
                <h2 className="fw-bold mb-0">{c.value}</h2>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Daily trend */}
      <div className="card border-0 shadow mb-4">
        <div className="card-header bg-white">
          <h5 className="mb-0">Page views per day</h5>
        </div>
        <div className="card-body">
          {daily.length === 0 ? (
            <div className="text-muted">No visits recorded yet</div>
          ) : (
            <div className="d-flex align-items-end gap-1" style={{ height: 160, overflowX: "auto" }}>
              {daily.map((d) => (
                <div
                  key={d.day}
                  className="bg-primary rounded-top flex-grow-1"
                  style={{ minWidth: 8, height: `${(Number(d.views) / maxViews) * 100}%`, minHeight: 3 }}
                  title={`${d.day}: ${d.views} views, ${d.visitors} visitors`}
                />
              ))}
            </div>
          )}
          {daily.length > 0 && (
            <div className="d-flex justify-content-between text-muted small mt-2">
              <span>{daily[0].day}</span>
              <span>{daily[daily.length - 1].day}</span>
            </div>
          )}
        </div>
      </div>

      {/* Per page */}
      <div className="card border-0 shadow mb-4">
        <div className="card-header bg-white">
          <h5 className="mb-0">Statistics per page</h5>
        </div>
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead>
              <tr>
                <th>Page</th>
                <th className="text-end">Views</th>
                <th className="text-end">Unique visitors</th>
                <th className="text-end">Avg time on page</th>
                <th className="text-end">Total time</th>
              </tr>
            </thead>
            <tbody>
              {(data?.pages || []).map((p) => (
                <tr key={p.page}>
                  <td>{p.page}</td>
                  <td className="text-end">{p.views}</td>
                  <td className="text-end">{p.visitors}</td>
                  <td className="text-end">{formatDuration(p.avg_seconds)}</td>
                  <td className="text-end">{formatDuration(p.total_seconds)}</td>
                </tr>
              ))}
              {data && data.pages.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center text-muted py-4">
                    No visits recorded yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-md-4">
          <BreakdownList title="Where visitors come from" items={data?.sources || []} />
        </div>
        <div className="col-md-4">
          <BreakdownList title="Devices" items={data?.devices || []} />
        </div>
        <div className="col-md-4">
          <BreakdownList title="Countries" items={data?.countries || []} />
        </div>
      </div>

      <p className="text-muted small mt-4">
        Time on page counts only while the page is open in a visible browser tab. Your own visits
        while logged in as admin, and search-engine bots, are not counted. Days use South African time.
      </p>
    </div>
  );
}

export default Visitors;
