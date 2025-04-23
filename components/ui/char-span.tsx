import { ReactNode } from "react";
import { spans } from "next/dist/build/webpack/plugins/profiling-plugin";

interface CharSpanProps {
  char: string;
  isActive: boolean;
  isCorrect: boolean;
  isIncorrect: boolean;
  children?: ReactNode;
}

export default function CharSpan({
  char,
  isActive,
  isCorrect,
  isIncorrect,
  children,
}: CharSpanProps) {
  let className = "relative ml-[0.1rem]";

  if (isCorrect) {
    className += "text-green-600";
  } else if (isIncorrect) {
    className += "text-red-600";
  }

  return (
    <span className={className}>
      {char}
      {children}
    </span>
  );
}
