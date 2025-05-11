import { TypingMode, WordCountQuantity } from "@/model/typing-mode";
import { Timer } from "@/components/ui/timer";
import { WordCounter } from "@/components/typing-components/word-counter";
import { TypingPanel } from "@/components/ui/typing-panel";
import { TypingGameMode } from "@/lib/redux/slice/typing-session-slice";
import SizeBox from "@/components/ui/size-box";
import { useAppSelector } from "@/hooks/redux-hook";
import TypingModeBox from "@/components/typing-components/typing-mode-box";
import { ModeIndicator } from "@/components/typing-components/mode-indicator";
import { Button } from "@/components/ui/button";
import { BsArrowClockwise, BsArrowRight } from "react-icons/bs";
import { useTypingSessionActions } from "@/hooks/use-typing-session-actions";

interface TypingGameProps {
  typingGameMode: TypingGameMode;
  remainingTime?: number;
}
export function TypingGame({ typingGameMode, remainingTime }: TypingGameProps) {
  const isStarted = useAppSelector(
    (state) => state.typingSessionState.isStarted,
  );

  const isTyping = useAppSelector((state) => state.typingSessionState.isTyping);
  const { restartSession, refreshSession } = useTypingSessionActions();

  function renderModeComponent() {
    if (typingGameMode.currentTypingMode === TypingMode.timed) {
      return <Timer remainingTime={remainingTime!} />;
    } else {
      return <WordCounter />;
    }
  }

  return (
    <div className="flex h-full flex-col">
      <TypingModeBox />
      <ModeIndicator />
      <div
        className={`relative bottom-0 flex w-full flex-1 flex-col items-center justify-end gap-3`}
      >
        {isStarted && renderModeComponent()}
        <TypingPanel />
      </div>
      <div className={"flex-1"}>
        {!isTyping && isStarted && (
          <div
            className={
              "flex w-full flex-wrap items-center justify-center text-center text-xs"
            }
          >
            <Button
              className={
                "text-foreground bg-card mb-1 cursor-pointer hover:text-white"
              }
              onClick={refreshSession}
            >
              làm mới <BsArrowRight />
            </Button>

            <SizeBox width={80} />
            <Button
              onClick={restartSession}
              className={
                "text-foreground bg-card mb-1 cursor-pointer hover:text-white"
              }
            >
              thử lại <BsArrowClockwise />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
