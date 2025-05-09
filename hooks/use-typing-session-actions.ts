import { useAppDispatch, useAppSelector } from "@/hooks/redux-hook";
import {
  fetchTypingGameThunk,
  resetTypingSessionState,
  resetTypingSessionStateAndWords,
  setTimedContext,
} from "@/lib/redux/slice/typing-session-slice";
import { resetTypingStatsState } from "@/lib/redux/slice/typing-session-stats-slice";
import { resetPerformance } from "@/lib/redux/slice/typing-session-performance-slice";
import { TypingMode } from "@/model/typing-mode";
import { TimedMode } from "@/model/timed-mode";

export function useTypingSessionActions() {
  const dispatch = useAppDispatch();
  const mode = useAppSelector(
    (state) => state.typingSessionState.typingGameMode,
  );

  function restartSession() {
    resetSession();
    dispatch(resetTypingSessionState());
  }

  function refreshSession() {
    resetSession();
    dispatch(resetTypingSessionStateAndWords());
    dispatch(fetchTypingGameThunk());
  }

  function resetSession() {
    dispatch(resetTypingStatsState());
    dispatch(resetPerformance());
  }

  function updateLevel(level: number): void {
    resetSession();
    dispatch(resetTypingSessionStateAndWords());
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

  return { restartSession, refreshSession, updateLevel };
}
