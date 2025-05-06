import { useEffect, useState } from "react";
import { useKeyboardHandler } from "@/hooks/use-keyboard-handler";
import { useCountdownTimer } from "@/hooks/use-countdown-timer";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hook";
import { resetTypingSessionState } from "@/lib/feature/slice/typing-session-slice";
import { useTypingSessionTimer } from "@/hooks/use-typing-session-timer";
import {
  resetTypedWords,
  setTypedWords,
} from "@/lib/feature/slice/typing-session-store-slice";

interface Props {
  words: string[];
  duration?: number;
}
export function useTypingSession({ duration = 0 }: Props) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  // const [typedWords, setTypedWords] = useState<{ [key: number]: string }>({});

  const { typedWords, words } = useAppSelector(
    (state) => state.typingSessionStore,
  );
  const typingSessionState = useAppSelector(
    (state) => state.typingSessionState,
  );
  const dispatch = useAppDispatch();
  //timer
  const { remainingTime, resetTimer, startTimer } = useCountdownTimer({
    duration: duration || 0,
    onTimerEnd,
  });

  useTypingSessionTimer();

  const { onKeyDown } = useKeyboardHandler({
    typingSession: {
      currentWordIndex,
      moveToNextWord,
      moveCharToIndex,
      moveToPreviousChar,
      updateTypedWords,
    },
    previousWord: typedWords[currentWordIndex],
    targetValue: words[currentWordIndex],
  });

  //trigger end game
  useEffect(() => {
    if (isSessionEnd()) {
      //todo check here
      dispatch(resetTypingSessionState());
      // typingSessionStateHandler.resetTypingSessionState();
    }
  }, [currentCharIndex, currentWordIndex]);

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
  function updateTypedWords(value: string) {
    dispatch(setTypedWords({ ...typedWords, [currentWordIndex]: value }));
  }

  function onTimerEnd() {}

  function resetTypingSession() {
    setCurrentWordIndex(0);
    setCurrentCharIndex(0);
    dispatch(resetTypedWords());
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
    typingSessionState,
    remainingTime,
    onKeyDown,
    moveCharToIndex,
    moveToPreviousChar,
    moveToNextWord,
    updateTypedWords,
  };
}
