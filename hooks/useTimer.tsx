import { useEffect, useRef, useState } from "react";

interface TimerProps {
  duration: number;
  onTimerEnd: () => void;
}

export function useTimer({ duration, onTimerEnd }: TimerProps) {
  const [remainingTime, setRemainingTime] = useState(duration);
  const isTimerEnd = useRef(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => clearTimer();
  }, []);
  function startTimer() {
    const endTime = Date.now() + duration * 1000;

    timerRef.current = setInterval(() => {
      const timeLeft = Math.max(0, Math.round((endTime - Date.now()) / 1000));
      setRemainingTime(timeLeft);

      if (timeLeft <= 0) {
        clearTimer();
        isTimerEnd.current = true;
        onTimerEnd();
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
    resetTimer,
  };
}
