import React, { useState } from "react";
import "./RecipeGenerator.css";

const API_KEY = "YOUR_SPOONACULAR_API_KEY";

const RecipeGenerator = () => {
  const [ingredients, setIngredients] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const profile = JSON.parse(localStorage.getItem("profile")) || {};
  const allergies = profile.allergies || "";
  const weightGoals = profile.weightGoals || "";

  const fetchRecipes = async () => {
    const query = ingredients.trim().replace(/\s*,\s*/g, ",");
    const response = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?includeIngredients=${query}&intolerances=${allergies}&diet=${weightGoals}&number=5&addRecipeInformation=true&apiKey=${API_KEY}`
    );
    const data = await response.json();
    setRecipes(data.results);
  };

  const handleViewDetails = (recipe) => {
    setSelectedRecipe(recipe);
  };

  return (
    <div className="recipe-container">
      <h2>Recipe Generator</h2>
      <div className="input-section">
        <input
          type="text"
          placeholder="Enter available ingredients (comma separated)"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        />
        <button onClick={fetchRecipes}>Generate Recipes</button>
      </div>

      <div className="recipe-list">
        {recipes.map((recipe) => (
          <div className="recipe-card" key={recipe.id}>
            <img src={recipe.image} alt={recipe.title} />
            <h4>{recipe.title}</h4>
            <button onClick={() => handleViewDetails(recipe)}>View</button>
          </div>
        ))}
      </div>

      {selectedRecipe && (
        <div className="recipe-details">
          <h3>{selectedRecipe.title}</h3>
          <img src={selectedRecipe.image} alt={selectedRecipe.title} />
          <p dangerouslySetInnerHTML={{ __html: selectedRecipe.summary }}></p>
          <p><strong>Ingredients:</strong></p>
          <ul>
            {selectedRecipe.extendedIngredients?.map((ing, index) => (
              <li key={index}>{ing.original}</li>
            ))}
          </ul>
          <p><strong>Instructions:</strong></p>
          <p dangerouslySetInnerHTML={{ __html: selectedRecipe.instructions }}></p>
        </div>
      )}
    </div>
  );
};

export default RecipeGenerator;
