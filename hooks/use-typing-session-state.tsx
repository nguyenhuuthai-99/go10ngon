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

export const defaultTypingSessionState: TypingSessionStateHandler = {
  typingSessionState: {
    isTyping: false,
    isEnded: true,
    isAFK: false,
  },
  startTyping: () => {},
  markAsEnd: () => {},
  setAFK: () => {},
  resetTypingSessionState: () => {},
};

export default function useTypingSessionState() {
  const [isTyping, setIsTyping] = useState(false);
  const [isStart, setIsStart] = useState(false);
  const [isAFK, setIsAFK] = useState<boolean>(false);
  const [isEnded, setIsEnded] = useState(true);

  function resetTypingSessionState() {
    setIsTyping(false);
    setIsEnded(true);
  }

  function setAFK() {
    setIsAFK(true);
  }

  function startTyping() {
    setIsTyping(true);
    if (isEnded) {
      setIsEnded(false);
    }
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
