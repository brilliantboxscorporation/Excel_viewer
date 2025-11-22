import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useLocation, Link } from "react-router-dom";
import reactLogo from "../assets/BRILLIANT_BOX_LOGO[1].jpg";
import "./quotation.css";

export default function GenerateQuotation() {
  const locationState = useLocation().state || {};
  const form = locationState.form || null;
  const items = locationState.items || [];
  const printRef = useRef(null);

  const formatDate = (dateStr, sep = '/') => {
    if (!dateStr) return '';
    // if date is a Date object or other, normalize to YYYY-MM-DD
    let normalized = dateStr;
    if (typeof normalized !== 'string') {
      try {
        normalized = new Date(normalized).toISOString().split('T')[0];
      } catch (e) {
        return String(dateStr);
      }
    }
    const parts = normalized.split('-');
    if (parts.length !== 3) return normalized;
    const [year, month, day] = parts;
    return sep ? `${day}${sep}${month}${sep}${year}` : `${day}${month}${year}`;
  };

  const formatMoney = (value) => {
    const n = Number(value);
    if (Number.isNaN(n)) return '0.00';
    return n.toFixed(2);
  };

  const downloadPDF = async () => {
    const element = printRef.current;
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`Quotation-${form.quotationNo}-${formatDate(form.date, '')}.pdf`);
  };

  const grandTotal = (items || []).reduce((sum, item) => sum + (Number(item.price) || 0) * (Number(item.qty) || 0), 0);

  return (
    <div className="quotation-page">
      {!form ? (
        <div className="no-state">
          <p>No quotation data found. Please create a quotation first.</p>
          <Link to="/create-quotation" className="sheet-btn">Go to Create Quotation</Link>
        </div>
      ) : (
        <>
          <div className="controls">
            <button className="download-btn" onClick={downloadPDF}>Download PDF</button>
          </div>

          <div ref={printRef} className="quotation-container">

        <header className="pdf-header">
          <div className="pdf-logo">
            {/* Attempt to load a custom logo from `public/brand-logo.png`. If not present, fall back to the bundled react svg. */}
            <img src="/BRILLIANT_BOX_LOGO[1].jpg" alt="logo" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = reactLogo; }} />
          </div>

          <div className="pdf-company">
            <h2 className="company-title">BRILLIANT BOXES CORPORATION</h2>
            <div className="company-address">
              40 , Tribhuvan estate<br/>
              Road no 8, kathwada GIDC,<br/>
              Kathwada, Ahmedabad<br/>
               info.brilliantboxes@gmail.com<br/>
              <b>GSTIN 24BHKPG3721N1Z9</b>
            </div>
          </div>

          <div className="pdf-title-right">Quotation</div>
        </header>

        <div className="details">
          <div className="details-left">
            <p className="to-label">To,</p>
            <p className="details-company">{form.companyName || ""}</p>
            <p className="details-customer">{form.customerName}</p>
            <p className="details-phone">{form.mobile}</p>
          </div>

          <div className="details-right">
            <p><span className="meta-label">Quotation#</span> <span className="meta-value">{form.quotationNo}</span></p>
            <p><span className="meta-label">Date:</span> <span className="meta-value">{formatDate(form.date)}</span></p>
          </div>

          <div className="details-body">
            <p className="salutation">Dear Sir/Mam,</p>
            <p className="intro">Thank you for your valuable inquiry. We are pleased to quote as below</p>
          </div>
        </div>

        <table className="quotation-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Description</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>

          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td><b>{item.name}</b><br/>{item.details}</td>
                <td>{item.qty}</td>
                <td>₹{formatMoney(item.price)}</td>
                <td>₹{formatMoney((Number(item.price) || 0) * (Number(item.qty) || 0))}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="footer-total">
          <b>GRAND TOTAL: ₹{grandTotal.toFixed(2)}</b>
        </div>
            <p>We hope you find our offer to be in line with your requirement.</p>
        <div className="signature">
          <p><b>For, BRILLIANT BOXES CORPORATION</b></p>
          <br/><br/>
          </div>
          <div className="sign2">
          <p>AUTHORIZED SIGNATURE</p>
          </div>
          </div>
        </>
      )}
    </div>
  );
}
