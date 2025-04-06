import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProfileForm.css";

const ProfileForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    age: "",
    gender: "",
    weight: "",
    height: "",
    allergies: "",
    healthConditions: "",
    weightGoals: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("profile", JSON.stringify(form));
    navigate("/home");
  };

  return (
    <div className="profile-container">
      <form onSubmit={handleSubmit} className="profile-form">
        <h2>Health Profile</h2>
        <input name="age" type="number" placeholder="Age" onChange={handleChange} required />
        <input name="gender" placeholder="Gender" onChange={handleChange} required />
        <input name="weight" type="number" placeholder="Weight (kg)" onChange={handleChange} required />
        <input name="height" type="number" placeholder="Height (cm)" onChange={handleChange} required />
        <input name="allergies" placeholder="Allergies (comma separated)" onChange={handleChange} />
        <input name="healthConditions" placeholder="Health Conditions" onChange={handleChange} />
        <input name="weightGoals" placeholder="Weight Goals" onChange={handleChange} />
        <button type="submit">Save & Continue</button>
      </form>
    </div>
  );
};

export default ProfileForm;
