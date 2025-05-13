import { useAppDispatch, useAppSelector } from "@/hooks/redux-hook";
import { useEffect } from "react";
import {
  clearHistory,
  resetPerformance,
} from "@/lib/redux/slice/typing-session-performance-slice";
import { resetTypingStatsState } from "@/lib/redux/slice/typing-session-stats-slice";
import { resetTypingSessionState } from "@/lib/redux/slice/typing-session-slice";

export function useTypingSessionState(resetTypingSession: () => void) {
  const typingSessionState = useAppSelector(
    (state) => state.typingSessionState,
  );
  const dispatch = useAppDispatch();

  //start Game
  useEffect(() => {
    if (typingSessionState.isStarted) return;
    resetTypingSession();
  }, [typingSessionState.isStarted]);

  //on ready
  useEffect(() => {
    if (typingSessionState.isSessionReady) {
      dispatch(clearHistory());
    }
  }, [typingSessionState.isSessionReady]);

  //end Game
  useEffect(() => {
    if (!typingSessionState.isEnded) return;
    resetTypingSession();
  }, [typingSessionState.isEnded]);
}
