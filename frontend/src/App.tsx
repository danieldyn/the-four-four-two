import React from "react";
import { Routes, Route } from "react-router-dom";
import GamePage from "./pages/GamePage";
import HomePage from "./pages/HomePage";

import "./index.css";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/game" element={<GamePage />} />
    </Routes>
  );
};

export default App;
