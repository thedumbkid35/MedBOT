import React, { useEffect, useState } from "react";
import "./Footer.css";

const healthTips = [
  "💧 Stay hydrated – drink at least 8 glasses of water daily.",
  "🥗 Eat more greens and fruits every day.",
  "🧘‍♀️ Take short breaks to stretch every hour.",
  "🚶‍♂️ Walk at least 30 minutes a day.",
  "😴 Aim for 7-9 hours of quality sleep.",
  "🧠 Mental health matters – take time to relax and breathe.",
  "☀️ Get some sunlight for natural Vitamin D.",
];

const Footer = () => {
  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTipIndex((prev) => (prev + 1) % healthTips.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="footer">
      <p>{healthTips[currentTipIndex]}</p>
    </footer>
  );
};

export default Footer;
