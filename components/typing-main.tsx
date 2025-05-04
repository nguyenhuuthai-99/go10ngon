"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { getTest } from "@/lib/infrastructure/api/services/app-service";
import {
  TimedModeDuration,
  TypingMode,
  WordCountQuantity,
} from "@/model/typing-mode";
import { useCountdownTimer } from "@/hooks/use-countdown-timer";
import { TypingGame } from "@/components/typing-game";
import { TypingResult } from "@/components/typing-components/typing-result";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hook";
import { markAsEnd } from "@/slice/typing-session-slice";
import { TypingSessionPerformance } from "@/slice/typing-session-performance-slice";

export function TypingMain() {
  const [currentMode, setCurrentMode] = useState<TypingMode>(TypingMode.timed);
  const [typingTest, setTypingTest] = useState<TypingTest | null>(null);
  const [timedTest, setTimedTest] = useState();
  const [wordsTest, setWordsTest] = useState();
  const typingSessionPerformance: TypingSessionPerformance = useAppSelector(
    (state) => state.typingSessionPerformance,
  );

  const typingSessionState = useAppSelector(
    (state) => state.typingSessionState,
  );
  const typingSessionDispatch = useAppDispatch();

  const { remainingTime, resetTimer, startTimer } = useCountdownTimer({
    duration: TimedModeDuration.short,
    onTimerEnd: () => {
      typingSessionDispatch(markAsEnd());
    },
  });

  useEffect(() => {
    if (typingSessionState.isStarted) {
      if (currentMode === TypingMode.timed) {
        startTimer();
      }
    }
  }, [typingSessionState.isStarted]);

  useEffect(() => {
    const fetchedText = getTest();
    setTypingTest((prevState) => {
      return {
        text: fetchedText,
      };
    });
  }, []);
  function getTimedModeWords() {}

  function getWordsModeWords() {}

  function getQuotesModeWords() {}

  function pickTypingTest() {
    if (currentMode === TypingMode.timed) {
    } else if (currentMode === TypingMode.words) {
    } else if (currentMode === TypingMode.quote) {
    }
  }

  function setTypingTestFromQuote() {}

  function setTypingTestFromTimed() {}

  return (
    <div className="flex items-center justify-center select-none">
      {typingTest ? (
        !typingSessionState.isEnded ? (
          <TypingGame
            typingTest={typingTest}
            currentMode={currentMode}
            duration={remainingTime}
            count={0}
          />
        ) : (
          <TypingResult
            typedWords={["nguyễn", "huu", "thaiii"]}
            words={["nguyễn", "hữu", "thái"]}
          />
        )
      ) : (
        <span>Loading...</span>
      )}
    </div>
  );
}
