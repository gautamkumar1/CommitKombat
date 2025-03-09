import React from "react";
import { Link } from "@heroui/react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-divider">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row justify-between items-center gap-6"
        >
          <div className="flex items-center gap-2">
             <Link href="/" className="gap-2">
                      <Icon icon="lucide:git-commit" className="text-orange-500 text-2xl" />
                      <p className="font-bold text-inherit text-white">CommitKombat</p>
                      </Link>
          </div>
          
          <div className="flex gap-6">
            <Link href="#how-it-works" color="foreground">How It Works</Link>
            <Link href="#roasting-levels" color="foreground">Roasting Levels</Link>
            <Link href="#leaderboard" color="foreground">Leaderboard</Link>
          </div>
          
          <div className="flex gap-4">
            <Link href="https://github.com" target="_blank" aria-label="GitHub">
              <Icon icon="lucide:github" className="text-2xl text-orange-500" />
            </Link>
            <Link href="https://twitter.com" target="_blank" aria-label="Twitter">
              <Icon icon="lucide:twitter" className="text-2xl text-orange-500" />
            </Link>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-8 text-center text-default-500 text-sm"
        >
          © {new Date().getFullYear()} CommitKombat. Don't worry... we roast with ❤️... sometimes 💀
        </motion.div>
      </div>
    </footer>
  );
}