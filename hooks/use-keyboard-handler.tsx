import usePerformanceCalculate from "@/hooks/use-char-comparision";
import { markAsStart } from "@/slice/typing-session-slice";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hook";
import { useDispatch } from "react-redux";
import { useTypingSessionPerformance } from "@/hooks/use-typing-session-performance";

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

  const { onPerformanceCalculate } = useTypingSessionPerformance();

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
      // onPerformanceCalculate({
      //   isCorrect: false,
      //   key: key,
      //   timestamp,
      //   numberOfKeys: missingKeys,
      // });

      console.log(missingKeys);

      onPerformanceCalculate({
        isCorrect: true,
        key: key,
        timestamp,
        numberOfKeys: 1 + missingKeys,
      });
      onSpacePress();
      return;
    }

    if (key === "Backspace" || key === "Delete") {
      onDelete(value);
      moveToPreviousChar(restoreInputValue);
    } else {
      moveCharToIndex(value.length);

      let isCorrect: boolean = isCorrectAndWithin(value, previousWord);
      onPerformanceCalculate({
        isCorrect,
        key: key,
        timestamp,
        numberOfKeys: 1,
      });
    }

    updateTypedWords(value);
  }

  function onSpacePress() {
    moveToNextWord();
  }

  return {
    onKeyDown,
  };
}
