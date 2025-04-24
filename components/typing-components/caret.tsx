type Props = {
  visible: boolean;
  isLeft?: boolean;
  isTyping?: boolean;
  // position: [number, number];
};
export function Caret({
  visible = false,
  isLeft = false,
  isTyping = true,
}: Props) {
  return (
    <div
      className={`${isTyping && "animate-caret-blink"} ${visible ? "visible" : "invisible"} absolute top-0 ${isLeft ? "left-[-0.1rem]" : "right-[-.1rem]"} h-7 w-[0.2rem] rounded-3xl bg-blue-900`}
    ></div>
  );
}
