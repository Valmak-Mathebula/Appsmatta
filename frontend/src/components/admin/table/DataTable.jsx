function DataTable({ title, columns, data, actions }) {
  return (
    <div className="card shadow border-0">
      <div className="card-header bg-white d-flex justify-content-between align-items-center">
        <h4 className="mb-0">{title}</h4>

        <input
          className="form-control"
          placeholder="Search..."
          style={{
            width: "300px",
          }}
        />
      </div>

      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0">
          <thead className="table-light">
            <tr>
              {columns.map((column) => (
                <th key={column.key}>{column.label}</th>
              ))}

              {actions && <th width="180">Actions</th>}
            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (actions ? 1 : 0)}
                  className="text-center py-5"
                >
                  No records found.
                </td>
              </tr>
            ) : (
              data.map((row, index) => (
                <tr key={index}>
                  {columns.map((column) => (
                    <td key={column.key}>{row[column.key]}</td>
                  ))}

                  {actions && <td>{actions(row)}</td>}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DataTable;
