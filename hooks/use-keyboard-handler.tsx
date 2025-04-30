import { useRef } from "react";
import { TypingSessionStateHandler } from "@/hooks/use-typing-session-state";

interface Props {
  typingSessionStateHandler: TypingSessionStateHandler;
  typingSession: {
    moveToNextWord: () => void;
    moveToPreviousChar: (restoreInputValue: (value: string) => void) => void;
    moveCharToIndex: (index: number) => void;
    updateTypedWords: (value: string) => void;
  };
}
export function useKeyboardHandler({
  typingSessionStateHandler: {
    typingSessionState: { isTyping, isEnded },
    startTyping,
  },
  typingSession: {
    moveToNextWord,
    moveToPreviousChar,
    moveCharToIndex,
    updateTypedWords,
  },
}: Props) {
  const keydownTimestamp = useRef(0);
  const currentValue = useRef("");

  function onKeyDown(
    key: string,
    value: string,
    timestamp: number,
    restoreInputValue: (value: string) => void,
  ) {
    if (isEnded) return;

    if (!isTyping) {
      startTyping();
    }
    if (key === " ") {
      onSpacePress();
      return;
    }
    keydownTimestamp.current = timestamp;
    currentValue.current = value;

    if (key === "Backspace" || key === "Delete") {
      moveToPreviousChar(restoreInputValue);
    } else {
      moveCharToIndex(value.length);
    }

    updateTypedWords(value);
  }

  function onSpacePress() {
    moveToNextWord();
  }

  return {
    onKeyDown,
    timestamp: keydownTimestamp.current,
    currentValue: currentValue.current,
  };
}
