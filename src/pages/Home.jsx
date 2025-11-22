import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home">
      {/* Navigation buttons for easy sheet switching */}
      <div className="sheet-nav">
        <Link to="/sheet1" className="sheet-btn">PARTY CODE</Link>
        <Link to="/sheet2" className="sheet-btn">PARTY CODE OUTER SIZE RATE</Link>
      </div>

      {/* Quotation actions */}
      <div style={{ marginTop: 20 }} className="quotation-actions">
        <Link to="/create-quotation" className="sheet-btn">Create Quotation</Link>
      </div>
    </div>
  );
}
