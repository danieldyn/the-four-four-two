import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  // Player instructions about provided in-game info
  const components = [
    'The teams involved in the match',
    'The competition and date of the match',
    'The final score (including penalties or extra time)',
    'The shirt numbers and positions of the players',
    'A list that will help track your correct guesses and masked unguessed players'
  ]
  const listComponents = components.map(c => <li>{c}</li>);

  return (
    <div className="page">
      <div className="container">
        <h1>Football Starting XI Guessing Game</h1>

        <p>
          Your goal is to guess the starting 11 players from iconic football matches.
        </p>
        <p>
          You will be given:
        </p>

        <ul>{listComponents}</ul>

        <div>
          <p>How to play?</p>
          <p>
            Type player last names and press Enter (or click the Submit button) to take a guess.
            If you are correct, the player will be revealed on the lineup. You can try as many times as you want.
          </p>
          <p>
            Use the players' positions and shirt numbers as valuable hints to discover all of them! Keep in mind
            that you can deduce the number of letters of a player's name using the right hand side panel. If you
            need it, you can press the "Hint" button, which will reveal random letters from a random player's name.
            You must type the correct "normalised" version of the player's last name. Example: 
            If you wish to guess "Claude Makélélé", then both <strong>"makelele"</strong> and <strong>"Makelele"</strong> would be correct.
          </p>
        </div>

        <br />
        <button
          onClick={() => navigate("/game")}
          className="home-button"
        >
          Start Game
        </button>
      </div>
    </div>
  );
};

export default HomePage;
