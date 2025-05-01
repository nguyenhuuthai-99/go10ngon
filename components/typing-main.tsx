"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { getTest } from "@/lib/infrastructure/api/services/app-service";
import {
  TimedModeDuration,
  TypingMode,
  WordCountQuantity,
} from "@/model/typing-mode";
import { useTimer } from "@/hooks/useTimer";
import { TypingGame } from "@/components/typing-game";
import useTypingSessionState, {
  defaultTypingSessionState,
  TypingSessionState,
  TypingSessionStateHandler,
} from "@/hooks/use-typing-session-state";
import {
  TypingSessionPerformance,
  useTypingSessionPerformance,
} from "@/hooks/use-typing-session-performance";

export const TypingContext = createContext<{
  typingState: TypingSessionStateHandler;
  typingPerformance: TypingSessionPerformance;
} | null>(null);
export const TypingStateContext = createContext<TypingSessionStateHandler>(
  defaultTypingSessionState,
);

export const TypingPerformanceContext = createContext({});

export function TypingMain() {
  const [currentMode, setCurrentMode] = useState<TypingMode>(TypingMode.timed);
  const [typingTest, setTypingTest] = useState<TypingTest | null>(null);
  const [timedTest, setTimedTest] = useState();
  const [wordsTest, setWordsTest] = useState();
  const typingSessionStateHandler = useTypingSessionState();
  const typingSessionPerformance: TypingSessionPerformance =
    useTypingSessionPerformance();

  const { remainingTime, resetTimer, startTimer } = useTimer({
    duration: 10,
    onTimerEnd: () => {
      console.log("endTimer");
    },
  });

  useEffect(() => {
    if (!typingSessionStateHandler.typingSessionState.isEnded) {
      if (currentMode === TypingMode.timed) {
        console.log("started");
        startTimer();
      }
    }
  }, [typingSessionStateHandler.typingSessionState.isEnded]);

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
    <TypingContext.Provider
      value={{
        typingState: typingSessionStateHandler,
        typingPerformance: typingSessionPerformance,
      }}
    >
      <div className="flex items-center justify-center select-none">
        {typingTest ? (
          <TypingGame
            typingTest={typingTest}
            currentMode={currentMode}
            duration={remainingTime}
            count={0}
          />
        ) : (
          <span>Loading...</span>
        )}
      </div>
    </TypingContext.Provider>
  );
}
