import { Dispatch, SetStateAction, useEffect, useState } from "react";
import useTypingSessionState, {
  TypingSessionState,
  TypingSessionStateHandler,
} from "@/hooks/use-typing-session-state";
import { useKeyboardHandler } from "@/hooks/use-keyboard-handler";
import { useTypingSessionPerformance } from "@/hooks/use-typing-session-performance";
import usePerformanceCalculate from "@/hooks/use-char-comparision";

export function useTypingSession(words: string[]) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [typedWords, setTypedWords] = useState<{ [key: number]: string }>({});
  const typingSessionStateHandler = useTypingSessionState();
  const { wpm, accuracy, onPerformanceCalculate } =
    useTypingSessionPerformance();

  const { onKeyDown, timestamp, currentValue } = useKeyboardHandler({
    typingSessionStateHandler,
    typingSession: {
      moveToNextWord,
      moveCharToIndex,
      moveToPreviousChar,
      updateTypedWords,
    },
  });

  // const { compareChar, trackBackParent } = usePerformanceCalculate({
  //   targetValue: words[currentWordIndex],
  //   currentValue,
  //   currentWordIndex,
  // });

  //initialize typedWords
  useEffect(() => {
    const initialTypedWords: { [key: number]: string } = {};
    words.forEach((value, index) => {
      initialTypedWords[index] = "";
    });
    setTypedWords(initialTypedWords);
  }, []);

  //trigger end game
  useEffect(() => {
    if (isSessionEnd()) {
      typingSessionStateHandler.resetTypingSessionState();
    }
  }, [currentCharIndex, currentWordIndex]);

  //end game
  useEffect(() => {
    if (typingSessionStateHandler.typingSessionState.isEnded)
      resetTypingSession();
  }, [typingSessionStateHandler.typingSessionState.isEnded]);

  function moveToNextWord() {
    setCurrentWordIndex((prevIndex) => prevIndex + 1);
    setCurrentCharIndex(0);
  }

  function moveCharToIndex(index: number) {
    console.log(currentValue, typedWords[currentWordIndex]);

    setCurrentCharIndex(index);
  }

  function checkIsCharCorrect() {}

  function moveToPreviousWord(restoreInputValue: (value: string) => void) {
    const prevIndex: number = currentWordIndex - 1;
    const prevWord: string = typedWords[prevIndex] ?? "";
    setCurrentWordIndex(prevIndex);
    setCurrentCharIndex(prevWord.length);
    restoreInputValue(prevWord);
  }

  function moveToPreviousChar(restoreInputValue: (value: string) => void) {
    if (currentCharIndex > 0) {
      const updatedCharIndex = currentCharIndex - 1;
      moveCharToIndex(updatedCharIndex);
    } else if (currentCharIndex === 0 && currentWordIndex > 0) {
      moveToPreviousWord(restoreInputValue);
    }
  }
  function updateTypedWords(value: string) {
    setTypedWords((prev) => ({ ...prev, [currentWordIndex]: value }));
  }

  function calculateTypingPerformance(isCorrect: boolean) {
    onPerformanceCalculate({
      isCorrect,
      timestamp: timestamp,
    });
  }

  function resetTypingSession() {
    setCurrentWordIndex(0);
    setCurrentCharIndex(0);
    setTypedWords({});
  }

  function isSessionEnd() {
    return (
      currentWordIndex >= words.length ||
      (currentCharIndex === words[words.length - 1]?.length - 1 &&
        currentWordIndex === words.length - 1)
    );
  }

  return {
    currentWordIndex,
    currentCharIndex,
    typedWords,
    typingSessionStateHandler,
    wpm,
    onKeyDown,
    moveCharToIndex,
    moveToPreviousChar,
    moveToNextWord,
    calculateTypingPerformance,
    updateTypedWords,
  };
}
