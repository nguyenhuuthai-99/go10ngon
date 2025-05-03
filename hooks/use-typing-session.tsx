import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import useTypingSessionState, {
  TypingSessionState,
  TypingSessionStateHandler,
} from "@/hooks/use-typing-session-state";
import { useKeyboardHandler } from "@/hooks/use-keyboard-handler";
import { useTypingSessionPerformance } from "@/hooks/use-typing-session-performance";
import usePerformanceCalculate from "@/hooks/use-char-comparision";
import { useTimer } from "@/hooks/useTimer";
import { TypingContext, TypingStateContext } from "@/components/typing-main";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hook";
import { resetTypingSessionState } from "@/slice/typing-session-slice";
import { RootState } from "@/app/store";

interface Props {
  words: string[];
  duration?: number;
}
export function useTypingSession({ words, duration }: Props) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [typedWords, setTypedWords] = useState<{ [key: number]: string }>({});
  // const typingSessionStateHandler = useContext(TypingContext)?.typingState!;

  const typingSessionState = useAppSelector(
    (state) => state.typingSessionState,
  );
  const typingSessionDispatch = useAppDispatch();
  //timer
  const { remainingTime, resetTimer, startTimer } = useTimer({
    duration: duration || 0,
    onTimerEnd,
  });

  const { onKeyDown, wpm, accuracy } = useKeyboardHandler({
    typingSessionState,
    typingSessionDispatch,
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
      typingSessionDispatch(resetTypingSessionState());
      // typingSessionStateHandler.resetTypingSessionState();
    }
  }, [currentCharIndex, currentWordIndex]);

  //end game
  // useEffect(() => {
  //   if (typingSessionStateHandler.typingSessionState.isEnded)
  //     resetTypingSession();
  // }, [typingSessionStateHandler.typingSessionState.isEnded]);

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
    setTypedWords((prev) => ({ ...prev, [currentWordIndex]: value }));
  }

  function onTimerEnd() {}

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
    typingSessionState,
    wpm,
    accuracy,
    remainingTime,
    onKeyDown,
    moveCharToIndex,
    moveToPreviousChar,
    moveToNextWord,
    updateTypedWords,
  };
}
