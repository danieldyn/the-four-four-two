import { useNavigate } from "react-router-dom"

/**
 * 
 * @returns A header component that will be placed above all other components in Game Page.
 *          The left side contains the name of the game.
 *          The right side contains a button that leads back to Home Page. 
 */
export default function GameHeader() {
  const navigate = useNavigate()

  return (
    <div className="game-header">
      <h2 className="game-title">
        Football Starting XI Guessing Game
      </h2>

      <button
        className="home-button"
        onClick={() => navigate("/")}
      >
        Back to Home
      </button>
    </div>
  )
}
