import { useEffect, useState } from "react";

export interface TypingSessionState {
  isStarted: boolean;
  isEnded: boolean;
  isAFK: boolean;
}

export interface TypingSessionStateHandler {
  typingSessionState: TypingSessionState;
  markAsStart: () => void;
  markAsEnd: () => void;
  setAFK: () => void;
  resetTypingSessionState: () => void;
}

export const defaultTypingSessionState: TypingSessionStateHandler = {
  typingSessionState: {
    isStarted: false,
    isEnded: false,
    isAFK: false,
  },
  markAsStart: () => {},
  markAsEnd: () => {},
  setAFK: () => {},
  resetTypingSessionState: () => {},
};

export default function useTypingSessionState() {
  const [isStarted, setIsStarted] = useState(false);
  const [isAFK, setIsAFK] = useState<boolean>(false);
  const [isEnded, setIsEnded] = useState(false);

  function resetTypingSessionState() {
    setIsStarted(false);
    setIsEnded(false);
  }

  function setAFK() {
    setIsAFK(true);
  }

  function markAsStart() {
    setIsStarted(true);
    if (isEnded) {
      setIsEnded(false);
    }
  }

  function markAsEnd() {
    setIsEnded(true);
  }

  return {
    typingSessionState: {
      isStarted,
      isEnded,
      isAFK,
    },
    markAsEnd,
    markAsStart,
    startTyping: markAsStart,
    setAFK,
    resetTypingSessionState,
  };
}
