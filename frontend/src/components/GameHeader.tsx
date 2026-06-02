import React from "react";
import { useNavigate, NavigateFunction } from "react-router-dom";

/**
 * Displays the game title and a navigation button to return to the Home Page.
 */
const GameHeader: React.FC = () => {
  const navigate: NavigateFunction = useNavigate();

  return (
    <div className="game-header">
      <h2 className="game-title">
        Football Starting XI Guessing Game
      </h2>

      <button
        className="home-button"
        onClick={() => window.location.reload()}
      >
        New Random Game
      </button>

      <button
        className="home-button"
        onClick={() => navigate("/")}
      >
        Back to Home
      </button>
    </div>
  );
};

export default GameHeader;
