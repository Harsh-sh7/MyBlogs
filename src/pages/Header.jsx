import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

export default function Header({ setSearchQuery, setCategorySearchQuery, setCurrentCategory }) {
  const [openDropdown, setOpenDropdown] = useState(null);  
  const [searchInput, setSearchInput] = useState("");  // For storing search input value
  const navigate = useNavigate();

  // Handle search input change
  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchInput(value);
    setSearchQuery(value); // Update search query for blog results
    setCategorySearchQuery(value); 
  };

  // Handle navigation to a specific category
  const handleNavigation = (category) => {
    setCurrentCategory(category);
    setSearchQuery(""); 
    setCategorySearchQuery(""); 
    navigate(`/category/${category}`); // Navigate to the category page
  };

  // Navigate back to the home page
  const goToHome = () => {
    setCurrentCategory(null);
    setSearchQuery(""); 
    setCategorySearchQuery(""); 
    navigate("/"); // Navigate to home
  };

  return (
    <header className="header">
      {/* Logo - Click to return to Home */}
      <div className="logo" onClick={goToHome} style={{ cursor: "pointer" }}>
        MyBlogs
      </div>

      {/* Search Bar */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search blogs..."
          className="search-input"
          value={searchInput}
          onChange={handleSearchChange}
        />
        <button className="search-button">🔍</button>
      </div>

      {/* Navigation - Dropdown for exploring blogs */}
      <nav className="nav">
        <div
          className="nav-item"
          onMouseEnter={() => setOpenDropdown("explore")} 
          onMouseLeave={() => setOpenDropdown(null)} // Hide dropdown on mouse leave
        >
          Explore some blogs ▾
          {openDropdown === "explore" && (
            <div className="dropdown">
              <a onClick={() => handleNavigation("business")} href="#">Business in US</a>
              <a onClick={() => handleNavigation("tesla")} href="#">Tesla Recent</a>
              <a onClick={() => handleNavigation("apple")} href="#">Apple Recent</a>
            </div>
          )}
        </div>
      </nav>

      {/* Auth Buttons */}
      <div className="auth-buttons">
        <button className="signup" onClick={() => navigate("/auth")}>Sign up</button>
        <button className="login" onClick={() => navigate("/auth")}>Log in</button>
      </div>
    </header>
  );
}