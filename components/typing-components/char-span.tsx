import { FC, memo, MemoExoticComponent, ReactNode, Ref } from "react";

interface CharSpanProps {
  char: string;
  isActive: boolean;
  isCorrect: boolean;
  isIncorrect: boolean;
  children?: ReactNode;
  ref: Ref<HTMLSpanElement>;
}

const CharSpan = memo(
  ({
    char,
    isActive,
    isCorrect,
    isIncorrect,
    children,
    ref,
  }: CharSpanProps) => {
    let className = "";

    if (isCorrect) {
      className += " text-primary";
    } else if (isIncorrect) {
      className += " text-red-500";
    } else if (isActive) {
      className += "";
    }

    return (
      <span
        ref={ref}
        className={`relative ml-[0.1rem] whitespace-pre ${className}`}
      >
        {children}
        {char}
      </span>
    );
  },
);

export default CharSpan;
