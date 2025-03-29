import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CategoryPage from "./pages/CategoryPage";
import Header from "./pages/Header";
import AuthPage from "./pages/AuthPage";
import About from "./pages/About"; 
import Footer from "./pages/Footer"; 
import "./App.css";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categorySearchQuery, setCategorySearchQuery] = useState("");
  const [currentCategory, setCurrentCategory] = useState(null);

  const handleSearchChange = (query) => {
    if (currentCategory) {
      setCategorySearchQuery(query);
    } else {
      setSearchQuery(query);
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<AuthPage />} /> 

        <Route path="*" element={
          <>
            <Header
              setSearchQuery={handleSearchChange}
              setCategorySearchQuery={setCategorySearchQuery}
              setCurrentCategory={setCurrentCategory}
            />
            <div className="container">
              <Routes>
                <Route path="/" element={<>
                  <Home searchQuery={searchQuery} />
                  <About />
                  <Footer />
                </>} />
                <Route path="/category/:category" element={<>
                  <CategoryPage categorySearchQuery={categorySearchQuery} setCurrentCategory={setCurrentCategory} />
                  <About />
                  <Footer />
                </>} />
              </Routes>
            </div>
          </>
        } />
      </Routes>
    </Router>
  );
}

export default App;