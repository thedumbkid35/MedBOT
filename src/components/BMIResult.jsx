import React, { useEffect, useState } from 'react';
import { fetchNutritionTips } from '../utils/bmiUtils';

const BMIResult = ({ bmi, category }) => {
  const [nutritionTips, setNutritionTips] = useState([]);

  useEffect(() => {
    if (category) {
      fetchNutritionTips(category)
        .then(setNutritionTips)
        .catch(err => console.error('Nutrition fetch failed:', err));
    }
  }, [category]);

  return (
    <div className="bmi-result-container">
      <h2>Your BMI is: {bmi.toFixed(2)}</h2>
      <p>You are categorized as: <strong>{category}</strong></p>

      <div className="nutrition-section">
        <h3>Nutrition Tips for {category}:</h3>
        {nutritionTips.length > 0 ? (
          <ul>
            {nutritionTips.map((item) => (
              <li key={item.id}>
                <strong>{item.title}</strong>
                <p>Calories: {item.nutrition.nutrients.find(n => n.name === 'Calories')?.amount} kcal</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>Loading recommendations...</p>
        )}
      </div>
    </div>
  );
};

export default BMIResult;
