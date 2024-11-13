import React from "react";
import "./login.css";

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Fundo</h2>
        <h3>Sign in</h3>
        <p>Use your Fundo Account</p>
        <form>
          <div className="form-group">
            <label htmlFor="email">Email or phone*</label>
            <input type="text" id="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password*</label>
            <input type="password" id="password" required />
            <div className="link-row">
              <a href="#" className="forgot-password">
                Forgot password
              </a>
              <a href="#" className="create-account">
                Create account
              </a>
            </div>
          </div>
          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
