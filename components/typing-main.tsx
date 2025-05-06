"use client";
import { TypingGame } from "@/components/typing-game";
import { TypingResult } from "@/components/typing-components/typing-result";

import { useTypingMain } from "@/hooks/use-typing-main";

export function TypingMain({ className }: { className?: string }) {
  const { words, typingSessionState } = useTypingMain({});

  //todo get user mode and dispatch it
  function getTimedModeWords() {}

  function getWordsModeWords() {}

  function getQuotesModeWords() {}

  return (
    <div
      className={`flex w-full max-w-[90%] flex-col items-center justify-center select-none md:max-w-[80%] lg:max-w-[70%] ${className}`}
    >
      {typingSessionState.isSessionReady ? (
        !typingSessionState.isEnded ? (
          <TypingGame typingGameMode={typingSessionState.typingGameMode} />
        ) : (
          <TypingResult />
        )
      ) : (
        <span>Loading...</span>
      )}
    </div>
  );
}
