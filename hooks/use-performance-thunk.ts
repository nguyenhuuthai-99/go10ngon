import { AppDispatch, RootState } from "@/app/store";
import {
  updatePerformance,
  addToHistory,
} from "@/slice/typing-session-performance-slice";
import { keyPress } from "@/slice/typing-session-stats-slice";
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
      timestamp: Date.now(),
    };

    dispatch(updatePerformance({ wpm, accuracy, adjustedWpm }));
    dispatch(addToHistory(session));
    localStorage.setItem(
      HISTORY_STORAGE_KEY,
      JSON.stringify([...getState().typingSessionPerformance.history, session]),
    );
  };
//
// export const handlePerformanceCalculation =
// () => (dispatch: AppDispatch, getState: () => RootState) => {
//   // Now get the updated state (since this is a batch op inside Redux)
//   const state = getState().typingSessionStats;
//   const { totalKeystrokes, correctKeystrokes, startTime, lastTimestamp } =
//     state;
//
//   if (!startTime || !lastTimestamp || totalKeystrokes === 0) return;
//
//   const elapsedMinutes = (lastTimestamp - startTime) / (1000 * 60);
//   const wordsTyped = totalKeystrokes / 5;
//   const wpm = elapsedMinutes > 0 ? wordsTyped / elapsedMinutes : 0;
//   const accuracy = (correctKeystrokes / totalKeystrokes) * 100;
//   const adjustedWpm = wpm * (accuracy / 100);
//
//   const session = {
//     wpm,
//     key: null,
//     accuracy,
//     adjustedWpm,
//     timestamp: Date.now(),
//   };
//
//   dispatch(updatePerformance({ wpm, accuracy }));
//   dispatch(addToHistory(session));
//   localStorage.setItem(
//     HISTORY_STORAGE_KEY,
//     JSON.stringify([...getState().typingSessionPerformance.history, session]),
//   );
// };
