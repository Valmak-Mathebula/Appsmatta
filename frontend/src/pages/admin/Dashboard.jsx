import { useEffect, useState } from "react";
import { getDashboardStats, getRecentLeads } from "../../services/dashboard";

function Dashboard() {
  const [stats, setStats] = useState({
    totalLeads: 0,
    newLeads: 0,
    contacted: 0,
    won: 0,
    lost: 0,
  });

  const [recentLeads, setRecentLeads] = useState([]);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const dashboardStats = await getDashboardStats();
      const recent = await getRecentLeads();

      setStats(dashboardStats);
      setRecentLeads(recent);
    } catch (err) {
      console.error(err);
    }
  };

  const cards = [
    {
      title: "Total Leads",
      value: stats.totalLeads,
      color: "primary",
    },
    {
      title: "New",
      value: stats.newLeads,
      color: "success",
    },
    {
      title: "Contacted",
      value: stats.contacted,
      color: "warning",
    },
    {
      title: "Won",
      value: stats.won,
      color: "info",
    },
    {
      title: "Lost",
      value: stats.lost,
      color: "danger",
    },
  ];

  return (
    <div className="container-fluid p-4">
      <h2 className="fw-bold mb-4">Dashboard</h2>

      <div className="row g-4 mb-5">
        {cards.map((card, index) => (
          <div className="col-md" key={index}>
            <div
              className={`card border-0 shadow border-start border-5 border-${card.color}`}
            >
              <div className="card-body">
                <h6 className="text-muted">{card.title}</h6>

                <h1 className="fw-bold">{card.value || 0}</h1>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="card shadow border-0">
        <div className="card-header bg-white">
          <h4 className="mb-0">Recent Enquiries</h4>
        </div>

        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead>
              <tr>
                <th>Name</th>

                <th>Company</th>

                <th>Project</th>

                <th>Status</th>

                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {recentLeads.map((lead) => (
                <tr key={lead.id}>
                  <td>{lead.name}</td>

                  <td>{lead.company}</td>

                  <td>{lead.project_type}</td>

                  <td>{lead.status}</td>

                  <td>{new Date(lead.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
