import React, { useState } from "react";

function LoginModal({ onLogin }) {
  const [password, setPassword] = useState("");
  const correctPassword = "Datta123"; // 🔑 set your own password

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    if (password === correctPassword) {
      onLogin();
    } else {
      alert("Wrong password!");
    }
  };

  return (
    <div className="login-modal">
      <div className="login-box">
        <h2>Enter Password</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Enter password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default LoginModal;