"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { IconButton } from "@/components/ui/icon-button";
import { FaMoon, FaSun } from "react-icons/fa";

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null; // prevent hydration mismatch

  return theme === "light" ? (
    <IconButton Icon={FaMoon} onClick={() => setTheme("dark")} />
  ) : (
    <IconButton Icon={FaSun} onClick={() => setTheme("light")} />
  );
};
