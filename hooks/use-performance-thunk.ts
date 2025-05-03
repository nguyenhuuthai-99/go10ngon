import { AppDispatch, RootState } from "@/app/store";
import {
  updatePerformance,
  addToHistory,
} from "@/slice/typing-session-performance-slice";

export const useCalculateAndSavePerformance =
  (keystroke: string) => (dispatch: AppDispatch, getState: () => RootState) => {
    const state = getState().typingSessionStats;

    if (!state.startTime || !state.lastTimestamp || state.totalKeystrokes === 0)
      return;

    const elapsedMinutes =
      (state.lastTimestamp - state.startTime) / (1000 * 60);
    const wordsTyped = state.totalKeystrokes / 5;
    const wpm = elapsedMinutes > 0 ? wordsTyped / elapsedMinutes : 0;
    const accuracy =
      state.totalKeystrokes === 0
        ? 100
        : (state.correctKeystrokes / state.totalKeystrokes) * 100;
    const adjustedWpm = wpm * (accuracy / 100);

    const session = {
      wpm,
      key: keystroke,
      accuracy,
      adjustedWpm,
      timestamp: Date.now(),
    };

    dispatch(updatePerformance({ wpm, accuracy }));
    dispatch(addToHistory(session));

    // Optionally persist history to localStorage here if not done via useEffect
    const currentHistory = getState().typingSessionPerformance.history;
    localStorage.setItem(
      "typingSessionHistory",
      JSON.stringify(currentHistory),
    );
  };
