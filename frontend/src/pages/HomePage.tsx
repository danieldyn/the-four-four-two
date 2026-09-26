import { useNavigate } from "react-router-dom";

// REVIEW: More categories are to be added
const CATEGORIES = ["All Matches", "World Cup", "Champions League"];

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  // Player instructions about provided in-game info
  const components = [
    "The teams involved in the match",
    "The competition and date of the match",
    "The final score (includes pens or ET)",
    "The players' shirt numbers and positions",
    "A tracking panel showing masked names and completed guesses"
  ]

  // Navigation decision
  const handleStartGame = (category: string) => {
    if (category === "All Matches") {
      navigate("/game");
    } else {
      navigate(`/game?category=${encodeURIComponent(category)}`);
    }
  };

  return (
    <main className="min-h-screen flex justify-center items-center py-10 px-4">
      {/* Central Card */}
      <div className="w-full max-w-2xl bg-black/35 backdrop-blur-md border border-white/10 rounded-2xl p-6 sm:p-10 shadow-2xl flex flex-col gap-8">
        
        {/* Title & Introduction */}
        <header className="text-center space-y-3">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-emerald-200 m-0">
            Football Starting XI Quiz
          </h1>
          <p></p>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-lg mx-auto">
            Test your football knowledge by reconstructing the iconic starting lineups of historic matchups.
          </p>
        </header>

        {/* Provided Match Clues Section */}
        <section className="bg-white/5 border border-white/10 rounded-xl p-4 sm:p-5">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-3 text-left">
            What you get
          </h3>
          <ul className="space-y-2 text-sm text-slate-200 pl-4 list-disc marker:text-emerald-400">
            {components.map((item, index) => (
              <li key={index} className="leading-snug">
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Rules and Mechanics */}
        <section className="space-y-4 text-left">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-emerald-400 m-0">
            How to play
          </h3>
          <p></p>
          <div className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <p className="text-left">
              Type the player&apos;s <strong className="text-lime-200">last name</strong> and hit Enter. 
              Accents are optional. A correct guess immediately reveals the player on the tactical board and the panel.
            </p>
            <p className="text-left">
              <strong className="text-lime-200">Tiebreaker rule:</strong> If multiple players share a surname 
              (e.g., Gabriel and Diego Milito in 2009 UCL), you must type their first name as well to distinguish them.
            </p>
            <p className="text-left">
              Got stuck anywhere? Deduce letter counts in the panel or trigger a <strong className="text-lime-200">Hint</strong>
              to reveal several random letters.
            </p>
            <p className="text-left">
              <strong className="text-lime-200">Note:</strong> On mobile version, you will have to use the button above the pitches
              to view the panel (named <strong className="text-lime-200">Grid View</strong>) and check you guesses and hints. You may
              toggle between views as many times as you need.
            </p>
          </div>
        </section>

        {/* Category Buttons */}
        <section className="pt-2 border-t border-white/10 text-center space-y-4">
          <h3 className="text-sm font-semibold text-slate-200">
            Select a Category to Kick Off:
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => handleStartGame(cat)}
                className="flex-1 min-w-[140px] max-w-[200px] py-3 px-4 bg-[#2e7d32] hover:bg-[#1b5e20] active:scale-[0.98] border border-emerald-500/30 text-white font-semibold text-sm rounded-xl shadow-lg shadow-black/30 transition-all cursor-pointer text-center"
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
};

export default HomePage;
