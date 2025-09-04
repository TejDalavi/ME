import React from "react";

function Home() {
  return (
    <div className="home">
      {/* Hero Section */}
      <div className="hero">
        <h1>Welcome to Malganga Enterprises</h1>
        <p>Your trusted partner for RMC concrete pump services.</p>
      </div>

      {/* About Section */}
      <section id="about" className="section">
        <h2>About Us</h2>
        <p>
          ME Enterprises has been providing top-quality RMC concrete pump
          services for over 10 years. We pride ourselves on timely service and
          customer satisfaction. Our team ensures reliability and excellence in
          every project.
        </p>
      </section>

      {/* Products Section */}
      <section id="products" className="section">
        <h2>Our Products</h2>
        <div className="product-list">
          <div className="product-card">
            {/* <img src="https://via.placeholder.com/200" alt="Pump Machine" /> */}
            <h3>Pump Machine</h3>
            <p>High efficiency RMC concrete pump machine.</p>
          </div>
          <div className="product-card">
            {/* <img src="https://via.placeholder.com/200" alt="Spare Parts" /> */}
            <h3>Spare Parts</h3>
            <p>Reliable spare parts for long service life.</p>
          </div>
          <div className="product-card">
            {/* <img src="https://via.placeholder.com/200" alt="Concrete Tools" /> */}
            <h3>Concrete Tools</h3>
            <p>Essential tools for all construction needs.</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section">
        <h2>Contact Us</h2>
        <p>📍 Room No. 301, Shubham Apartment, Baap Goan, Thane Bhiwandi</p>
        <p>📞 8291358469 / 8788284288</p>
        <p>✉️ info@meenterprises.com</p>
      </section>
    </div>
  );
}

export default Home;
