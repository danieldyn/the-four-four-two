import React from "react";
import { Routes, Route } from "react-router-dom";
import GamePage from "./pages/GamePage";
import HomePage from "./pages/HomePage";

import "./styles/base.css";
import "./styles/layout.css";
import "./styles/components/header.css";
import "./styles/components/pitch.css";
import "./styles/components/lineup.css";
import "./styles/components/guess-history.css";
import "./styles/components/forms.css";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/game" element={<GamePage />} />
    </Routes>
  );
};

export default App;
