import { useState } from "react";
import { useKeyboardHandler } from "@/hooks/use-keyboard-handler";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hook";
import { resetTypedWords } from "@/lib/redux/slice/typing-session-slice";
import { useTypingSessionTimer } from "@/hooks/use-typing-session-timer";
import { useTypingSessionState } from "@/hooks/use-typing-session-state";

interface Props {
  words: string[];
  duration?: number;
}
export function useTypingSession({ duration = 0 }: Props) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);

  const typedWords = useAppSelector(
    (state) => state.typingSessionState.typedWords,
  );
  const typingSessionState = useAppSelector(
    (state) => state.typingSessionState,
  );

  useTypingSessionTimer();
  useTypingSessionState(resetTypingSession);

  const { onKeyDown } = useKeyboardHandler({
    currentWordIndex,
    moveToNextWord,
    moveCharToIndex,
    moveToPreviousChar,
  });

  function moveToNextWord() {
    setCurrentWordIndex((prevIndex) => prevIndex + 1);
    setCurrentCharIndex(0);
  }

  function moveCharToIndex(index: number) {
    setCurrentCharIndex(index);
  }

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

  function resetTypingSession() {
    setCurrentWordIndex(0);
    setCurrentCharIndex(0);
  }

  return {
    currentWordIndex,
    currentCharIndex,
    typingSessionState,
    onKeyDown,
    moveCharToIndex,
    moveToPreviousChar,
    moveToNextWord,
  };
}
