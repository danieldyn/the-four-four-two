import React from "react";
import { useNavigate, NavigateFunction } from "react-router-dom";

/**
 * The shape of the Game Header panel's attributes.
 * It needs access to the callback for starting a new random game.
 */
interface GameHeaderProps {
  onRestart: () => void
}

/**
 * Displays the game title and a navigation button to return to the Home Page.
 */
const GameHeader: React.FC<GameHeaderProps> = ({ onRestart }) => {
  const navigate: NavigateFunction = useNavigate();

  return (
    <div className="game-header">
      <h2 className="game-title">
        Football Starting XI Guessing Game
      </h2>

      <button
        className="home-button"
        onClick={onRestart}
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
