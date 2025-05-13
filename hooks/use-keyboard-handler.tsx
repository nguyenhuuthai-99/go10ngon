import usePerformanceCalculate from "@/hooks/use-performance-calculate";
import {
  markAsStart,
  setTypedWords,
} from "@/lib/redux/slice/typing-session-slice";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hook";
import { useTypingSessionPerformance } from "@/hooks/use-typing-session-performance";

interface Props {
  currentWordIndex: number;
  moveToNextWord: () => void;
  moveToPreviousChar: (restoreInputValue: (value: string) => void) => void;
  moveCharToIndex: (index: number) => void;
}
export function useKeyboardHandler({
  currentWordIndex,
  moveToNextWord,
  moveToPreviousChar,
  moveCharToIndex,
}: Props) {
  const typingSessionState = useAppSelector(
    (state) => state.typingSessionState,
  );

  const targetValue =
    typingSessionState.typingGameMode.modeContext.text[currentWordIndex];
  const previousWord = typingSessionState.typedWords[currentWordIndex];

  const { isCorrectAndWithin, onDelete, checkMissingChar } =
    usePerformanceCalculate({
      targetValue,
      currentWordIndex,
    });

  const { onPerformanceCalculate } = useTypingSessionPerformance();

  const dispatch = useAppDispatch();

  function onKeyDown(
    key: string,
    value: string,
    timestamp: number,
    restoreInputValue: (value: string) => void,
  ) {
    if (!typingSessionState.isSessionReady) return;

    if (!typingSessionState.isStarted || !typingSessionState.isTyping) {
      dispatch(markAsStart());
    }

    if (key === " ") {
      const missingKeys = checkMissingChar(previousWord);

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

  function updateTypedWords(value: string) {
    dispatch(
      setTypedWords({
        ...typingSessionState.typedWords,
        [currentWordIndex]: value,
      }),
    );
  }

  function onSpacePress() {
    if (typingSessionState.typedWords[currentWordIndex] === "") return;
    moveToNextWord();
  }

  return {
    onKeyDown,
  };
}
