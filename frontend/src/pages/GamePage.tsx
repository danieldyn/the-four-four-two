import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams, useNavigate, NavigateFunction } from "react-router-dom";

import GuessInput from "../components/GuessInput";
import GuessHistory from "../components/GuessHistory";
import LineupBoard from "../components/LineupBoard";
import MatchHeader from "../components/MatchHeader";
import GameHeader from "../components/GameHeader";
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
      <div className="warmup-container">
        <h2>Category Conquered!</h2>
        <p>{gameOverMessage}</p>
        <div className="button-group" style={{ display: "flex", gap: "50px" }}>
          <button
            type="button"
            className="home-button"
            onClick={() => {
              localStorage.removeItem("playedMatches");
              fetchNewGame();
            }}
          >
            Replay Category
          </button>
          <button
            type="button"
            className="home-button"
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
      <div className="warmup-container">
        <div className="pitch-spinner">
          <div className="football">⚽</div>
        </div>
        <h2>The players are warming up...</h2>
        <p>Prepare your football knowledge for kickoff time!</p>
      </div>
    );

  const homeLineup = match.lineups.filter((p) => p.team === match.homeTeam);
  const awayLineup = match.lineups.filter((p) => p.team === match.awayTeam);

  return (
    <div className="game-page">
      <GameHeader onRestart={fetchNewGame} />

      <div className="mobile-view-toggle">
        <button
          className={mobileView === 'lineups' ? 'active' : ''}
          onClick={() => setMobileView('lineups')}
        >
          Pitch
        </button>
        <button
          className={mobileView === 'history' ? 'active' : ''}
          onClick={() => setMobileView('history')}
        >
          Grid
        </button>
      </div>

      <div className="game-layout">
        <div className={`main-content ${mobileView !== 'lineups' ? 'mobile-hidden' : ''}`}>
          <MatchHeader match={match} />

          <GuessInput
            onGuess={handleGuessSubmission}
            onHint={handleHint}
            isFinished={isFinished}
            onResign={handleResign}
          />

          <div className="pitches">
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

        <div className={`side-panel right-panel ${mobileView !== 'history' ? 'mobile-hidden' : ''}`}>
          <GuessHistory
            homeLineup={homeLineup}
            awayLineup={awayLineup}
            guesses={guesses}
            hintsUsed={hintsUsed}
            isFinished={isFinished}
          />
        </div>
      </div>
    </div>
  );
};

export default GamePage;
