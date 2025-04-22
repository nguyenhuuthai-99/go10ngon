"use client";
import { Citation } from "@/components/ui/citation";
import { useState } from "react";

type Props = {
  text: string;
  reference?: string;
};

export function TypingPanel({ text, reference }: Props) {
  const [isStarted, setIsStarted] = useState(false);

  return (
    <div className="relative">
      <div
        className="h-[150px] overflow-hidden text-2xl leading-10 text-clip text-gray-500">
        {text}
      </div>
      <Citation visible={!isStarted} reference={reference} />
    </div>
  );
}
