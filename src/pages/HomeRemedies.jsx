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
};

const HomeRemedies = () => {
  const [problem, setProblem] = useState("");
  const [results, setResults] = useState([]);

  const profile = JSON.parse(localStorage.getItem("profile")) || {};
  const allergies = (profile.allergies || "").toLowerCase().split(",").map(a => a.trim());

  const findRemedies = () => {
    const key = problem.toLowerCase().replace(/\s/g, "");
    const remedies = remediesDB[key] || [];

    const filtered = remedies.filter(remedy =>
      !remedy.ingredients.some(ing =>
        allergies.includes(ing.toLowerCase())
      )
    );

    setResults(filtered.length > 0 ? filtered : [{ remedy: "No safe remedy found for your allergies." }]);
  };

  return (
    <div className="remedy-container">
      <h2>Home Remedies</h2>
      <div className="input-box">
        <input
          type="text"
          placeholder="Enter your health issue (e.g. headache, cold)"
          value={problem}
          onChange={(e) => setProblem(e.target.value)}
        />
        <button onClick={findRemedies}>Get Remedies</button>
      </div>

      <div className="results-box">
        {results.map((item, index) => (
          <div className="remedy-card" key={index}>
            <p>{item.remedy}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeRemedies;
