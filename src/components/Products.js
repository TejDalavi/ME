import React from "react";

function Products() {
  return (
    <div className="products">
      <h2>Our Products</h2>
      <div className="product-list">
        <div className="product-card">
          <img src="https://via.placeholder.com/150" alt="Product 1" />
          <h3>Pump Machine</h3>
          <p>High efficiency RMC concrete pump.</p>
        </div>
        <div className="product-card">
          <img src="https://via.placeholder.com/150" alt="Product 2" />
          <h3>Spare Parts</h3>
          <p>Reliable spare parts for long service life.</p>
        </div>
      </div>
    </div>
  );
}

export default Products;
