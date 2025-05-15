import { useAppDispatch, useAppSelector } from "@/hooks/redux-hook";
import {
  changeTypingGameMode,
  fetchTypingGameThunk,
  resetTypingSessionState,
  resetTypingSessionStateAndWords,
  setTimedContext,
  setTimedModeDuration,
  setWordCount,
  setWordCountContext,
} from "@/lib/redux/slice/typing-session-slice";
import { resetTypingStatsState } from "@/lib/redux/slice/typing-session-stats-slice";
import { resetPerformance } from "@/lib/redux/slice/typing-session-performance-slice";
import { TypingMode } from "@/model/typing-mode";

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
      dispatch(setTimedModeDuration(level));
    } else {
      dispatch(setWordCount(level));
    }
    dispatch(fetchTypingGameThunk());
  }

  function updateMode(mode: TypingMode): void {
    resetSession();
    dispatch(resetTypingSessionStateAndWords());
    dispatch(changeTypingGameMode(mode));
    dispatch(fetchTypingGameThunk());
  }

  function updateModeAndLevel({
    mode,
    duration,
    count,
  }: {
    mode: TypingMode;
    duration: number;
    count: number;
  }): void {
    resetSession();
    dispatch(resetTypingSessionStateAndWords());
    dispatch(changeTypingGameMode(mode));
    if (mode === TypingMode.timed) {
      dispatch(setTimedModeDuration(duration));
    } else if (mode === TypingMode.wordCount) {
      dispatch(setWordCount(count));
    }
    dispatch(fetchTypingGameThunk());
  }

  return {
    restartSession,
    refreshSession,
    updateLevel,
    updateMode,
    updateModeAndLevel,
  };
}
