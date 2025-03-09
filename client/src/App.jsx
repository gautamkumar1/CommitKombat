import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/leaderbord-home-page";
import LandingPage from "./components/LandingPage/LandingPage";
export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
          <Routes>
            <Route path="/leaderboard" element={<Home />} />
          </Routes>
          <Routes>
            <Route path="/" element={<LandingPage />} />
          </Routes>
      </div>
    </Router>
  );
}