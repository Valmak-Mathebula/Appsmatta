import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import DataTable from "../../components/admin/table/DataTable";
import { getLeads } from "../../services/leads";

function Leads() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLeads();
  }, []);

  const loadLeads = async () => {
    try {
      const data = await getLeads();
      setLeads(data);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  const columns = [
    {
      key: "name",
      label: "Contact",
    },
    {
      key: "company",
      label: "Company",
    },
    {
      key: "email",
      label: "Email",
    },
    {
      key: "project_type",
      label: "Project",
    },
    {
      key: "budget",
      label: "Budget",
    },
    {
      key: "created_at",
      label: "Submitted",
    },
  ];

  return (
    <div className="container-fluid p-4">
      <DataTable
        title="Project Enquiries"
        columns={columns}
        data={leads}
        actions={(row) => (
          <button className="btn btn-primary btn-sm">View</button>
        )}
      />

      {loading && <div className="mt-3">Loading...</div>}
    </div>
  );
}

export default Leads;
