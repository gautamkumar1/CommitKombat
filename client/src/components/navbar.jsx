import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

export function AppNavbar() {
  return (
    <Navbar 
      isBordered 
      className="bg-background/60 backdrop-blur-md"
      maxWidth="xl"
    >
      <NavbarBrand>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2"
        >
          <Link href="/" className="gap-2">
          <Icon icon="lucide:git-commit" className="text-orange-500 text-2xl" />
          <p className="font-bold text-inherit text-white">CommitKombat</p>
          </Link>
        </motion.div>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#how-it-works">
            How It Works
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#roasting-levels">
            Roasting Levels
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="flex gap-2">
          <Link href="https://github.com/gautamkumar1/CommitKombat" target="_blank" aria-label="GitHub">
            <Icon icon="lucide:github" className="text-orange-500 text-2xl" />
          </Link>
          <Link href="https://x.com/Paradoxical_xD" target="_blank" aria-label="Twitter">
            <Icon icon="lucide:twitter" className="text-orange-500 text-2xl" />
          </Link>
        </NavbarItem>
        <NavbarItem>
 <Link href="/leaderboard">
 <Button 
    color="warning"  
    variant="flat"
    startContent={<Icon icon="lucide:trophy" className="text-yellow-400" />} 
  >
    Leaderboard
  </Button>
 </Link>
</NavbarItem>

      </NavbarContent>
    </Navbar>
  );
}