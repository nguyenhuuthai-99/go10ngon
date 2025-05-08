import { useEffect, useRef, useState } from "react";
import { useAppSelector } from "@/hooks/redux-hook";
import { TimedMode } from "@/model/timed-mode";

interface TimerProps {
  onTimeUp: () => void;
}

export function useCountdownTimer({ onTimeUp }: TimerProps) {
  const duration = useAppSelector(
    (state) =>
      (state.typingSessionState.typingGameMode.modeContext as TimedMode)
        .duration,
  );
  const [remainingTime, setRemainingTime] = useState(duration);
  const isTimerEnd = useRef(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => clearTimer();
  }, []);

  useEffect(() => {
    setRemainingTime(duration);
  }, [duration]);

  function startTimer() {
    const endTime = Date.now() + duration * 1000;

    timerRef.current = setInterval(() => {
      const timeLeft = Math.max(0, Math.round((endTime - Date.now()) / 1000));
      setRemainingTime(timeLeft);

      if (timeLeft <= 0) {
        onTimeUp();
        resetTimer();
        isTimerEnd.current = true;
      }
    }, 1000);
  }
  function clearTimer() {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }
  function resetTimer() {
    clearTimer();
    setRemainingTime(duration);
  }

  return {
    startTimer,
    remainingTime,
  };
}
