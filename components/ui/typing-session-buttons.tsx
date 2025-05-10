import { Button } from "@/components/ui/button";
import { BsArrowClockwise, BsArrowRight } from "react-icons/bs";
import SizeBox from "@/components/ui/size-box";
import { useTypingSessionActions } from "@/hooks/use-typing-session-actions";

export function TypingSessionButtons() {
  const { refreshSession, restartSession } = useTypingSessionActions();

  return (
    <div className={"flex flex-wrap items-center justify-center gap-x-10"}>
      <Button
        className={"text-foreground bg-card cursor-pointer hover:text-white"}
        onClick={restartSession}
      >
        thử lại <BsArrowClockwise />
      </Button>
      <Button
        onClick={refreshSession}
        className={"text-foreground bg-card cursor-pointer hover:text-white"}
      >
        tiếp tục <BsArrowRight />
      </Button>
    </div>
  );
}
