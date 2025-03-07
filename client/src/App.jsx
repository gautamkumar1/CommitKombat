import React from "react";
import { AppNavbar } from "./components/navbar";
import { HeroSection } from "./components/hero-section";
import { HowItWorks } from "./components/how-it-works";
import { RoastingLevels } from "./components/roasting-levels";
import { Leaderboard } from "./components/leaderboard";
import { Footer } from "./components/footer";

export default function App() {
  return (
    <div className="min-h-screen bg-background">
      <AppNavbar />
      <main>
        <HeroSection />
        <Leaderboard />
        <HowItWorks />
        <RoastingLevels />
      </main>
      <Footer />
    </div>
  );
}