import { FC, memo, MemoExoticComponent, ReactNode } from "react";

interface CharSpanProps {
  char: string;
  isActive: boolean;
  isCorrect: boolean;
  isIncorrect: boolean;
  children?: ReactNode;
}

const CharSpan = memo(
  ({ char, isActive, isCorrect, isIncorrect, children }: CharSpanProps) => {
    let className = "";

    if (isCorrect) {
      className += " text-primary";
    } else if (isIncorrect) {
      className += " text-red-600";
    } else if (isActive) {
      className += " bg-card";
    }

    return (
      <span className={`relative ml-[0.1rem] ${className}`}>
        {children}
        {char}
      </span>
    );
  },
);

export default CharSpan;
