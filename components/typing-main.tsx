"use client";
import { Timer } from "@/components/ui/timer";
import { WordCounter } from "@/components/ui/word-counter";
import { TypingPanel } from "@/components/ui/typing-panel";
import { useEffect, useState } from "react";
import { getTest } from "@/lib/infrastructure/api/services/app-service";
import { TypingMode } from "@/model/typing-mode";

export function TypingMain() {
  const [currentMode, setCurrentMode] = useState<TypingMode>(TypingMode.timed);
  const [typingTest, setTypingTest] = useState<TypingTest | null>(null);
  const [timedTest, setTimedTest] = useState();
  const [wordsTest, setWordsTest] = useState();

  useEffect(() => {
    const fetchedText = getTest();
    setTypingTest((prevState) => {
      return {
        text: fetchedText,
      };
    });
    setCurrentMode(TypingMode.words);
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
        <div className="flex max-w-[85%] flex-col items-center gap-3">
          <Timer time={60} visible={currentMode === TypingMode.timed} />
          <WordCounter count={120} visible={currentMode === TypingMode.words} />
          <TypingPanel
            text={typingTest!.text}
            reference={typingTest.reference}
          />
        </div>
      ) : (
        <span>Loading...</span>
      )}
    </div>
  );
}
