import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Login from "./pages/Login";
import ProfileForm from "./pages/ProfileForm";
import RecipeGenerator from "./pages/RecipeGenerator";
import HomeRemedies from "./pages/HomeRemedies";
import BMICalculator from "./pages/BMICalculator";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import AboutUs from "./pages/AboutUs";

function App() {
  const isLoggedIn = localStorage.getItem("profile");

  return (
    <Router>
      {isLoggedIn && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/profile" element={<ProfileForm />} />
        <Route path="/home" element={<Home />} />
        <Route path="/recipes" element={<RecipeGenerator />} />
        <Route path="/remedies" element={<HomeRemedies />} />
        <Route path="/bmi" element={<BMICalculator />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<AboutUs />} />
      </Routes>
      {isLoggedIn && <Footer />}
    </Router>
  );
}

export default App;
