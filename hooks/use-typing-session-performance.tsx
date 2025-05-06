import { useEffect, useMemo, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hook";
import {
  resetPerformance,
  setHistory,
} from "@/lib/feature/slice/typing-session-performance-slice";
import {
  keyPress,
  resetTypingStatsState,
  setInActive,
} from "@/lib/feature/slice/typing-session-stats-slice";
// import { handleKeyPress } from "@/hooks/use-performance-thunk";

export const HISTORY_STORAGE_KEY = "typingSessionHistory";

export interface KeyPressInput {
  isCorrect: boolean;
  key: string;
  timestamp: number;
  numberOfKeys: number;
}

export function useTypingSessionPerformance() {
  const appDispatch = useAppDispatch();

  const inactivityTimer = useRef<NodeJS.Timeout | null>(null);

  // Load history from localStorage once
  useEffect(() => {
    const stored = localStorage.getItem(HISTORY_STORAGE_KEY);
    if (stored) {
      appDispatch(setHistory(JSON.parse(stored)));
    }
  }, []);

  const onPerformanceCalculate = (input: KeyPressInput) => {
    // appDispatch(handleKeyPress(input));
    appDispatch(keyPress(input));

    // Reset inactivity timer
    if (inactivityTimer.current) {
      clearTimeout(inactivityTimer.current);
    }
    inactivityTimer.current = setTimeout(() => {
      appDispatch(setInActive());
    }, 5000); // 5 seconds inactivity
  };

  const reset = () => {
    if (inactivityTimer.current) {
      clearTimeout(inactivityTimer.current);
    }
    appDispatch(resetTypingStatsState());
    appDispatch(resetPerformance());
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem(HISTORY_STORAGE_KEY);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (inactivityTimer.current) {
        clearTimeout(inactivityTimer.current);
      }
    };
  }, []);

  return {
    onPerformanceCalculate,
    reset,
    clearHistory,
  };
}
