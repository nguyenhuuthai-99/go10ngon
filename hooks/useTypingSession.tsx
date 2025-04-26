import { useState } from "react";

export function useTypingSession(words: string[]) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [typedWords, setTypedWords] = useState<{ [key: number]: string }>({});
  const [extraChars, setExtraChars] = useState<{ [key: number]: string }>({});
  const [currentTypedWord, setCurrentTypedWord] = useState("");

  function updateTypedWords(value: string) {
    setTypedWords((prev) => ({ ...prev, [currentWordIndex]: value }));
  }

  function handleExtraCharsChange(value: string) {
    const extras = value.slice(words[currentWordIndex].length);
    setExtraChars((prev) => ({ ...prev, [currentWordIndex]: extras }));
  }

  function resetSession() {
    setCurrentWordIndex(0);
    setCurrentCharIndex(0);
    setTypedWords({});
    setExtraChars({});
    setCurrentTypedWord("");
  }

  return {
    currentWordIndex,
    currentCharIndex,
    typedWords,
    extraChars,
    currentTypedWord,
    setCurrentWordIndex,
    setCurrentCharIndex,
    setTypedWords,
    setExtraChars,
    setCurrentTypedWord,
    updateTypedWords,
    handleExtraCharsChange,
    resetSession,
  };
}
