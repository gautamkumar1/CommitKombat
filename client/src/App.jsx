import React from "react";
import { AppNavbar } from "./components/navbar";
import { HeroSection } from "./components/hero-section";
import { HowItWorks } from "./components/how-it-works";
import { RoastingLevels } from "./components/roasting-levels";
import { Leaderboard } from "./components/leaderboard";
import { Footer } from "./components/footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/leaderbord-home-page";
export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <AppNavbar />
        <main>
          <Routes>
            <Route path="/leaderboard" element={<Home />} />
          </Routes>
          <HeroSection />
          <Leaderboard />
          <HowItWorks />
          <RoastingLevels />
        </main>
        <Footer />
      </div>
    </Router>
  );
}