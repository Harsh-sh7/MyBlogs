import React, { useState } from "react";
import "./AuthPage.css";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>{isLogin ? "Login" : "Sign Up"}</h2>

        <div className="input-group">
          <label>Email</label>
          <input type="email" placeholder="Enter your email" required />
        </div>

        <div className="input-group password-group">
          <label>Password</label>
          <div className="password-wrapper">
            <input 
              type={passwordVisible ? "text" : "password"} 
              placeholder="Enter your password" 
              required 
            />
            <span className="toggle-password" onClick={togglePasswordVisibility}>
              {passwordVisible ? "Hide" : "Show"}
            </span>
          </div>
        </div>

        {!isLogin && (
          <div className="input-group">
            <label>Confirm Password</label>
            <input type="password" placeholder="Confirm your password" required />
          </div>
        )}

        <button className="auth-button">{isLogin ? "Login" : "Sign Up"}</button>

        <p className="toggle-text">
          {isLogin ? "Don't have an account?" : "Already have an account?"}  
          <button className="toggle-button" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;