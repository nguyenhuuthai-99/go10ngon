import { useEffect, useState } from "react";

interface State {
  words: string[];
  currentCharIndex: number;
  currentWordIndex: number;
}
export default function useTypingSessionState({
  words,
  currentWordIndex,
  currentCharIndex,
}: State) {
  const [isTyping, setIsTyping] = useState(false);
  const [isAFK, setIsAFK] = useState<boolean>(false);
  const [isStarted, setIsStarted] = useState(false);
  const [isEnded, setIsEnded] = useState(false);

  //trigger endgame
  useEffect(() => {
    if (isSessionEnd()) {
      resetTypingSessionState();
    }
  }, [currentWordIndex, currentCharIndex]);

  function isSessionEnd() {
    return (
      currentWordIndex >= words.length ||
      (currentCharIndex === words[-1]?.length - 1 &&
        currentWordIndex === words.length - 1)
    );
  }
  function resetTypingSessionState() {
    setIsTyping(false);
    setIsEnded(true);
  }

  return {
    isTyping,
    isEnded,
    setIsEnded,
    setIsTyping,
    resetTypingSessionState,
  };
}
