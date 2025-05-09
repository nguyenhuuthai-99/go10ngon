import {
  TimedModeDuration,
  TypingMode,
  WordCountQuantity,
} from "@/model/typing-mode";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hook";
import { TimedMode } from "@/model/timed-mode";
import { WordCountMode } from "@/model/word-count-mode";
import {
  changeTypingGameMode,
  fetchTypingGameThunk,
  setTimedModeDuration,
  setWordCount,
} from "@/lib/redux/slice/typing-session-slice";
import { useTypingSessionActions } from "@/hooks/use-typing-session-actions";

export function useTypingMode() {
  const [modeInfo, setModeInfo] = useState<{
    mode: TypingMode;
    duration: number;
    count: number;
  }>({
    mode: TypingMode.timed,
    duration: TimedModeDuration.medium,
    count: WordCountQuantity.medium,
  });

  const { updateModeAndLevel } = useTypingSessionActions();
  const duration = useAppSelector(
    (state) =>
      (state.typingSessionState.typingGameMode.modeContext as TimedMode)
        .duration,
  );
  const count = useAppSelector(
    (state) =>
      (state.typingSessionState.typingGameMode.modeContext as WordCountMode)
        .count,
  );
  const dispatch = useAppDispatch();
  const hasChange = useRef<boolean>(false);

  useEffect(() => {
    setModeInfo((prev) => ({ ...prev, duration, count }));
  }, []);

  useEffect(() => {
    hasChange.current = true;
  }, [modeInfo.mode]);
  function changeMode(newMode: TypingMode) {
    setModeInfo((prev) => ({ ...prev, mode: newMode }));
  }
  function changeLevel(newLevel: number, mode: TypingMode) {
    if (mode === TypingMode.timed) {
      setModeInfo((prev) => ({ ...prev, duration: newLevel }));
    } else if (mode === TypingMode.wordCount) {
      setModeInfo((prev) => ({ ...prev, count: newLevel }));
    }
  }

  function submitChange() {
    if (!hasChange.current) return;
    updateModeAndLevel(modeInfo);
    hasChange.current = false;
  }

  return { changeLevel, changeMode, submitChange, modeInfo };
}
