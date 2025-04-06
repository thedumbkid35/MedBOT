import React, { useState, useRef } from 'react';
import axios from 'axios';
import './RecipeGenerator.css';

const RecipeGenerator = () => {
  const [ingredients, setIngredients] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const detailRef = useRef(null);

  const fetchRecipes = async () => {
    try {
      const response = await axios.get(
        'https://api.spoonacular.com/recipes/findByIngredients',
        {
          params: {
            ingredients: ingredients,
            number: 5,
            apiKey: 'a1e2e24ad8564ff2813dde00ba2f9a22', // ✅ Your API key
          },
        }
      );

      const recipeDetails = await Promise.all(
        response.data.map((recipe) =>
          axios.get(`https://api.spoonacular.com/recipes/${recipe.id}/information`, {
            params: {
              apiKey: 'a1e2e24ad8564ff2813dde00ba2f9a22', // ✅ Your API key
            },
          })
        )
      );

      setRecipes(recipeDetails.map((res) => res.data));
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  const handleView = (recipe) => {
    setSelectedRecipe(recipe);

    // Smooth scroll to the recipe detail section
    setTimeout(() => {
      detailRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="recipe-generator">
      <h2 className="heading">Recipe Generator</h2>
      <div className="input-container">
        <input
          type="text"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder='Enter Ingredients Here'
          className="ingredient-input"
        />
        <button onClick={fetchRecipes} className="generate-button">
          Generate Recipes
        </button>
      </div>

      <div className="recipe-cards">
        {recipes.map((recipe) => (
          <div className="recipe-card" key={recipe.id}>
            <img src={recipe.image} alt={recipe.title} />
            <h4>{recipe.title}</h4>
            <button className="view-button" onClick={() => handleView(recipe)}>
              View
            </button>
          </div>
        ))}
      </div>

      {selectedRecipe && (
        <div className="recipe-details" ref={detailRef}>
          <h3>{selectedRecipe.title}</h3>
          <img
            src={selectedRecipe.image}
            alt={selectedRecipe.title}
            style={{ width: '300px', borderRadius: '10px' }}
          />
          <h4>Ingredients:</h4>
          <ul>
            {selectedRecipe.extendedIngredients.map((ing, idx) => (
              <li key={idx}>{ing.original}</li>
            ))}
          </ul>
          <h4>Instructions:</h4>
          <p>{selectedRecipe.instructions || 'No instructions provided.'}</p>
        </div>
      )}
    </div>
  );
};

export default RecipeGenerator;
