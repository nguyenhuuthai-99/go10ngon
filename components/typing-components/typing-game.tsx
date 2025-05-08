import { TypingMode, WordCountQuantity } from "@/model/typing-mode";
import { Timer } from "@/components/ui/timer";
import { WordCounter } from "@/components/ui/word-counter";
import { TypingPanel } from "@/components/ui/typing-panel";
import { TypingGameMode } from "@/lib/redux/slice/typing-session-slice";
import { TimedMode } from "@/model/timed-mode";
import { WordCountMode } from "@/model/word-count-mode";
import SizeBox from "@/components/ui/size-box";
import { useAppSelector } from "@/hooks/redux-hook";
import TypingModeBox from "@/components/ui/typing-mode-box";

interface TypingGameProps {
  typingGameMode: TypingGameMode;
  remainingTime?: number;
}
export function TypingGame({ typingGameMode, remainingTime }: TypingGameProps) {
  const isStarted = useAppSelector(
    (state) => state.typingSessionState.isStarted,
  );

  function renderModeComponent() {
    if (typingGameMode.currentTypingMode === TypingMode.timed) {
      return <Timer remainingTime={remainingTime!} />;
    }

    if (typingGameMode.currentTypingMode === TypingMode.wordCount) {
      return (
        <WordCounter
          count={(typingGameMode.modeContext as WordCountMode).count}
        />
      );
    }

    return null;
  }

  return (
    <div className="flex h-full flex-col">
      <TypingModeBox />
      <div
        className={`relative bottom-0 flex w-full flex-1 flex-col items-center justify-end gap-3`}
      >
        {isStarted && renderModeComponent()}
        <TypingPanel />
      </div>
      <div className={"flex-1"}></div>
    </div>
  );
}
