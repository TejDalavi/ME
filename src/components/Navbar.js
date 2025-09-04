import React from "react";

function Navbar({ setPage }) {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="navbar">
      {/* <div className="logo">ME</div> */}
      <img src="/MalgangaEn.png" alt="Pump Machine" width="50" height="50" />
      <ul className="nav-links">
        <li onClick={() => setPage("home")}>Home</li>
        <li onClick={() => scrollToSection("about")}>About Us</li>
        <li onClick={() => scrollToSection("products")}>Products</li>
        <li onClick={() => scrollToSection("contact")}>Contact</li>
        <li onClick={() => setPage("billing")} className="bill-btn">
          Generate Bill
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
