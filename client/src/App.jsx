import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/leaderbord-home-page";
import LandingPage from "./components/LandingPage/LandingPage";

export default function App() {
  return (
    <Router>
      <div style={{ backgroundColor: "#0B0A0B" }} className="min-h-screen text-white">
        <Routes>
          <Route path="/leaderboard" element={<Home />} />
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </div>
    </Router>
  );
}