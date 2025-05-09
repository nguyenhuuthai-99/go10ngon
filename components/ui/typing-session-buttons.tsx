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

export function TypingSessionButtons() {
  const dispatch = useAppDispatch();

  function onRestartClick() {
    resetSession();
    dispatch(resetTypingSessionState());
  }

  function onContinueClick() {
    resetSession();
    dispatch(resetTypingSessionStateAndWords());
    dispatch(fetchTypingGameThunk());
  }

  function resetSession() {
    dispatch(resetTypingStatsState());
    dispatch(resetPerformance());
  }

  return (
    <div className={"flex flex-wrap items-center justify-center"}>
      <Button
        className={"text-foreground bg-card cursor-pointer hover:text-white"}
        onClick={onRestartClick}
      >
        thử lại <BsArrowClockwise />
      </Button>
      <SizeBox width={40} />
      <Button
        onClick={onContinueClick}
        className={"text-foreground bg-card cursor-pointer hover:text-white"}
      >
        tiếp tục <BsArrowRight />
      </Button>
    </div>
  );
}
