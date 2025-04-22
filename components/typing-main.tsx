"use client";
import { Timer } from "@/components/ui/timer";
import { WordCounter } from "@/components/ui/word-counter";
import { TypingPanel } from "@/components/ui/typing-panel";
import { useEffect, useState } from "react";
import { getTest } from "@/lib/infrastructure/api/services/app-service";

export function TypingMain() {
  const [currentMode, setCurrentMode] = useState<TypingMode>(0);
  const [typingTest, setTypingTest] = useState<TypingTest>({
    text: "test",
  });
  const [timedTest, setTimedTest] = useState();
  const [wordsTest, setWordsTest] = useState();

  useEffect(() => {
    const fetchedText = getTest();
    setTypingTest((prevState) => {
      return {
        text: fetchedText,
      };
    });
    setCurrentMode(1);
  }, []);

  console.log(typingTest);
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
      <div className="flex max-w-[85%] flex-col items-center gap-3">
        <Timer time={60} visible={currentMode === 0} />
        <WordCounter count={120} visible={currentMode === 1} />
        <TypingPanel text={typingTest.text} reference={typingTest.reference} />
      </div>
    </div>
  );
}
