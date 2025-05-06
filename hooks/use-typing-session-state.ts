import { useAppDispatch, useAppSelector } from "@/hooks/redux-hook";
import { useEffect } from "react";
import { resetPerformance } from "@/lib/redux/slice/typing-session-performance-slice";
import { resetTypingStatsState } from "@/lib/redux/slice/typing-session-stats-slice";
import { resetTypingSessionState } from "@/lib/redux/slice/typing-session-slice";

export function useTypingSessionState(resetTypingSession: () => void) {
  const typingSessionState = useAppSelector(
    (state) => state.typingSessionState,
  );
  const dispatch = useAppDispatch();

  //start Game
  useEffect(() => {}, [typingSessionState.isStarted]);

  //end Game
  useEffect(() => {
    if (!typingSessionState.isEnded) return;
    resetTypingSession();
  }, [typingSessionState.isEnded]);
}
