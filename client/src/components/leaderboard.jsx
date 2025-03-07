import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip, Card, CardHeader, CardBody } from "@heroui/react";
import { motion } from "framer-motion";

const mockUsers = [
  {
    id: 1,
    name: "codingwizard",
    avatar: "https://i.pravatar.cc/150?u=codingwizard",
    rank: 1,
    leetcodeS: 92,
    totalScore: 89,
    nickname: "Algorithm Overlord",
    emoji: "👑"
  },
  {
    id: 2,
    name: "debuggerninja",
    avatar: "https://i.pravatar.cc/150?u=debuggerninja",
    rank: 2,
    leetcodeScore: 68,
    totalScore: 72,
    nickname: "Stack Overflow Addict",
    emoji: "🔍"
  },
  {
    id: 3,
    name: "frontendmaster",
    avatar: "https://i.pravatar.cc/150?u=frontendmaster",
    rank: 3,
    totalScore: 55,
    nickname: "CSS Wrangler",
    emoji: "🎨"
  },
  {
    id: 4,
    name: "backendguru",
    avatar: "https://i.pravatar.cc/150?u=backendguru",
    rank: 4,
    totalScore: 81,
    nickname: "Database Whisperer",
    emoji: "🗄️"
  },
  {
    id: 5,
    name: "newbieprogrammer",
    avatar: "https://i.pravatar.cc/150?u=newbieprogrammer",
    rank: 5,
    totalScore: 20,
    nickname: "Copy-Paste Apprentice",
    emoji: "📋"
  }
];

const columns = [
  { name: "USER", uid: "user" },
  { name: "NICKNAME", uid: "nickname" },
  { name: "EMOJI", uid: "emoji" },
  { name: "RANK", uid: "github" },
  { name: "TOTAL SCORE", uid: "score" }
];

function getScoreColor(score) {
  if (score >= 80) return "success";
  if (score >= 60) return "primary";
  if (score >= 40) return "warning";
  return "danger";
}

export function Leaderboard() {
  const sortedUsers = [...mockUsers].sort((a, b) => b.totalScore - a.totalScore);

  return (
    <section id="leaderboard" className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Developer Roast Leaderboard 🔥</h2> <p className="text-default-500 max-w-2xl mx-auto"> Only the bravest survive here! Top devs get crowned... the rest get **brutally cooked** 💀🔥 Climb the ranks or get roasted into Stack Overflow ashes 🚽💩. </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Card>
            <CardHeader className="flex justify-between">
              <h3 className="text-xl font-bold">Top Roasted Developers</h3>
              <Chip color="primary" variant="flat">Updated daily</Chip>
            </CardHeader>
            <CardBody>
              <Table aria-label="Developer leaderboard">
                <TableHeader columns={columns}>
                  {(column) => (
                    <TableColumn key={column.uid} align={column.uid === "score" ? "end" : "start"}>
                      {column.name}
                    </TableColumn>
                  )}
                </TableHeader>
                <TableBody items={sortedUsers}>
                  {(user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <User
                          name={user.name}
                          avatarProps={{
                            src: user.avatar
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span>{user.nickname}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span>{user.emoji}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Tooltip content="Your Rank">
                          <Chip
                            color={getScoreColor(user.rank)}
                            variant="flat"
                          >
                            {user.rank}
                          </Chip>
                        </Tooltip>
                      </TableCell>
                      <TableCell>
                        <Chip
                          color={getScoreColor(user.totalScore)}
                          size="lg"
                          variant="flat"
                        >
                          {user.totalScore}/100
                        </Chip>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardBody>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}