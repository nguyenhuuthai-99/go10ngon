import { Caret } from "@/hooks/use-caret-position";
import { Ref, RefObject, useEffect, useLayoutEffect } from "react";

interface Props {
  caret: Caret;
  typingAreaRef: RefObject<HTMLDivElement | null>;
}
export function useAutoScroll({ caret, typingAreaRef }: Props) {
  useLayoutEffect(() => {
    if (!typingAreaRef.current) return;

    const typingArea = typingAreaRef.current;
    const caretTop = caret.top;
    const caretHeight = caret.height;

    const visibleHeight = typingArea.clientHeight;

    const caretMid = caretTop + caretHeight / 2;

    const idealScroll = caretMid - visibleHeight / 2;

    typingArea.scrollTo({
      top: idealScroll,
      behavior: "smooth",
    });
  }, [caret]);
}
