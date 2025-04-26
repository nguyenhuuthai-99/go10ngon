"use client";
import { Citation } from "@/components/ui/citation";
import { useEffect, useRef, useState } from "react";
import { TypingArea } from "@/components/typing-components/typing-area";
import InputField from "@/components/typing-components/input-field";

type Props = {
  text: string;
  reference?: string;
};

export function TypingPanel({ text, reference }: Props) {
  const [isStarted, setIsStarted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="relative">
      <TypingArea text={text} />
      <Citation visible={!isStarted} reference={reference} />
    </div>
  );
}
