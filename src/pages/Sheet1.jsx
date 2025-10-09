import { Link } from "react-router-dom";
import DataTable from "../components/DataTable";

export default function Sheet1() {
  const sheet1 =
    "https://docs.google.com/spreadsheets/d/1WC1AAU6NN1y9jnG4Z2X1P2m1jpsrNyF_/export?format=csv";

  return (
    <div>
      <div className="sheet-header">
        <div className="sheet-nav">
          <Link to="/" className="sheet-btn">Home</Link>
          <Link to="/sheet2" className="sheet-btn">PARTY CODE OUTER SIZE RATE</Link>
        </div>
        <h2>PARTY CODE</h2>
      </div>
      <DataTable csvUrl={sheet1} />
    </div>
  );
}
