import { RefObject, useCallback, useEffect } from "react";

export function useScrollToCaret(
  caret: { top: number; height: number },
  typingAreaRef: RefObject<HTMLDivElement>,
) {
  const scrollToCaret = useCallback(() => {
    if (!typingAreaRef.current) return;

    const area = typingAreaRef.current;
    const caretMid = caret.top + caret.height / 2;
    const idealScroll = caretMid - area.clientHeight / 2;

    area.scrollTo({ top: idealScroll, behavior: "smooth" });
  }, [caret]);

  useEffect(() => {
    scrollToCaret();
  }, [scrollToCaret]);
}
