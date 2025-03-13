import React from "react";
import { Card, CardBody, CardHeader, Progress } from "@heroui/react";
import { motion } from "framer-motion";

const roastingLevels = [
  {
    level: "Mild Burn",
    range: "0-25",
    description: "You're just starting out. The AI will gently tease you about your coding journey.",
    color: "success",
    emoji: "🌱"
  },
  {
    level: "Medium Roast",
    range: "26-50",
    description: "You have some experience. Expect playful jabs at your coding habits and style choices.",
    color: "primary",
    emoji: "🔥"
  },
  {
    level: "Spicy Critique",
    range: "51-75",
    description: "You're pretty good. The AI will challenge your skills with some spicy observations.",
    color: "warning",
    emoji: "🌶️"
  },
  {
    level: "Savage Destruction",
    range: "76-100",
    description: "You claim to be elite. Prepare for a brutal, no-holds-barred roasting of your developer ego.",
    color: "danger",
    emoji: "💀"
  }
];

export function RoastingLevels() {
  return (
    <section id="roasting-levels" className="py-16 px-6 bg-[#18191A]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Roasting Levels & Criteria</h2>
          <p className="text-white-500 max-w-2xl mx-auto">
            Depending on your score, our AI will adjust its roasting intensity. Here's what you can expect at each level.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {roastingLevels.map((level, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full bg-[#18191A]">
                <CardHeader className="flex gap-3">
                  <div className="text-3xl">{level.emoji}</div>
                  <div>
                    <p className="text-white-500 font-semibold">{level.level}</p>
                    <p className="text-small text-white-500">Score Range: {level.range}</p>
                  </div>
                </CardHeader>
                <CardBody className="pt-0">
                  <Progress 
                    value={parseInt(level.range.split("-")[1])} 
                    color={level.color}
                    className="mb-4"
                  />
                  <p className="text-white-500">{level.description}</p>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}