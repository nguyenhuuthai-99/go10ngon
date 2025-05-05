"use client";
import { Citation } from "@/components/ui/citation";
import { useEffect, useRef, useState } from "react";
import { TypingArea } from "@/components/typing-components/typing-area";
import InputField from "@/components/typing-components/input-field";
import { useAppSelector } from "@/hooks/redux-hook";
import { RealTimePerformance } from "@/components/typing-components/real-time-performance";

export function TypingPanel() {
  const inputRef = useRef<HTMLInputElement>(null);
  const isStarted = useAppSelector(
    (state) => state.typingSessionState.isStarted,
  );

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="relative">
      <TypingArea />
      {isStarted ? <RealTimePerformance /> : null}
    </div>
  );
}
