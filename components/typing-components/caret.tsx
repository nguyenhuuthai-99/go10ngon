import { use, useEffect, useRef, useState } from "react";
import { useAppSelector } from "@/hooks/redux-hook";
import { CaretShape } from "@/slice/user-settings-slice";

type Props = {
  visible: boolean;
  isTyping?: boolean;
  top: number;
  left: number;
  width: number;
  height: number;
};

const LINE_WIDTH = "0.18rem";
export function Caret({
  visible = false,
  isTyping,
  top,
  left,
  width,
  height,
}: Props) {
  const { speed, shape, size } = useAppSelector(
    (state) => state.userSettings.caret,
  );
  const [caretWidth, setCaretWidth] = useState<string>("");
  const [className, setClassname] = useState<string>("");
  useEffect(() => {
    if (shape === CaretShape.line) {
      setCaretWidth(size);
      setClassname(" bg-primary rounded-3xl");
    } else if (shape === CaretShape.box) {
      setCaretWidth(`${width + 6}px`);
      setClassname(` border-primary border-2`);
    } else {
      setCaretWidth(`${width + 6}px`);
      setClassname(` border-b-4 border-primary leading-10`);
    }
  }, [shape, width]);

  return (
    <div
      style={{
        width: `${caretWidth}`,
        height: `${height}px`,
        top: top,
        left: left - 3,
        transition: `all ${speed}s linear`,
      }}
      className={`${!isTyping && "animate-caret-blink"} ${visible ? "visible" : "invisible"} absolute ${className}`}
    ></div>
  );
}
