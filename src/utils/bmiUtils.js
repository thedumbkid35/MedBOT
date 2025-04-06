// src/utils/fetchNutrition.js
const SPOONACULAR_API_KEY = 'a1e2e24ad8564ff2813dde00ba2f9a22';

export async function fetchNutritionTips(bmiCategory) {
  let query = '';

  switch (bmiCategory) {
    case 'Underweight':
      query = 'high calorie foods for healthy weight gain';
      break;
    case 'Normal weight':
      query = 'balanced nutrition meals';
      break;
    case 'Overweight':
    case 'Obese':
      query = 'low calorie high nutrition foods';
      break;
    default:
      query = 'healthy eating tips';
  }

  const response = await fetch(
    `https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=3&addRecipeNutrition=true&apiKey=${SPOONACULAR_API_KEY}`
  );

  const data = await response.json();
  return data.results;
}
