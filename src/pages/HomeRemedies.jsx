import React, { useState } from "react";
import "./HomeRemedies.css";

const remediesDB = {
  headache: [
    { remedy: "Ginger tea", ingredients: ["ginger", "water"] },
    { remedy: "Peppermint oil massage", ingredients: ["peppermint oil"] },
  ],
  cold: [
    { remedy: "Honey lemon water", ingredients: ["honey", "lemon"] },
    { remedy: "Steam inhalation", ingredients: ["water", "eucalyptus oil"] },
  ],
  bodyodor: [
    { remedy: "Apple cider vinegar rinse", ingredients: ["apple cider vinegar", "water"] },
    { remedy: "Baking soda scrub", ingredients: ["baking soda"] },
  ],
  allergy: [
    { remedy: "Local honey", ingredients: ["honey"] },
    { remedy: "Nasal saline rinse", ingredients: ["salt", "water"] },
  ],
  indigestion: [
    { remedy: "Fennel seed tea", ingredients: ["fennel seeds", "water"] },
    { remedy: "Ginger and lemon juice", ingredients: ["ginger", "lemon"] },
  ],
  constipation: [
    { remedy: "Warm water with lemon", ingredients: ["lemon", "water"] },
    { remedy: "Flaxseed tea", ingredients: ["flaxseed", "water"] },
  ],
  sorethroat: [
    { remedy: "Saltwater gargle", ingredients: ["salt", "water"] },
    { remedy: "Honey ginger tea", ingredients: ["honey", "ginger", "water"] },
  ],
  nausea: [
    { remedy: "Lemon water", ingredients: ["lemon", "water"] },
    { remedy: "Mint tea", ingredients: ["mint", "water"] },
  ],
  cough: [
    { remedy: "Turmeric milk", ingredients: ["turmeric", "milk"] },
    { remedy: "Honey and pepper", ingredients: ["honey", "black pepper"] },
  ],
  fever: [
    { remedy: "Tulsi tea", ingredients: ["tulsi", "water"] },
    { remedy: "Coriander tea", ingredients: ["coriander seeds", "water"] },
  ],
  acidity: [
    { remedy: "Cold milk", ingredients: ["milk"] },
    { remedy: "Cumin water", ingredients: ["cumin seeds", "water"] },
  ],
  gas: [
    { remedy: "Ajwain with black salt", ingredients: ["ajwain", "black salt"] },
    { remedy: "Hing water", ingredients: ["hing", "water"] },
  ],
  mouthulcers: [
    { remedy: "Coconut water", ingredients: ["coconut water"] },
    { remedy: "Honey and turmeric", ingredients: ["honey", "turmeric"] },
  ],
  toothache: [
    { remedy: "Clove oil", ingredients: ["clove oil"] },
    { remedy: "Saltwater rinse", ingredients: ["salt", "water"] },
  ],
  earache: [
    { remedy: "Garlic oil drops", ingredients: ["garlic oil"] },
    { remedy: "Warm compress", ingredients: [] },
  ],
  eyeirritation: [
    { remedy: "Cold compress", ingredients: [] },
    { remedy: "Rose water drops", ingredients: ["rose water"] },
  ],
  darkcircles: [
    { remedy: "Cucumber slices", ingredients: ["cucumber"] },
    { remedy: "Almond oil massage", ingredients: ["almond oil"] },
  ],
  dandruff: [
    { remedy: "Tea tree oil", ingredients: ["tea tree oil"] },
    { remedy: "Lemon juice rinse", ingredients: ["lemon"] },
  ],
  hairfall: [
    { remedy: "Amla oil massage", ingredients: ["amla oil"] },
    { remedy: "Onion juice", ingredients: ["onion juice"] },
  ],
  dryskin: [
    { remedy: "Aloe vera gel", ingredients: ["aloe vera"] },
    { remedy: "Honey and banana mask", ingredients: ["honey", "banana"] },
  ],
  acne: [
    { remedy: "Neem paste", ingredients: ["neem"] },
    { remedy: "Multani mitti face pack", ingredients: ["multani mitti", "rose water"] },
  ],
  sunburn: [
    { remedy: "Aloe vera", ingredients: ["aloe vera"] },
    { remedy: "Cold milk compress", ingredients: ["milk"] },
  ],
  itching: [
    { remedy: "Oatmeal bath", ingredients: ["oatmeal"] },
    { remedy: "Baking soda paste", ingredients: ["baking soda", "water"] },
  ],
  jointpain: [
    { remedy: "Turmeric paste", ingredients: ["turmeric", "water"] },
    { remedy: "Epsom salt soak", ingredients: ["epsom salt", "water"] },
  ],
  backpain: [
    { remedy: "Ginger compress", ingredients: ["ginger"] },
    { remedy: "Hot water bag", ingredients: [] },
  ],
  legcramps: [
    { remedy: "Banana (potassium source)", ingredients: ["banana"] },
    { remedy: "Warm compress", ingredients: [] },
  ],
  sleeplessness: [
    { remedy: "Chamomile tea", ingredients: ["chamomile", "water"] },
    { remedy: "Warm milk with nutmeg", ingredients: ["milk", "nutmeg"] },
  ],
  stress: [
    { remedy: "Lavender oil diffuser", ingredients: ["lavender oil"] },
    { remedy: "Deep breathing", ingredients: [] },
  ],
  anxiety: [
    { remedy: "Valerian root tea", ingredients: ["valerian root"] },
    { remedy: "Magnesium-rich food", ingredients: [] },
  ],
  fatigue: [
    { remedy: "Ginseng tea", ingredients: ["ginseng"] },
    { remedy: "Coconut water", ingredients: ["coconut water"] },
  ],
  memoryloss: [
    { remedy: "Brahmi tea", ingredients: ["brahmi"] },
    { remedy: "Almonds soaked overnight", ingredients: ["almonds"] },
  ],
  poorvision: [
    { remedy: "Carrot juice", ingredients: ["carrot"] },
    { remedy: "Triphala eye wash", ingredients: ["triphala"] },
  ],
  obesity: [
    { remedy: "Lukewarm lemon honey water", ingredients: ["lemon", "honey", "water"] },
    { remedy: "Cinnamon tea", ingredients: ["cinnamon", "water"] },
  ],
};

const HomeRemedies = () => {
  const [problem, setProblem] = useState("");
  const [results, setResults] = useState([]);

  const profile = JSON.parse(localStorage.getItem("profile")) || {};
  const allergies = (profile.allergies || "").toLowerCase().split(",").map((a) => a.trim());

  const findRemedies = () => {
    const key = problem.toLowerCase().replace(/\s/g, "");
    const remedies = remediesDB[key] || [];

    const filtered = remedies.filter((remedy) =>
      !remedy.ingredients.some((ing) => allergies.includes(ing.toLowerCase()))
    );

    setResults(filtered.length > 0 ? filtered : [{ remedy: "No safe remedy found for your allergies." }]);
  };

  return (
    <div className="remedy-container">
      <h2>Home Remedies</h2>
      <div className="input-box">
        <select value={problem} onChange={(e) => setProblem(e.target.value)}>
          <option value="">Select a health issue</option>
          {Object.keys(remediesDB).map((issue, index) => (
            <option value={issue} key={index}>
              {issue.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/^\w/, (c) => c.toUpperCase())}
            </option>
          ))}
        </select>
        <button onClick={findRemedies}>Get Remedies</button>
      </div>

      <div className="results-box">
        {results.map((item, index) => (
          <div className="remedy-card" key={index}>
            <p>{item.remedy}</p>
            {item.ingredients && (
              <small>Ingredients: {item.ingredients.join(", ")}</small>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeRemedies;
