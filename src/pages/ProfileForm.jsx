import React, { useState, useEffect } from 'react';
import "./ProfileForm.css";

const HealthProfile = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [foodAllergies, setFoodAllergies] = useState('');
  const [weightGoal, setWeightGoal] = useState('');

  // Load profile from localStorage when component mounts
  useEffect(() => {
    const savedProfile = JSON.parse(localStorage.getItem('healthProfile'));
    if (savedProfile) {
      setName(savedProfile.name || '');
      setAge(savedProfile.age || '');
      setGender(savedProfile.gender || '');
      setHeight(savedProfile.height || '');
      setWeight(savedProfile.weight || '');
      setFoodAllergies(savedProfile.foodAllergies || '');
      setWeightGoal(savedProfile.weightGoal || '');
    }
  }, []);

  const handleSave = () => {
    const profile = {
      name,
      age,
      gender,
      height,
      weight,
      foodAllergies,
      weightGoal
    };
    localStorage.setItem('healthProfile', JSON.stringify(profile));
    alert('Profile saved successfully!');
  };

  return (
    <div className="profile-container">
      <h2>Health Profile</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

        <label>Age:</label>
        <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />

        <label>Gender:</label>
        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        <label>Height (cm):</label>
        <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} />

        <label>Weight (kg):</label>
        <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />

        <label>Food Allergies:</label>
        <input type="text" value={foodAllergies} onChange={(e) => setFoodAllergies(e.target.value)} />

        <label>Weight Goal:</label>
        <select value={weightGoal} onChange={(e) => setWeightGoal(e.target.value)}>
          <option value="">Select</option>
          <option value="gain">Gain Weight</option>
          <option value="lose">Lose Weight</option>
          <option value="maintain">Maintain Weight</option>
        </select>

        <br />
        <button type="button" onClick={handleSave}>
          Save Profile
        </button>
      </form>
    </div>
  );
};

export default HealthProfile;
