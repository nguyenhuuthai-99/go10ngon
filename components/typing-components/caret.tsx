type Props = {
  visible: boolean;
  isTyping?: boolean;
  top: number;
  left: number;
  width: number;
  height: number;
};
export function Caret({
  visible = false,
  isTyping,
  top,
  left,
  width,
  height,
}: Props) {
  return (
    <div
      style={{
        width: `0.18rem`,
        height: `${height}px`,
        top: top,
        left: left - 3,
        transition: "all 0.1s linear",
      }}
      className={`${!isTyping && "animate-caret-blink"} ${visible ? "visible" : "invisible"} absolute rounded-3xl bg-blue-500`}
    ></div>
  );
}

// h-7 w-[0.16rem]
