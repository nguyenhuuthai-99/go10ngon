import { use, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hook";
import { handlePerformanceCalculation } from "@/hooks/use-performance-thunk";
import { updatePerformance } from "@/slice/typing-session-performance-slice";

export const useTypingSessionTimer = () => {
  const typingSessionState = useAppSelector(
    (state) => state.typingSessionState,
  );
  const dispatch = useAppDispatch();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  //trigger timer when typing state change
  useEffect(() => {
    if (typingSessionState.isStarted && !typingSessionState.isEnded) {
      if (timerRef.current) clearInterval(timerRef.current);

      timerRef.current = setInterval(() => {
        dispatch(handlePerformanceCalculation());
      }, 1000);
    }

    // Cleanup when ended or unmounted
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [typingSessionState.isStarted, typingSessionState.isEnded]);

  function startTimer() {}

  function stopTimer() {}

  function pauseTimer() {}

  function resetTimer() {}
};
