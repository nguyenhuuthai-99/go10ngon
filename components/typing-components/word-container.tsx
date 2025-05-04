import { memo, ReactNode, Ref } from "react";
import { TypingWordPreview } from "@/components/typing-components/typing-word-preview";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hook";

type Props = {
  isActive: boolean;
  children?: ReactNode;
  isIncorrect: boolean;
  ref: Ref<HTMLDivElement>;
};

export const WordContainer = ({
  isActive = false,
  isIncorrect,
  children,
  ref,
}: Props) => {
  return (
    <div
      className={`${isIncorrect && "h-11 border-b-2 border-red-500"}`}
      ref={ref}
    >
      {children}
    </div>
  );
};
