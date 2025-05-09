import {
  TimedModeDuration,
  TypingMode,
  WordCountQuantity,
} from "@/model/typing-mode";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hook";
import {
  fetchTypingGameThunk,
  resetTypingSessionState,
  resetTypingSessionStateAndWords,
  setReady,
  setTimedContext,
} from "@/lib/redux/slice/typing-session-slice";
import { TimedMode } from "@/model/timed-mode";
import { resetTypingStatsState } from "@/lib/redux/slice/typing-session-stats-slice";
import { resetPerformance } from "@/lib/redux/slice/typing-session-performance-slice";

export function useTypingMode() {
  const mode = useAppSelector(
    (state) => state.typingSessionState.typingGameMode,
  );
  const dispatch = useAppDispatch();
  function updateMode(mode: TypingMode): void {}
  function updateLevel(level: number): void {
    resetSession();
    if (mode.currentTypingMode === TypingMode.timed) {
      dispatch(
        setTimedContext({
          duration: level,
          text: mode.modeContext.text,
        } as TimedMode),
      );
      dispatch(fetchTypingGameThunk());
    } else {
    }
  }

  function resetSession() {
    dispatch(resetTypingStatsState());
    dispatch(resetPerformance());
    dispatch(resetTypingSessionStateAndWords());
  }

  return { updateMode, updateLevel };
}
