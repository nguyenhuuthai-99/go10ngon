import { useReducer, useMemo, useEffect, useRef, useState } from "react";

export interface TypingSessionPerformance {
  wpm: number;
  accuracy: number;
  adjustedWpm: number;
  isRunning: boolean;
  history: SessionRecord[];
  onPerformanceCalculate: (input: KeyPressInput) => void;
  reset: () => void;
  clearHistory: () => void;
}

interface KeyPressInput {
  isCorrect: boolean;
  timestamp: number;
  numberOfKeys: number;
}

interface TypingState {
  totalKeystrokes: number;
  correctKeystrokes: number;
  startTime: number | null;
  lastTimestamp: number | null;
  isRunning: boolean;
}

interface SessionRecord {
  wpm: number;
  accuracy: number;
  adjustedWpm: number;
  timestamp: number;
}

type TypingAction =
  | { type: "KEY_PRESS"; payload: KeyPressInput }
  | { type: "SET_INACTIVE" }
  | { type: "RESET" };

const initialState: TypingState = {
  totalKeystrokes: 0,
  correctKeystrokes: 0,
  startTime: null,
  lastTimestamp: null,
  isRunning: false,
};

const HISTORY_STORAGE_KEY = "typingSessionHistory";

function typingReducer(state: TypingState, action: TypingAction): TypingState {
  switch (action.type) {
    case "KEY_PRESS":
      const { isCorrect, timestamp, numberOfKeys } = action.payload;
      return {
        totalKeystrokes: state.totalKeystrokes + numberOfKeys,
        correctKeystrokes: state.correctKeystrokes + (isCorrect ? 1 : 0),
        startTime: state.startTime ?? timestamp,
        lastTimestamp: timestamp,
        isRunning: true,
      };
    case "SET_INACTIVE":
      return {
        ...state,
        isRunning: false,
      };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

export function useTypingSessionPerformance() {
  const [state, dispatch] = useReducer(typingReducer, initialState);
  const [history, setHistory] = useState<SessionRecord[]>([]);

  const inactivityTimer = useRef<NodeJS.Timeout | null>(null);

  // Load history from localStorage once
  useEffect(() => {
    const stored = localStorage.getItem(HISTORY_STORAGE_KEY);
    if (stored) {
      setHistory(JSON.parse(stored));
    }
  }, []);

  // WPM
  const wpm = useMemo(() => {
    if (!state.startTime || !state.lastTimestamp || state.totalKeystrokes === 0)
      return 0;
    const elapsedMinutes =
      (state.lastTimestamp - state.startTime) / (1000 * 60);
    const wordsTyped = state.totalKeystrokes / 5;
    return elapsedMinutes > 0 ? wordsTyped / elapsedMinutes : 0;
  }, [state.startTime, state.lastTimestamp, state.totalKeystrokes]);

  // Accuracy
  const accuracy = useMemo(() => {
    if (state.totalKeystrokes === 0) return 100;
    return (state.correctKeystrokes / state.totalKeystrokes) * 100;
  }, [state.correctKeystrokes, state.totalKeystrokes]);

  // Adjusted WPM
  const adjustedWpm = useMemo(() => {
    return wpm * (accuracy / 100);
  }, [wpm, accuracy]);

  const saveSessionToHistory = () => {
    if (state.totalKeystrokes === 0) return; // No need to save empty sessions

    const newSession: SessionRecord = {
      wpm,
      accuracy,
      adjustedWpm,
      timestamp: Date.now(),
    };

    const updatedHistory = [newSession, ...history].slice(0, 50); // Keep only latest 50 sessions
    setHistory(updatedHistory);
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updatedHistory));
  };

  const onPerformanceCalculate = (input: KeyPressInput) => {
    dispatch({ type: "KEY_PRESS", payload: input });

    // Reset inactivity timer
    if (inactivityTimer.current) {
      clearTimeout(inactivityTimer.current);
    }
    inactivityTimer.current = setTimeout(() => {
      dispatch({ type: "SET_INACTIVE" });
      saveSessionToHistory();
    }, 5000); // 5 seconds inactivity
  };

  const reset = () => {
    if (inactivityTimer.current) {
      clearTimeout(inactivityTimer.current);
    }
    saveSessionToHistory();
    dispatch({ type: "RESET" });
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
    wpm: Math.round(wpm),
    accuracy: Math.round(accuracy),
    adjustedWpm,
    isRunning: state.isRunning,
    history,
    onPerformanceCalculate,
    reset,
    clearHistory,
  };
}
