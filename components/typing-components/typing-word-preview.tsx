import { useAppSelector } from "@/hooks/redux-hook";

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
  const showTypingPreview = useAppSelector(
    (state) => state.userSettings.appearance.showTypingPreview,
  );

  return (
    showTypingPreview && (
      <div
        style={{
          top: top + height,
          left: left,
          minWidth: width,
          height: height - 20,
          transition: "all 0.1s ease-in-out",
        }}
        className={`${isTyping ? "visible" : "invisible"} bg-card border-border dark:shadow-border absolute z-10 flex-col justify-center rounded-sm border-1 text-xl leading-7 tracking-[.1rem] text-nowrap shadow-md shadow-gray-400/50 dark:shadow-black/50`}
      >
        <span className={"text-foreground ml-2"}>{typedWord}</span>
      </div>
    )
  );
};
