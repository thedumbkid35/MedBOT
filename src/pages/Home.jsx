import React from "react";
import "./Home.css";

const Home = () => {
    const user = JSON.parse(localStorage.getItem("profile")) || { name: "Guest" };

  return (
    <div className="home-container">
      <h1>Welcome to MedBOT, {user.name} </h1>
      <h2>Meal Executor and Diet Planner BOT</h2>
      <p>
        Your personal health assistant to help you eat better, track your BMI,
        and find home remedies — all tailored to your needs.
      </p>
      <p>Use the navigation menu above to get started!</p>
    </div>
  );
};

export default Home;
