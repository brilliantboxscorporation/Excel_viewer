import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./quotation.css";

export default function QuotationForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    companyName: "",
    customerName: "",
    mobile: "",
    quotationNo: "",
    date: new Date().toISOString().split("T")[0],
  });

  const [items, setItems] = useState([
    { name: "", details: "", qty: 1, price: 0 },
  ]);

  const updateForm = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const updateItem = (index, field, value) => {
    setItems((prev) => {
      const next = [...prev];
      // coerce qty/price to numbers where appropriate
      if (field === "qty") next[index][field] = Number(value || 0);
      else if (field === "price") next[index][field] = Number(value || 0);
      else next[index][field] = value;
      return next;
    });
  };

  const addItem = () => {
    setItems((prev) => [...prev, { name: "", details: "", qty: 1, price: 0 }]);
  };

  const removeItem = (index) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const subtotal = items.reduce((s, it) => s + (Number(it.price) || 0) * (Number(it.qty) || 0), 0);

  const generatePDF = () => {
    navigate("/quotation", {
      state: {
        form,
        items,
      },
    });
  };

  return (
    <div className="form-container quotation-page">
      <header className="form-header">
        <h2>Create Quotation</h2>
      </header>

      <section className="form-grid">
        <div className="form-group">
          <label>Customer Name</label>
          <input name="customerName" value={form.customerName} onChange={updateForm} />
        </div>

        <div className="form-group">
          <label>Company Name</label>
          <input name="companyName" value={form.companyName} onChange={updateForm} />
        </div>

        <div className="form-group">
          <label>Mobile</label>
          <input name="mobile" value={form.mobile} onChange={updateForm} />
        </div>

        {/* Address removed per request */}

        <div className="form-group">
          <label>Quotation No</label>
          <input name="quotationNo" value={form.quotationNo} onChange={updateForm} />
        </div>

        <div className="form-group">
          <label>Date</label>
          <input type="date" name="date" value={form.date} onChange={updateForm} />
        </div>
      </section>

      <section className="items-section">
        <h3>Product Items</h3>

        <table className="items-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Product</th>
              <th>Details</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, idx) => (
              <tr key={idx} className="item-row">
                <td>{idx + 1}</td>
                <td>
                  <input value={item.name} onChange={(e) => updateItem(idx, "name", e.target.value)} />
                </td>
                <td>
                  <textarea rows="3" value={item.details} onChange={(e) => updateItem(idx, "details", e.target.value)} />
                </td>
                <td>
                  <input type="number" min="0" value={item.qty} onChange={(e) => updateItem(idx, "qty", e.target.value)} />
                </td>
                <td>
                  <input type="number" min="0" value={item.price} onChange={(e) => updateItem(idx, "price", e.target.value)} />
                </td>
                <td>₹{((Number(item.qty) || 0) * (Number(item.price) || 0)).toFixed(2)}</td>
                <td>
                  <button type="button" className="remove-btn" onClick={() => removeItem(idx)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="items-controls">
          <button type="button" onClick={addItem} className="add-btn">+ Add Item</button>
          <div className="subtotal">Subtotal: <b>₹{subtotal.toFixed(2)}</b></div>
        </div>
      </section>

      <footer className="form-actions">
        <button onClick={generatePDF} className="submit-btn">Generate PDF</button>
      </footer>
    </div>
  );
}
