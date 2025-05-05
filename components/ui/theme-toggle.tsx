import { useTheme } from "next-themes";
import { BsSunFill, BsMoonStarsFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import { IconButton } from "@/components/ui/icon-button";

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null; // prevent hydration mismatch

  return theme === "light" ? (
    <IconButton Icon={BsMoonStarsFill} onClick={() => setTheme("dark")} />
  ) : (
    <IconButton Icon={BsSunFill} onClick={() => setTheme("light")} />
  );
};
