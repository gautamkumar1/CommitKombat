import React from "react";
import { Card, CardBody, CardHeader } from "@heroui/react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

// const steps = [
//   {
//     icon: "lucide:github",
//     title: "GitHub Analysis",
//     description: "We analyze your repositories, contributions, stars, and commit history to calculate your GitHub score."
//   },
//   {
//     icon: "lucide:code",
//     title: "LeetCode Evaluation",
//     description: "Your LeetCode profile is assessed based on problems solved, difficulty levels, and consistency."
//   },
//   {
//     icon: "lucide:calculator",
//     title: "Score Calculation",
//     description: "Our AI combines both scores using a proprietary algorithm to generate your final developer rating."
//   },
//   {
//     icon: "lucide:flame",
//     title: "Brutal Roasting",
//     description: "Based on your score, the AI generates a personalized roast, nickname, and emoji that reflects your coding abilities."
//   }
// ];


const steps = [
  {
    icon: "lucide:github",
    title: "GitHub Analysis",
    description: "We analyze your repositories, commits, pull requests, and followers to calculate your GitHub score."
  },
  {
    icon: "lucide:code",
    title: "LeetCode Evaluation",
    description: "Your LeetCode profile is assessed based on problems solved, streaks, and difficulty ratio to measure your DSA skills."
  },
  {
    icon: "lucide:calculator",
    title: "Score Calculation",
    description: "Our Toxic AI Judge combines both GitHub and LeetCode data using a savage points system to generate your final score."
  },
  {
    icon: "lucide:skull",
    title: "Brutal Roasting",
    description: "Based on your score, the AI generates a customized roast, random savage nickname, and toxic emoji set 🔥💀."
  }
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">How The Scoring System Works</h2>
          <p className="text-default-500 max-w-2xl mx-auto">
            Our sophisticated AI uses multiple data points from your coding profiles to calculate your score and determine just how savage your roast should be.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full">
                <CardHeader className="flex gap-3">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <Icon icon={step.icon} className="text-2xl text-primary" />
                  </div>
                  <p className="text-lg font-semibold">{step.title}</p>
                </CardHeader>
                <CardBody>
                  <p className="text-default-500">{step.description}</p>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}