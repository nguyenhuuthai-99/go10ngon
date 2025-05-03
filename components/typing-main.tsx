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
import {
  TypingSessionPerformance,
  useTypingSessionPerformance,
} from "@/hooks/use-typing-session-performance";
import { TypingResult } from "@/components/typing-components/typing-result";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hook";
import { markAsEnd } from "@/slice/typing-session-slice";

export const TypingContext = createContext<{
  typingPerformance: TypingSessionPerformance;
} | null>(null);
export const TypingPerformanceContext = createContext({});

export function TypingMain() {
  const [currentMode, setCurrentMode] = useState<TypingMode>(TypingMode.timed);
  const [typingTest, setTypingTest] = useState<TypingTest | null>(null);
  const [timedTest, setTimedTest] = useState();
  const [wordsTest, setWordsTest] = useState();
  const typingSessionPerformance: TypingSessionPerformance =
    useTypingSessionPerformance();

  const typingSessionState = useAppSelector(
    (state) => state.typingSessionState,
  );
  const typingSessionDispatch = useAppDispatch();

  const { remainingTime, resetTimer, startTimer } = useTimer({
    duration: 10,
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
    <TypingContext.Provider
      value={{
        typingPerformance: typingSessionPerformance,
      }}
    >
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
              wpm={typingSessionPerformance.wpm}
              accuracy={typingSessionPerformance.accuracy}
              typedWords={["nguyễn", "huu", "thaiii"]}
              words={["nguyễn", "hữu", "thái"]}
            />
          )
        ) : (
          <span>Loading...</span>
        )}
      </div>
    </TypingContext.Provider>
  );
}
