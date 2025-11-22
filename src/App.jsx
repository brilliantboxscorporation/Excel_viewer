import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Sheet1 from "./pages/Sheet1";
import Sheet2 from "./pages/Sheet2";

// NEW PAGES
import QuotationForm from "./pages/QuotationForm";
import GenerateQuotation from "./pages/GenerateQuotation";

import "./index.css";

export default function App() {
  return (
    <Router>
      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sheet1" element={<Sheet1 />} />
          <Route path="/sheet2" element={<Sheet2 />} />

          {/* NEW ROUTES */}
          <Route path="/create-quotation" element={<QuotationForm />} />
          <Route path="/quotation" element={<GenerateQuotation />} />
        </Routes>
      </main>
    </Router>
  );
}
