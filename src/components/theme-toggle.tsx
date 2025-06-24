"use client";
import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

import { Toggle } from "@/components/ui/toggle";

const ThemeModeToggleButton = ({
  theme,
  setTheme,
}: {
  theme: string;
  setTheme: (theme: string) => void;
}) => {

  const handleToggle = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  return (
    <Toggle
      aria-label="Toggle theme"
      className="flex items-center space-x-2 cursor-pointer border-2"
      onPressedChange={handleToggle}
    >
      {theme === "light" ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </Toggle>
  );
};

const ThemeModeSwitcher = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // WIP: think about a better way to handle this:
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSetTheme = (theme: string) => {
    if (theme) setTheme(theme);
  };

  if (!mounted)
    return <ThemeModeToggleButton theme="system" setTheme={() => {}} />;

  return (
    <ThemeModeToggleButton
      theme={resolvedTheme || "system"}
      setTheme={handleSetTheme}
    />
  );
};

export { ThemeModeSwitcher };
