import { Dispatch, SetStateAction, useEffect, useState } from "react";
import useTypingSessionState from "@/hooks/use-typing-session-state";

export function useTypingSession(words: string[]) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [typedWords, setTypedWords] = useState<{ [key: number]: string }>({});
  const typingSessionState = useTypingSessionState({
    words,
    currentWordIndex,
    currentCharIndex,
  });

  //initialize typedWords
  useEffect(() => {
    const initialTypedWords: { [key: number]: string } = {};
    words.forEach((value, index) => {
      initialTypedWords[index] = "";
    });
    setTypedWords(initialTypedWords);
  }, []);

  //end game
  useEffect(() => {
    if (typingSessionState.isEnded) resetTypingSession();
  }, [typingSessionState.isEnded]);

  function moveToNextWord() {
    setCurrentWordIndex((prevIndex) => prevIndex + 1);
    setCurrentCharIndex(0);
  }

  function moveCharToIndex(index: number) {
    console.log(typedWords);
    setCurrentCharIndex(index);
  }

  function moveToPreviousWord(setInputValue: Dispatch<SetStateAction<string>>) {
    const prevIndex: number = currentWordIndex - 1;
    const prevWord: string = typedWords[prevIndex] ?? "";
    setCurrentWordIndex(prevIndex);
    setCurrentCharIndex(prevWord.length);
    setInputValue(prevWord);
  }

  function moveToPreviousChar(setInputValue: Dispatch<SetStateAction<string>>) {
    if (currentCharIndex > 0) {
      const updatedCharIndex = currentCharIndex - 1;
      moveCharToIndex(updatedCharIndex);
    } else if (currentCharIndex === 0 && currentWordIndex > 0) {
      moveToPreviousWord(setInputValue);
    }
  }
  function updateTypedWords(value: string) {
    setTypedWords((prev) => ({ ...prev, [currentWordIndex]: value }));
  }

  function resetTypingSession() {
    setCurrentWordIndex(0);
    setCurrentCharIndex(0);
    setTypedWords({});
  }

  return {
    currentWordIndex,
    currentCharIndex,
    typedWords,
    typingSessionState,
    setCurrentWordIndex,
    setCurrentCharIndex,
    setTypedWords,
    moveCharToIndex,
    moveToPreviousChar,
    moveToNextWord,
    moveToPreviousWord,
    updateTypedWords,
    resetTypingSession: resetTypingSession,
  };
}
