import { useContext, useRef } from "react";
import usePerformanceCalculate from "@/hooks/use-char-comparision";
import { TypingContext } from "@/components/typing-main";
import { markAsStart } from "@/slice/typing-session-slice";
import { useAppSelector } from "@/hooks/redux-hook";
import { useDispatch } from "react-redux";

interface Props {
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
    useContext(TypingContext)?.typingPerformance!;

  const typingSessionState = useAppSelector(
    (state) => state.typingSessionState,
  );
  const typingSessionDispatch = useDispatch();

  function onKeyDown(
    key: string,
    value: string,
    timestamp: number,
    restoreInputValue: (value: string) => void,
  ) {
    // if (isEnded) return;

    if (!typingSessionState.isStarted) {
      typingSessionDispatch(markAsStart());
    }

    if (key === " ") {
      const missingKeys = checkMissingChar(previousWord);
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
