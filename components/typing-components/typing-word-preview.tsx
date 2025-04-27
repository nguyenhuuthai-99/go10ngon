type Props = {
  top: number;
  left: number;
  width: number;
  height: number;
  typedWord: string | null;
};
export const TypingWordPreview = ({
  typedWord,
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
        height: height - 24,
        transition: "all 0.1s ease-in-out",
      }}
      className={
        "absolute z-10 flex-col justify-center rounded-lg bg-gray-300 text-xl leading-7 tracking-[.1rem] text-nowrap shadow-md"
      }
    >
      <span className={"ml-1"}>{typedWord}</span>
    </div>
  );
};
