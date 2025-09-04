import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Products from "./components/Products";
import Contact from "./components/Contact";
import BillForm from "./components/Billing/BillForm";
import BillPreview from "./components/Billing/BillPreview";
import LoginModal from "./components/LoginModal";
import "./App.css";

function App() {
  const [page, setPage] = useState("home");
  const [billData, setBillData] = useState({
    billNo: "",
    date: "",
    name: "",
    items: [{ sr: 1, particular: "", qty: 0, rate: 0, amount: 0 }],
  });
  const [showPreview, setShowPreview] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleInputChange = (field, value) => {
    setBillData({ ...billData, [field]: value });
  };

  const handleItemsChange = (items) => {
    setBillData({ ...billData, items });
  };

  const handleSubmit = () => {
    setShowPreview(true);
  };

  const renderPage = () => {
    if (page === "home") return <Home />;
    if (page === "about") return <About />;
    if (page === "products") return <Products />;
    if (page === "contact") return <Contact />;
    if (page === "billing") {
      if (!isLoggedIn) return <LoginModal onLogin={() => setIsLoggedIn(true)} />;
      return !showPreview ? (
        <>
          <BillForm billData={billData} onInputChange={handleInputChange} />
          {/* <BillTable items={billData.items} onItemsChange={handleItemsChange} /> */}
          {/* <button className="submit-btn" onClick={handleSubmit}>
            Submit Bill
          </button> */}
        </>
      ) : (
        <BillPreview billData={billData} />
      );
    }
  };

  return (
    <div className="app-container">
      <Navbar setPage={setPage} />
      <div className="page-container">{renderPage()}</div>
    </div>
  );
}

export default App;
