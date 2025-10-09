import { useState, useMemo } from "react";
import Papa from "papaparse";

export default function DataTable({ csvUrl }) {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [loading, setLoading] = useState(false);

  const loadData = () => {
    setLoading(true);
    Papa.parse(csvUrl, {
      download: true,
      header: true,
      complete: (result) => {
        setData(result.data);
        setLoading(false);
      },
      error: (err) => {
        alert("Failed to load data: " + err.message);
        setLoading(false);
      },
    });
  };

  const filteredData = useMemo(() => {
    return data.filter((row) =>
      Object.values(row)
        .join(" ")
        .toLowerCase()
        .includes(query.toLowerCase())
    );
  }, [data, query]);

  const sortedData = useMemo(() => {
    if (!sortColumn) return filteredData;
    return [...filteredData].sort((a, b) => {
      const valA = a[sortColumn] || "";
      const valB = b[sortColumn] || "";
      return sortOrder === "asc"
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA);
    });
  }, [filteredData, sortColumn, sortOrder]);

  const handleSort = (col) => {
    if (sortColumn === col)
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    else {
      setSortColumn(col);
      setSortOrder("asc");
    }
  };

  return (
    <div className="card">
      <div className="controls">
        <button onClick={loadData} disabled={loading}>
          {loading ? "Loading..." : "Load Data"}
        </button>
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="table-container">
        {data.length > 0 ? (
          <table>
            <thead>
              <tr>
                {Object.keys(data[0]).map((col) => (
                  <th key={col} onClick={() => handleSort(col)}>
                    {col}
                    {sortColumn === col
                      ? sortOrder === "asc"
                        ? " ▲"
                        : " ▼"
                      : ""}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sortedData.map((row, i) => (
                <tr key={i}>
                  {Object.values(row).map((val, j) => (
                    <td key={j}>{val}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="no-data">No data loaded yet.</p>
        )}
      </div>
    </div>
  );
}
