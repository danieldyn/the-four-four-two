import { useNavigate } from "react-router-dom"

export default function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="page">
      <div className="container">
        <h1>Football Starting XI Guessing Game</h1>

        <p>
          Your goal is to guess the starting 11 players from iconic football matches.
        </p>

        <p>
          You will be given:
          <br />
          <ul>
            <li> The teams involved in the match </li>
            <li> The competition and date of the match </li>
            <li> The final score (after regular time, not extra time) </li>
            <li> The players' shirt numbers and positions </li>
          </ul>
        </p>

        <p>
          How to play?
          <br />
          Type player last names and press Enter (or click the Submit button) to take a guess.
          If you are correct, the player will be revealed on the lineup. You can try as many times as you want.
          <br />
          Use the players' positions and shirt numbers as valuable hints to discover all of them!
          You must type the correct "normalised" version of the player's last name. Example: 
          If you wish to guess "Claude Makélélé", then both "makelele" and "Makelele" would be correct. 
        </p>

        <br />
        <button
          onClick={() => navigate("/game")}
          className="home-button"
        >
          Start Game
        </button>

      </div>
    </div>
  )
}