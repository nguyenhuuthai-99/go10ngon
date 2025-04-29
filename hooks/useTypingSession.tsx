import { useState } from "react";

export function useTypingSession(words: string[]) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [typedWords, setTypedWords] = useState<{ [key: number]: string }>({});

  function moveToNextWord() {
    setCurrentWordIndex((prevIndex) => prevIndex + 1);
    setCurrentCharIndex(0);
  }

  function moveToNextChar() {
    setCurrentCharIndex((prevIndex) => prevIndex + 1);
  }

  function moveToPreviousWord() {
    const prevIndex: number = currentWordIndex - 1;
    const prevWord: string = typedWords[prevIndex] ?? "";
    setCurrentWordIndex(prevIndex);
    setCurrentCharIndex(prevWord.length);
  }

  function moveToPreviousChar() {
    if (currentCharIndex > 0) {
      const updatedWord = typedWords[currentWordIndex][currentCharIndex].slice(
        0,
        -1,
      );
      updateTypedWords(updatedWord);
      setCurrentCharIndex((prev) => prev - 1);
    } else if (currentCharIndex === 0 && currentWordIndex > 0) {
      moveToPreviousWord();
    }
  }
  function updateTypedWords(value: string) {
    setTypedWords((prev) => ({ ...prev, [currentWordIndex]: value }));
  }

  function resetSession() {
    setCurrentWordIndex(0);
    setCurrentCharIndex(0);
    setTypedWords({});
  }

  return {
    currentWordIndex,
    currentCharIndex,
    typedWords,
    setCurrentWordIndex,
    setCurrentCharIndex,
    setTypedWords,
    updateTypedWords,
    resetSession,
  };
}
