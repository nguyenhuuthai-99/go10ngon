import { TypingMode, WordCountQuantity } from "@/model/typing-mode";
import { Timer } from "@/components/ui/timer";
import { WordCounter } from "@/components/ui/word-counter";
import { TypingPanel } from "@/components/ui/typing-panel";
import { TypingGameMode } from "@/lib/redux/slice/typing-session-slice";
import { TimedMode } from "@/model/timed-mode";
import { WordCountMode } from "@/model/word-count-mode";

interface TypingGameProps {
  typingGameMode: TypingGameMode;
  remainingTime?: number;
}
export function TypingGame({ typingGameMode, remainingTime }: TypingGameProps) {
  return (
    <div className={`flex w-full flex-col items-center gap-3`}>
      {typingGameMode.currentTypingMode === TypingMode.timed && (
        <Timer remainingTime={remainingTime!} />
      )}
      {typingGameMode.currentTypingMode === TypingMode.wordCount && (
        <WordCounter
          count={(typingGameMode.modeContext as WordCountMode).count}
        />
      )}

      <TypingPanel />
    </div>
  );
}
