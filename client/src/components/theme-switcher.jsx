import React from "react";
import { Button, Tooltip } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useTheme } from "@heroui/use-theme";
import { motion } from "framer-motion";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <Tooltip content={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}>
      <Button 
        isIconOnly 
        variant="light" 
        onPress={toggleTheme}
        aria-label="Toggle theme"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2 }}
          key={theme}
        >
          {theme === 'light' ? (
            <Icon icon="lucide:moon" className="text-xl" />
          ) : (
            <Icon icon="lucide:sun" className="text-xl" />
          )}
        </motion.div>
      </Button>
    </Tooltip>
  );
}