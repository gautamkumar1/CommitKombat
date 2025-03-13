import React from 'react'
import { AppNavbar } from '../navbar'
import { Footer } from '../footer'
import { HeroSection } from '../hero-section'
import { Leaderboard } from '../leaderboard'
import { HowItWorks } from '../how-it-works'
import { RoastingLevels } from '../roasting-levels'

function LandingPage() {
  return (
    <div className="min-h-screen">
        <AppNavbar />
        <main>
            <HeroSection />
            <HowItWorks />
            <RoastingLevels />
        </main>
        <Footer />
    </div>
  )
}

export default LandingPage