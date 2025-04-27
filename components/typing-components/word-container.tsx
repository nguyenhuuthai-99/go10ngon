import { memo, ReactNode, Ref } from "react";
import { TypingWordPreview } from "@/components/typing-components/typing-word-preview";

type Props = {
  isActive: boolean;
  children?: ReactNode;
  ref: Ref<HTMLDivElement>;
};

export const WordContainer = ({ isActive = false, children, ref }: Props) => {
  return <div ref={ref}>{children}</div>;
};
