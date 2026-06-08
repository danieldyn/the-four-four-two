import { useNavigate } from "react-router-dom";

// REVIEW: More categories are to be added
const CATEGORIES = ["All Matches", "World Cup", "Champions League"];

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

  // Navigation decision
  const handleStartGame = (category: string) => {
    if (category === "All Matches") {
      navigate("/game");
    } else {
      navigate(`/game?category=${encodeURIComponent(category)}`);
    }
  };

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
          <h3>How to play?</h3>
          <p>
            Type player last names and press Enter to take a guess.
            If you are correct, the corresponding player will be revealed on the lineup.
            You can try as many times as you want.
            You are allowed to submit the player's last name as a guess, not the full name. Accents are optional.
            Note that your guess is taken into consideration for both teams.
          </p>
          <p>
            For this reason, there is a fair-play rule that is enforced when involving players that share their last name.
            Let's assume you have the famous 2009 Champions League Semi Final second leg between Barcelona and Inter Milan,
            which features both Gabriel and Diego Milito. You need to use their first names as tiebreakers when guessing.
            This prevents accidental combos and aligns better with the idea of the quiz.
          </p>
          <p>
            Use the players' positions and shirt numbers as valuable hints to discover all of them! Keep in mind
            that you can deduce the number of letters of a player's name using the right hand side panel. If you
            need it, you can press the "Hint" button, which will reveal random letters from a random player's name.
          </p>
        </div>

        <br />
        <div>
          <h3>Select a Category to Begin:</h3>
          <div className="buttons">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => handleStartGame(cat)}
                className="home-button"
              >
                Play {cat}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
