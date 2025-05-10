import { useState, RefObject, useLayoutEffect } from "react";

const initialState = {
  top: 7,
  left: 0,
  width: 2,
  height: 7,
};

export interface Caret {
  top: number;
  left: number;
  width: number;
  height: number;
}
export function useCaretPosition(
  activeCharRef: RefObject<HTMLSpanElement | null>,
  activeSpaceRef: RefObject<HTMLSpanElement | null>,
  deps: any[] = [],
) {
  const [caret, setCaret] = useState<Caret>(initialState);

  useLayoutEffect(() => {
    let offsetTop = 0,
      offsetLeft = 0,
      width = 0,
      height = 0;

    const element = activeCharRef?.current;
    const space = activeSpaceRef?.current;

    if (space) {
      offsetTop = space.offsetTop;
      offsetLeft = space.offsetLeft;
      height = space.offsetHeight;
      width = space.offsetWidth;
    } else if (element) {
      offsetTop = element.offsetTop;
      offsetLeft = element.offsetLeft;
      width = element.offsetWidth;
      height = element.offsetHeight;
    }

    setCaret({ top: offsetTop, left: offsetLeft, width, height });
  }, deps);

  function resetCaretPosition() {
    setCaret(initialState);
  }

  return { caret, resetCaretPosition };
}
