"use client";
import { TypingGame } from "@/components/typing-components/typing-game";
import { TypingResult } from "@/components/typing-components/typing-result";

import { useTypingMain } from "@/hooks/use-typing-main";
import { useEffect } from "react";
import { useAppSelector } from "@/hooks/redux-hook";
import { Theme } from "@/lib/redux/slice/user-settings-slice";
import { useTheme } from "next-themes";
import { useUserSettings } from "@/hooks/use-user-settings";

export function TypingMain({ className }: { className?: string }) {
  const { typingSessionState, remainingTime } = useTypingMain({});
  const theme = useAppSelector((state) => state.userSettings.appearance.theme);
  const { setTheme } = useTheme();
  useUserSettings();

  useEffect(() => {
    if (theme === Theme.auto) {
      const currentTime = new Date().getHours();
      if (currentTime >= 18 || currentTime <= 6) {
        setTheme("dark");
      } else {
        setTheme("light");
      }
    } else {
      setTheme(theme);
    }
  }, [theme]);

  //todo get user mode and dispatch it
  function getTimedModeWords() {}

  function getWordsModeWords() {}

  function getQuotesModeWords() {}

  return (
    <div
      className={`flex h-full max-h-screen w-full max-w-[90%] flex-col items-center justify-between overflow-y-auto select-none md:max-w-[80%] lg:max-w-[70%] ${className} `}
    >
      {!typingSessionState.isEnded ? (
        typingSessionState.isSessionReady ? (
          <TypingGame
            typingGameMode={typingSessionState.typingGameMode}
            remainingTime={remainingTime}
          />
        ) : (
          <div className="grid h-full items-center">Loading...</div>
        )
      ) : (
        <TypingResult />
      )}
    </div>
  );
}
