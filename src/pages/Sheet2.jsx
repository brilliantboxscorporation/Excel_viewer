import { Link } from "react-router-dom";
import DataTable from "../components/DataTable";

export default function Sheet2() {
  const sheet2 =
    "https://docs.google.com/spreadsheets/d/1mbKQCiIW9bQGtfWzu_yEQBI3AUbAk2ht/export?format=csv";

  return (
    <div>
      <div className="sheet-header">
        <div className="sheet-nav">
          <Link to="/" className="sheet-btn">Home</Link>
          <Link to="/sheet1" className="sheet-btn">PARTY CODE</Link>
        </div>
        <h2>PARTY CODE OUTER SIZE RATE</h2>
      </div>
      <DataTable csvUrl={sheet2} />
    </div>
  );
}
