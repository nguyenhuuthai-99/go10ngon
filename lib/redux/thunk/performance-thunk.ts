import { AppDispatch, RootState } from "@/lib/store";
import {
  updatePerformance,
  addToHistory,
} from "@/lib/redux/slice/typing-session-performance-slice";
import { keyPress } from "@/lib/redux/slice/typing-session-stats-slice";
import {
  HISTORY_STORAGE_KEY,
  KeyPressInput,
} from "@/hooks/use-typing-session-performance";

// export const handleKeyPress =
//   (input: KeyPressInput) =>
//   (dispatch: AppDispatch, getState: () => RootState) => {
//     dispatch(keyPress(input));
//   };

export const handlePerformanceCalculation =
  () => (dispatch: AppDispatch, getState: () => RootState) => {
    // Now get the updated state (since this is a batch op inside Redux)
    const state = getState().typingSessionStats;
    const {
      totalKeystrokes,
      totalKeyPressed,
      correctKeystrokes,
      startTime,
      lastTimestamp,
    } = state;

    if (!startTime || !lastTimestamp || totalKeystrokes === 0) return;

    const currentTime = performance.now();

    const elapsedMinutes = (currentTime - startTime) / (1000 * 60);
    const wordsTyped = totalKeyPressed / 5;
    const wpm = elapsedMinutes > 0 ? wordsTyped / elapsedMinutes : 0;
    const accuracy = (correctKeystrokes / totalKeystrokes) * 100;
    const adjustedWpm = correctKeystrokes / 5 / elapsedMinutes;
    const session = {
      wpm,
      key: null,
      accuracy,
      adjustedWpm,
      correctKeystrokes,
      timestamp: currentTime,
    };

    dispatch(updatePerformance({ wpm, accuracy, adjustedWpm }));
    dispatch(addToHistory(session));
  };
