import { useEffect, useState } from "react";

export interface TypingSessionState {
  isTyping: boolean;
  isEnded: boolean;
  isAFK: boolean;
}

export interface TypingSessionStateHandler {
  typingSessionState: TypingSessionState;
  startTyping: () => void;
  markAsEnd: () => void;
  setAFK: () => void;
  resetTypingSessionState: () => void;
}

// interface Props {
//   words: string[];
//   currentCharIndex: number;
//   currentWordIndex: number;
// }
export default function useTypingSessionState() {
  const [isTyping, setIsTyping] = useState(false);
  const [isAFK, setIsAFK] = useState<boolean>(false);
  const [isEnded, setIsEnded] = useState(false);

  function resetTypingSessionState() {
    setIsTyping(false);
    setIsEnded(true);
  }

  function setAFK() {
    setIsAFK(true);
  }

  function startTyping() {
    setIsTyping(true);
  }

  function markAsEnd() {
    setIsEnded(true);
  }

  return {
    typingSessionState: {
      isTyping,
      isEnded,
      isAFK,
    },
    markAsEnd,
    startTyping,
    setAFK,
    resetTypingSessionState,
  };
}
