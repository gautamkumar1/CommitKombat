import React from "react";
import { Button } from "@heroui/react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

export function HeroSection() {
  return (
    <section className="py-24 px-6 flex flex-col items-center justify-center text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-6 inline-block"
        >
          <Icon icon="lucide:flame" className="text-6xl text-danger" />
        </motion.div>

        <motion.h1
          className="text-5xl font-bold mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >

          AI-Powered <span className="text-orange-500">Roast & Rank</span> Platform for GitHub & LeetCode Warriors
        </motion.h1>

        <motion.p
          className="text-xl text-default-500 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          Our AI analyzes your GitHub and LeetCode profiles, assigns you a score, and then brutally roasts you with a custom nickname and emoji.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          <Button
            size="lg"
            color="primary"
            as="a"
            href="#add-user"
          >
            Get Roasted Now 🔥
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}