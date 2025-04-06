import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";

import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Recipes from "./pages/RecipeGenerator";
import Remedies from "./pages/HomeRemedies";
import BMI from "./pages/BMICalculator";
import Contact from "./pages/Contact";
import About from "./pages/AboutUs";
import Profile from "./pages/ProfileForm";
import Footer from "./components/Footer";

const AppLayout = () => {
  const location = useLocation();
  const isLogin = location.pathname === "/";

  return (
    <div className="app-wrapper">
      {!isLogin && <Navbar />}
      <main className="app-content">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/remedies" element={<Remedies />} />
          <Route path="/bmi" element={<BMI />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
      {!isLogin && <Footer />}
    </div>
  );
};

const App = () => (
  <Router>
    <AppLayout />
  </Router>
);

export default App;
