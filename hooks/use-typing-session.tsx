import { useEffect, useState } from "react";
import { useKeyboardHandler } from "@/hooks/use-keyboard-handler";
import { useCountdownTimer } from "@/hooks/use-countdown-timer";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hook";
import {
  resetTypedWords,
  resetTypingSessionState,
  setTypedWords,
} from "@/lib/feature/slice/typing-session-slice";
import { useTypingSessionTimer } from "@/hooks/use-typing-session-timer";

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
  const words = useAppSelector(
    (state) => state.typingSessionState.typingGameMode.modeContext.text,
  );
  const typingSessionState = useAppSelector(
    (state) => state.typingSessionState,
  );
  const dispatch = useAppDispatch();

  useTypingSessionTimer();

  const { onKeyDown } = useKeyboardHandler({
    typingSession: {
      currentWordIndex,
      moveToNextWord,
      moveCharToIndex,
      moveToPreviousChar,
    },
    previousWord: typedWords[currentWordIndex],
    targetValue: words[currentWordIndex],
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
    dispatch(resetTypedWords());
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
