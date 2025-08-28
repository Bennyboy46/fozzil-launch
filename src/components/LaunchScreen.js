import React, { useState, useEffect } from "react";
import { IoMdRocket } from "react-icons/io";
import "../styles/Space.css";
import { images } from "../assets";

const LaunchScreen = () => {
  const [isLaunched, setIsLaunched] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const [showCountdown, setShowCountdown] = useState(false);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.code === "Space" && !showCountdown && !isLaunched) {
        event.preventDefault(); // Prevent page scroll on spacebar
        startCountdown();
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [showCountdown, isLaunched]);

  const startCountdown = () => {
    setShowCountdown(true);
    setCountdown(10);

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setShowCountdown(false);
          setIsLaunched(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1500);
  };

  return (
    <div>
      <div className="bg"></div>
      <div className="star-field">
        <div className="layer"></div>
        <div className="layer"></div>
        <div className="layer"></div>
      </div>

      {showCountdown && (
        <div
          className="countdown"
          style={{
            animation: "countdownPulse 1s ease-in-out infinite",
          }}
        >
          {countdown}
        </div>
      )}

      <div className={`rocket-container ${isLaunched ? "rocket-launch" : ""}`}>
        <IoMdRocket />
        <div className="rocket-fire"></div>
      </div>

      <div className={`logo ${isLaunched ? "reveal" : ""}`}>
        <img src={images.logo} alt="Fozzil Logo" />
      </div>
    </div>
  );
};

export default LaunchScreen;
