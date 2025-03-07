import React from "react";
import { AppNavbar } from "./components/navbar";
import { HeroSection } from "./components/hero-section";
import { HowItWorks } from "./components/how-it-works";
import { RoastingLevels } from "./components/roasting-levels";
import { AddUserForm } from "./components/Add-user-form";
import { Leaderboard } from "./components/leaderboard";
import { Footer } from "./components/footer";

export default function App() {
  return (
    <div className="min-h-screen bg-background">
      <AppNavbar />
      <main>
        <HeroSection />
        <HowItWorks />
        <RoastingLevels />
        <AddUserForm />
        <Leaderboard />
      </main>
      <Footer />
    </div>
  );
}