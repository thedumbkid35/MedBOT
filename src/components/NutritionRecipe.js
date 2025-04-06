// src/components/NutritionRecipe.js
import React, { useState } from 'react';

const NutritionRecipe = () => {
  const [recipes, setRecipes] = useState([]);
  const [query, setQuery] = useState('');

  const fetchRecipes = async () => {
    const apiKey = 'YOUR_SPOONACULAR_API_KEY';
    const url = `https://api.spoonacular.com/recipes/complexSearch?query=${query}&addRecipeInformation=true&number=5&apiKey=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();
    setRecipes(data.results || []);
  };

  return (
    <div className="nutrition-container">
      <h2>Find Recipes & Nutrition</h2>
      <input
        type="text"
        placeholder="e.g., chicken, salad..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={fetchRecipes}>Search</button>

      <div className="recipe-list">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="recipe-card">
            <h3>{recipe.title}</h3>
            <img src={recipe.image} alt={recipe.title} />
            <p><strong>Calories:</strong> {recipe.nutrition?.nutrients?.find(n => n.name === 'Calories')?.amount} kcal</p>
            <p><strong>Protein:</strong> {recipe.nutrition?.nutrients?.find(n => n.name === 'Protein')?.amount} g</p>
            <p><strong>Fat:</strong> {recipe.nutrition?.nutrients?.find(n => n.name === 'Fat')?.amount} g</p>
            <p><strong>Carbs:</strong> {recipe.nutrition?.nutrients?.find(n => n.name === 'Carbohydrates')?.amount} g</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NutritionRecipe;
