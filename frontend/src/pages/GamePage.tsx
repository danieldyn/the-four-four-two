import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams, useNavigate, NavigateFunction } from "react-router-dom";

import GuessInput from "../components/GuessInput";
import GuessHistory from "../components/GuessHistory";
import LineupBoard from "../components/LineupBoard";
import MatchHeader from "../components/MatchHeader";
import GameHeader from "../components/GameHeader";
import { GridIcon, PitchIcon } from "../assets/icons";
import { Match, GuessResponse } from "../types/football";
import slugify from "../utils/slugify";

/**
 * The shape of a guess' tracker.
 */
export interface Guess {
  guess: string;
  result: "correct" | "wrong";
  display: string;
}

// Key-value pair for hints
type HintsUsed = Record<string, boolean>;

const apiUrl = import.meta.env.VITE_API_URL;

/**
 * The Game Page component, containing:
 *            - The header (game name + return to Home Page button)
 *            - A left container (two side-by-side pitches)
 *            - A right container (a list of masked and guessed names and the input form)
 */
const GamePage: React.FC = () => {
  const [match, setMatch] = useState<Match | null>(null);
  const [guesses, setGuesses] = useState<Guess[]>([]);
  const [hintsUsed, setHintsUsed] = useState<HintsUsed>({});
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [gameOverMessage, setGameOverMessage] = useState<string | null>(null);
  const [mobileView, setMobileView] = useState<'lineups' | 'history'>('lineups');
  const navigate: NavigateFunction = useNavigate();

  // Resigning will reveal unguessed players and finish the game
  const handleResign = () => setIsFinished(true);

  // Extract category parameter from the URL
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  // Callback for New Random Game, which locally stores played games' IDs
  const fetchNewGame = useCallback(() => {
    // Reset state for new game
    setMatch(null);
    setGuesses([]);
    setHintsUsed({});
    setIsFinished(false);
    setGameOverMessage(null);

    let fetchUrl = `${apiUrl}/matches/random`;
    const params = new URLSearchParams();

    if (category)
      params.append("category", category);

    // Read played matches from local storage
    const playedIdsStr = localStorage.getItem("playedMatches") || "";
    if (playedIdsStr)
      params.append("exclude", playedIdsStr);

    if (params.toString())
      fetchUrl += `?${params.toString()}`;

    fetch(fetchUrl)
      .then((res) => {
        if (!res.ok) {
          if (res.status === 404)
            throw new Error("You have played all available games in this category!");
          throw new Error("Failed to fetch match");
        }
        return res.json();
      })
      .then((data: Match) => {
        setMatch(data);

        // Save new match ID in the local storage array
        const playedArray = playedIdsStr ? playedIdsStr.split(",") : [];
        if (!playedArray.includes(data.id.toString())) {
          playedArray.push(data.id.toString());
          localStorage.setItem("playedMatches", playedArray.join(","));
        }
      })
      .catch((err) => {
        console.error("Failed to fetch match:", err);
        setGameOverMessage(err.message);
      });
  }, [category]);

  useEffect(() => {
    fetchNewGame();
  }, [fetchNewGame]);

  // Process the guess
  const addGuess = (slug: string, result: "correct" | "wrong", playerData: GuessResponse | null) => {
    if (result === "correct" && playerData?.player) {
      const fullName = `${playerData.player.firstName} ${playerData.player.lastName}`;

      setGuesses((prev) => [
        ...prev,
        {
          guess: slug,
          result,
          display: fullName,
        },
      ]);
    } else {
      setGuesses((prev) => [
        ...prev,
        {
          guess: slug,
          result,
          display: slug,
        },
      ]);
    }
  };

  // Checks user input against the match data stored locally
  const handleGuessSubmission = (guess: string) => {
    if (!match || isFinished)
      return;

    const normalisedGuess = slugify(guess);
    const matchingLineup = match.lineups.find((lineupEntry) => {
      const player = lineupEntry.player;

      return (
        player.slug === normalisedGuess ||
        player.slug.endsWith(`-${normalisedGuess}`) ||
        player.alias === normalisedGuess ||
        player.alias?.endsWith(`-${normalisedGuess}`)
      );
    });

    if (matchingLineup) {
      addGuess(matchingLineup.player.slug, "correct", {
        result: "correct",
        player: matchingLineup.player,
        team: matchingLineup.team,
      });
    } else {
      addGuess(normalisedGuess, "wrong", null);
    }
  };

  // Using a hint wll reveal several letters from the mask of a player
  const handleHint = () => {
    if (!match || isFinished)
      return;

    const availablePlayers = match.lineups.filter((p) => {
      const slug = p.player.slug;
      const alreadyGuessed = guesses.some((g) => g.guess === slug);
      const alreadyHinted = hintsUsed[slug];

      return !alreadyGuessed && !alreadyHinted;
    });

    if (!availablePlayers.length)
      return;

    const randomPlayer = availablePlayers[Math.floor(Math.random() * availablePlayers.length)];

    if (randomPlayer) {
      setHintsUsed((prev) => ({
        ...prev,
        [randomPlayer.player.slug]: true,
      }));
    }
  };

  // Return a special victory screen when the user beats all games in the selected category
  if (gameOverMessage) {
    return (
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center w-[min(90vw,500px)] max-h-[500px] py-8 px-10 text-center text-slate-200 bg-black/25 border-l border-white/10 rounded-xl box-border">
        <h2 className="mt-4 text-2xl text-sky-400 animate-pulse font-bold">Category Conquered!</h2>
        <p className="text-slate-400 text-sm my-3">{gameOverMessage}</p>
        <div className="flex justify-center gap-12 mt-4">
          <button
            type="button"
            className="py-2 px-4 bg-[#2e7d32] hover:bg-[#1b5e20] text-white rounded-md border-0 cursor-pointer font-medium transition-colors"
            onClick={() => {
              localStorage.removeItem("playedMatches");
              fetchNewGame();
            }}
          >
            Replay Category
          </button>
          <button
            type="button"
            className="py-2 px-4 bg-[#2e7d32] hover:bg-[#1b5e20] text-white rounded-md border-0 cursor-pointer font-medium transition-colors"
            onClick={() => {
              localStorage.removeItem("playedMatches");
              navigate("/");
            }}
          >
            Back to Main Menu
          </button>
        </div>
      </div>
    );
  }

   // Return a special warmup screen while the full match data is unavailable
  if (!match)
    return (
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center w-[min(90vw,500px)] max-h-[500px] py-8 px-10 text-center text-slate-200 bg-black/25 border-l border-white/10 rounded-xl box-border">
        <div className="text-5xl animate-spin">
          <div>⚽</div>
        </div>
        <h2 className="mt-4 text-2xl text-sky-400 animate-pulse font-bold">The players are warming up...</h2>
        <p className="text-slate-400 text-sm mt-1">Prepare your football knowledge for kickoff time!</p>
      </div>
    );

  const homeLineup = match.lineups.filter((p) => p.team === match.homeTeam);
  const awayLineup = match.lineups.filter((p) => p.team === match.awayTeam);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b1d0b] to-[#123d12] flex flex-col">
      <GameHeader onRestart={fetchNewGame} />

      <MatchHeader match={match} />

      {/* Mobile view toggle */}
      <button
        type="button"
        className="lg:hidden mx-auto my-3 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-black/40 border border-white/10 text-teal-200 text-lg"
        onClick={() => setMobileView(mobileView === "lineups" ? "history" : "lineups")}
      >
        {mobileView === "lineups" ? (
          <>
            <GridIcon /> Grid View
          </>
        ) : (
          <>
            <PitchIcon /> Pitch View
          </>
        )}
      </button>

      {/* Main Game Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-10 max-w-[1400px] w-full mx-auto py-5 px-5">
        {/* Left Side: Pitches Container */}
        <div
          className={`flex flex-col items-center gap-[30px] w-full ${mobileView !== "lineups" ? "hidden lg:flex" : "flex"}`}
        >
          <div className="flex justify-center gap-14 max-w-[1100px] w-full flex-wrap [&_h2]:bg-black/25 [&_h2]:border-l [&_h2]:border-white/10 [&_h2]:rounded-xl">
            <LineupBoard
              lineup={homeLineup}
              guesses={guesses}
              isFinished={isFinished}
              primaryColour={match.homePrimaryColour}
              secondaryColour={match.homeSecondaryColour}
            />

            <LineupBoard
              lineup={awayLineup}
              guesses={guesses}
              isFinished={isFinished}
              primaryColour={match.awayPrimaryColour}
              secondaryColour={match.awaySecondaryColour}
            />
          </div>
        </div>

        {/* Right Side: History Panel */}
        <div
          className={`min-h-[600px] bg-black/25 border-l border-white/10 rounded-xl sticky top-5 flex flex-col p-5 gap-[15px] h-full max-h-[calc(100vh-180px)] overflow-y-auto ${
            mobileView !== "history" ? "hidden lg:flex" : "flex"
          }`}
        >
          <GuessHistory
            homeLineup={homeLineup}
            awayLineup={awayLineup}
            guesses={guesses}
            hintsUsed={hintsUsed}
            isFinished={isFinished}
          />
        </div>

        {/* Input Bar */}
        <div className="col-span-1 lg:col-span-2 flex justify-center">
          <GuessInput
            onGuess={handleGuessSubmission}
            onHint={handleHint}
            isFinished={isFinished}
            onResign={handleResign}
          />
        </div>
      </div>
    </div>
  );
};

export default GamePage;
