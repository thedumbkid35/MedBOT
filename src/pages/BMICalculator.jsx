import React, { useState } from "react";
import "./BMICalculator.css";

const EDAMAM_APP_ID = "YOUR_EDAMAM_APP_ID";
const EDAMAM_APP_KEY = "YOUR_EDAMAM_APP_KEY";

const BMICalculator = () => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const calculateBMI = () => {
    if (!height || !weight) return;
    const hMeters = height / 100;
    const bmiVal = weight / (hMeters * hMeters);
    setBmi(bmiVal.toFixed(2));

    let cat = "";
    if (bmiVal < 18.5) cat = "Underweight";
    else if (bmiVal < 24.9) cat = "Normal";
    else if (bmiVal < 29.9) cat = "Overweight";
    else cat = "Obese";
    setCategory(cat);

    fetchSuggestions(cat);
  };

  const fetchSuggestions = async (bmiCategory) => {
    let query = "balanced diet";

    if (bmiCategory === "Underweight") query = "high-calorie";
    else if (bmiCategory === "Overweight" || bmiCategory === "Obese") query = "low-calorie";
    else if (bmiCategory === "Normal") query = "healthy meals";

    const res = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${EDAMAM_APP_ID}&app_key=${EDAMAM_APP_KEY}&from=0&to=3`
    );
    const data = await res.json();
    setSuggestions(data.hits || []);
  };

  return (
    <div className="bmi-container">
      <h2>BMI Calculator</h2>
      <div className="input-box">
        <input
          type="number"
          placeholder="Enter height (cm)"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />
        <input
          type="number"
          placeholder="Enter weight (kg)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
        <button onClick={calculateBMI}>Calculate</button>
      </div>

      {bmi && (
        <div className="result-box">
          <h4>Your BMI: {bmi}</h4>
          <p>Category: <strong>{category}</strong></p>
        </div>
      )}

      {suggestions.length > 0 && (
        <div className="suggestions-box">
          <h4>Dietary Suggestions:</h4>
          <ul>
            {suggestions.map((item, index) => (
              <li key={index}>
                <a href={item.recipe.url} target="_blank" rel="noreferrer">
                  {item.recipe.label}
                </a> ({Math.round(item.recipe.calories)} kcal)
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BMICalculator;
