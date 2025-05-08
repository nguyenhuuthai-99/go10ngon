import {
  TimedModeDuration,
  TypingMode,
  WordCountQuantity,
} from "@/model/typing-mode";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hook";
import {
  fetchTypingGameThunk,
  setTimedContext,
} from "@/lib/redux/slice/typing-session-slice";
import { TimedMode } from "@/model/timed-mode";

export function useTypingMode() {
  const mode = useAppSelector(
    (state) => state.typingSessionState.typingGameMode,
  );
  const dispatch = useAppDispatch();
  function updateMode(mode: TypingMode): void {}
  function updateLevel(level: number): void {
    if (mode.currentTypingMode === TypingMode.timed) {
      dispatch(
        setTimedContext({
          duration: level,
          text: mode.modeContext.text,
        } as TimedMode),
      );
      dispatch(fetchTypingGameThunk());
    } else {
    }
  }

  return { updateMode, updateLevel };
}
