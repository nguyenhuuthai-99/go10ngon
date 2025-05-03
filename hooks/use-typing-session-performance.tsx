import { useEffect, useMemo, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hook";
import {
  resetPerformance,
  SessionRecord,
  setHistory,
  updatePerformance,
} from "@/slice/typing-session-performance-slice";
import {
  keyPress,
  resetTypingStatsState,
  setInActive,
} from "@/slice/typing-session-stats-slice";

const HISTORY_STORAGE_KEY = "typingSessionHistory";

interface KeyPressInput {
  isCorrect: boolean;
  key: string;
  timestamp: number;
  numberOfKeys: number;
}

export function useTypingSessionPerformance() {
  const typingSessionStats = useAppSelector(
    (state) => state.typingSessionStats,
  );
  const typingSessionPerformance = useAppSelector(
    (state) => state.typingSessionPerformance,
  );
  const appDispatch = useAppDispatch();

  const inactivityTimer = useRef<NodeJS.Timeout | null>(null);

  // Load history from localStorage once
  useEffect(() => {
    const stored = localStorage.getItem(HISTORY_STORAGE_KEY);
    if (stored) {
      appDispatch(setHistory(JSON.parse(stored)));
    }
  }, []);

  // WPM
  const wpm = useMemo(() => {
    if (
      !typingSessionStats.startTime ||
      !typingSessionStats.lastTimestamp ||
      typingSessionStats.totalKeystrokes === 0
    )
      return 0;
    const elapsedMinutes =
      (typingSessionStats.lastTimestamp - typingSessionStats.startTime) /
      (1000 * 60);
    const wordsTyped = typingSessionStats.totalKeystrokes / 5;
    return elapsedMinutes > 0 ? wordsTyped / elapsedMinutes : 0;
  }, [
    typingSessionStats.startTime,
    typingSessionStats.lastTimestamp,
    typingSessionStats.totalKeystrokes,
  ]);

  // Accuracy
  const accuracy = useMemo(() => {
    if (typingSessionStats.totalKeystrokes === 0) return 100;
    return (
      (typingSessionStats.correctKeystrokes /
        typingSessionStats.totalKeystrokes) *
      100
    );
  }, [
    typingSessionStats.correctKeystrokes,
    typingSessionStats.totalKeystrokes,
  ]);

  // Adjusted WPM
  const adjustedWpm = useMemo(() => {
    return wpm * (accuracy / 100);
  }, [wpm, accuracy]);

  const saveSessionToHistory = () => {
    if (typingSessionStats.totalKeystrokes === 0) return; // No need to save empty sessions

    const newSession: SessionRecord = {
      wpm,
      key: null,
      accuracy,
      adjustedWpm,
      timestamp: Date.now(),
    };

    const updatedHistory = [
      newSession,
      ...typingSessionPerformance.history,
    ].slice(0, 50); // Keep only latest 50 sessions
    setHistory(updatedHistory);
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updatedHistory));
  };

  const onPerformanceCalculate = (input: KeyPressInput) => {
    appDispatch(keyPress(input));
    appDispatch(updatePerformance({ wpm, accuracy }));

    // Reset inactivity timer
    if (inactivityTimer.current) {
      clearTimeout(inactivityTimer.current);
    }
    inactivityTimer.current = setTimeout(() => {
      appDispatch(setInActive());
      saveSessionToHistory();
    }, 5000); // 5 seconds inactivity
  };

  const reset = () => {
    if (inactivityTimer.current) {
      clearTimeout(inactivityTimer.current);
    }
    saveSessionToHistory();
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
