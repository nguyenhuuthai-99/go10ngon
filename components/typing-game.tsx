import { TypingMode, WordCountQuantity } from "@/model/typing-mode";
import { Timer } from "@/components/ui/timer";
import { WordCounter } from "@/components/ui/word-counter";
import { TypingPanel } from "@/components/ui/typing-panel";

interface Props {
  className?: string;
  duration?: number;
  currentMode: TypingMode;
  count?: number;
  typingTest: TypingText;
}

export function TypingGame({
  className,
  duration,
  currentMode,
  count,
  typingTest,
}: Props) {
  return (
    <div className={`flex w-full flex-col items-center gap-3 ${className}`}>
      {currentMode === TypingMode.timed && <Timer remainingTime={duration!} />}
      <WordCounter count={count!} visible={currentMode === TypingMode.words} />
      <TypingPanel text={typingTest!.text} reference={typingTest.reference} />
    </div>
  );
}
