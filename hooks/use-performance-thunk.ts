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

export const handleKeyPressAndCalculate =
  (input: KeyPressInput) =>
  (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(keyPress(input));

    // Now get the updated state (since this is a batch op inside Redux)
    const state = getState().typingSessionStats;
    const { totalKeystrokes, correctKeystrokes, startTime, lastTimestamp } =
      state;

    if (!startTime || !lastTimestamp || totalKeystrokes === 0) return;

    const elapsedMinutes = (lastTimestamp - startTime) / (1000 * 60);
    const wordsTyped = totalKeystrokes / 5;
    const wpm = elapsedMinutes > 0 ? wordsTyped / elapsedMinutes : 0;
    const accuracy = (correctKeystrokes / totalKeystrokes) * 100;
    const adjustedWpm = wpm * (accuracy / 100);

    const session = {
      wpm,
      key: input.key,
      accuracy,
      adjustedWpm,
      timestamp: Date.now(),
    };

    dispatch(updatePerformance({ wpm, accuracy }));
    dispatch(addToHistory(session));
    localStorage.setItem(
      HISTORY_STORAGE_KEY,
      JSON.stringify([...getState().typingSessionPerformance.history, session]),
    );
  };
