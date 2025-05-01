type Props = {
  isTyping?: boolean;
  top: number;
  left: number;
  width: number;
  height: number;
  typedWord: string | null;
};
export const TypingWordPreview = ({
  typedWord,
  isTyping = false,
  top,
  left,
  height,
  width,
}: Props) => {
  return (
    <div
      style={{
        top: top + height - 6,
        left: left,
        minWidth: width,
        height: height - 20,
        transition: "all 0.1s ease-in-out",
      }}
      className={`${isTyping ? "visible" : "invisible"} bg-card border-border dark:shadow-border absolute z-10 flex-col justify-center rounded-sm border-1 text-xl leading-7 tracking-[.1rem] text-nowrap shadow-lg shadow-gray-300 dark:shadow-neutral-700`}
    >
      <span className={"text-foreground ml-2"}>{typedWord}</span>
    </div>
  );
};
