import React from "react";
import "./style.css";

const Registration = () => {
  return (
    <div className = "container">
      <div className = "form-section">
        <h2>Fundo</h2>
        <p>Create your Fundo Account</p>
        <form>
          <div className="form-group">
            <label htmlFor="firstName">First Name*</label>
            <input type="text" id="firstName" required />
          </div>
          <div className="form-group">
            <label htmlFor="lastname">Last Name*</label>
            <input type="text" id="lastName" required />
          </div>
          <div className="form-group">
            <label htmlFor="username">Username*</label>
            <input type="text" id="username" required />
            <span className="password-hint">
              You can use letters,numbers & periods
            </span>
            </div>
            <div className="password-row">
              <div className="form-group">
                <label htmlFor="password">Password*</label>
                <input type="password" id="password" required />
              </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm*</label>
              <input type="password" id="confirmPassword" required />
            </div>
            </div>
            <span className="password-hint">
              Use 8 or more characters with a mix of letters, numbers & symbols
            </span>
            <div className="action-row">
              <a href="#" className="sign-in-link">
                sign in instead
              </a>
              <button type="submit" className="register-btn">
                Register
              </button>
            </div>
        </form>
      </div>
      <div className="image-section">
        <img src="images/register.jpg" alt="Account Icon" />
        <p>One account. All of Fundo working for you.</p>
      </div>
    </div>
  );
};

export default Registration;