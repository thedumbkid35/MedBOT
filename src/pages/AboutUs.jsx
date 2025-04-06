import React from "react";
import "./AboutUs.css";

const AboutUs = () => {
  return (
    <div className="about-container">
      <h2>About MedBOT</h2>
      <p>
        MedBOT is your personal health assistant — designed to support your
        wellness journey with personalized recipes, natural home remedies,
        and smart BMI-based guidance.
      </p>
      <p>
        Built with love using React.js, and powered by Spoonacular API.
      </p>

      <div className="team-section">
        <h3>Meet the Team</h3>
        <div className="team-grid">

          <a href="https://github.com/SahanaR01" target="_blank" rel="noopener noreferrer" className="team-card">
            <h4>Sahana R</h4>
            <p>23BPS1190</p>
          </a>

          <a href="
https://github.com/Sanjana-Moturi" target="_blank" rel="noopener noreferrer" className="team-card">
            <h4>Sanjana Moturi</h4>
            <p>23BPS1155</p>
          </a>

          <a href="https://github.com/swethaseshadri2023" target="_blank" rel="noopener noreferrer" className="team-card">
            <h4>Swetha Seshadri</h4>
            <p>23BPS1168</p>
          </a>

          <a href="https://github.com/thedumbkid35" target="_blank" rel="noopener noreferrer" className="team-card">
            <h4>Suvan Balasubramaniam</h4>
            <p>23BPS1023</p>
          </a>

        </div>
      </div>
    </div>
  );
};

export default AboutUs;
