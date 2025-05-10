import {
  fetchTypingGameThunk,
  resetTypingSessionState,
  resetTypingSessionStateAndWords,
  setReady,
} from "@/lib/redux/slice/typing-session-slice";
import { resetTypingStatsState } from "@/lib/redux/slice/typing-session-stats-slice";
import { resetPerformance } from "@/lib/redux/slice/typing-session-performance-slice";
import { useAppDispatch } from "@/hooks/redux-hook";
import { Button } from "@/components/ui/button";
import { BsArrowClockwise, BsArrowRight } from "react-icons/bs";
import SizeBox from "@/components/ui/size-box";
import { useTypingSessionActions } from "@/hooks/use-typing-session-actions";

export function TypingSessionButtons() {
  const { refreshSession, restartSession } = useTypingSessionActions();

  return (
    <div className={"flex flex-wrap items-center justify-center"}>
      <Button
        className={"text-foreground bg-card cursor-pointer hover:text-white"}
        onClick={restartSession}
      >
        thử lại <BsArrowClockwise />
      </Button>
      <SizeBox width={40} />
      <Button
        onClick={refreshSession}
        className={"text-foreground bg-card cursor-pointer hover:text-white"}
      >
        tiếp tục <BsArrowRight />
      </Button>
    </div>
  );
}
