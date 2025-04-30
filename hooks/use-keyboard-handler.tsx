import { useRef } from "react";
import { TypingSessionStateHandler } from "@/hooks/use-typing-session-state";
import usePerformanceCalculate from "@/hooks/use-char-comparision";
import { useTypingSessionPerformance } from "@/hooks/use-typing-session-performance";

interface Props {
  typingSessionStateHandler: TypingSessionStateHandler;
  typingSession: {
    currentWordIndex: number;
    moveToNextWord: () => void;
    moveToPreviousChar: (restoreInputValue: (value: string) => void) => void;
    moveCharToIndex: (index: number) => void;
    updateTypedWords: (value: string) => void;
  };
  previousWord: string;
  targetValue: string;
}
export function useKeyboardHandler({
  typingSessionStateHandler: {
    typingSessionState: { isTyping, isEnded },
    startTyping,
  },
  typingSession: {
    currentWordIndex,
    moveToNextWord,
    moveToPreviousChar,
    moveCharToIndex,
    updateTypedWords,
  },
  previousWord,
  targetValue,
}: Props) {
  const { isCorrectAndWithin, onDelete, checkMissingChar } =
    usePerformanceCalculate({
      targetValue,
      currentWordIndex,
    });

  const { wpm, accuracy, onPerformanceCalculate } =
    useTypingSessionPerformance();

  function onKeyDown(
    key: string,
    value: string,
    timestamp: number,
    restoreInputValue: (value: string) => void,
  ) {
    if (isEnded) return;

    if (!isTyping) {
      startTyping();
    }

    if (key === " ") {
      const missingKeys = checkMissingChar(previousWord);
      console.log(missingKeys);
      onPerformanceCalculate({
        isCorrect: false,
        timestamp,
        numberOfKeys: missingKeys,
      });
      onPerformanceCalculate({ isCorrect: true, timestamp, numberOfKeys: 1 });
      onSpacePress();
      return;
    }

    if (key === "Backspace" || key === "Delete") {
      onDelete(value);
      moveToPreviousChar(restoreInputValue);
    } else {
      moveCharToIndex(value.length);

      let isCorrect: boolean = isCorrectAndWithin(value, previousWord);
      onPerformanceCalculate({ isCorrect, timestamp, numberOfKeys: 1 });
    }

    updateTypedWords(value);
  }

  function onSpacePress() {
    moveToNextWord();
  }

  return {
    onKeyDown,
    wpm,
    accuracy,
  };
}
