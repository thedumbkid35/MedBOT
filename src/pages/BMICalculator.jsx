import React, { useState } from 'react';
import './BMICalculator.css';
import axios from 'axios';

const BMI = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState('');
  const [tips, setTips] = useState('');

  const calculateBMI = async () => {
    if (!height || !weight) return;

    const heightInMeters = height / 100;
    const calculatedBMI = (weight / (heightInMeters * heightInMeters)).toFixed(2);
    setBmi(calculatedBMI);

    let bmiCategory = '';
    if (calculatedBMI < 18.5) bmiCategory = 'Underweight';
    else if (calculatedBMI < 24.9) bmiCategory = 'Normal weight';
    else if (calculatedBMI < 29.9) bmiCategory = 'Overweight';
    else bmiCategory = 'Obese';

    setCategory(bmiCategory);
    fetchNutritionTips(bmiCategory); // 🔥 call Spoonacular here
  };

  const fetchNutritionTips = async (bmiCategory) => {
    try {
      const response = await axios.get(
        `https://api.spoonacular.com/food/products/suggest?query=${bmiCategory}&number=1&apiKey=a1e2e24ad8564ff2813dde00ba2f9a22`
      );

      if (response.data && response.data.results && response.data.results.length > 0) {
        const tip = response.data.results[0].title;
        setTips(`You can try: ${tip}`);
      } else {
        setTips('No specific tips found. Try eating balanced meals.');
      }
    } catch (error) {
      console.error('Error fetching nutrition tips:', error);
      setTips('Failed to load tips. Please try again later.');
    }
  };

  return (
    <div className="bmi-container">
      <h2>BMI Calculator</h2>
      <input
        type="number"
        placeholder="Height (cm)"
        value={height}
        onChange={(e) => setHeight(e.target.value)}
      />
      <input
        type="number"
        placeholder="Weight (kg)"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
      />
      <button onClick={calculateBMI}>Calculate BMI</button>

      {bmi && (
        <div className="bmi-result">
          <h3>Your BMI is: {bmi}</h3>
          <p>You are categorized as: <strong>{category}</strong></p>
          <p><strong>Nutrition Tips for {category}:</strong></p>
          <p>{tips || 'Loading recommendations...'}</p>
        </div>
      )}
    </div>
  );
};

export default BMI;
