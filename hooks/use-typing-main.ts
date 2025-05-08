import { useAppDispatch, useAppSelector } from "@/hooks/redux-hook";
import { useEffect } from "react";
// import {
//   setTypedWords,
//   setWords,
// } from "@/lib/feature/slice/typing-session-store-slice";
import {
  fetchTypingGameThunk,
  markAsEnd,
  setReady,
  setTimedModeText,
  setTypedWords,
} from "@/lib/redux/slice/typing-session-slice";
import { stringToList } from "@/lib/utils";
import {
  getQuoteTest,
  getTimedTest,
  getWordsCountTest,
} from "@/lib/infrastructure/api/services/app-service";
import { useCountdownTimer } from "@/hooks/use-countdown-timer";
import {
  TimedModeDuration,
  TypingMode,
  WordCountQuantity,
} from "@/model/typing-mode";

interface Props {
  duration?: number;
  count?: number;
}
export function useTypingMain({
  duration = TimedModeDuration.short,
  count = WordCountQuantity.medium,
}: Props) {
  const words = useAppSelector(
    (state) => state.typingSessionState.typingGameMode.modeContext.text,
  );
  const typingSessionState = useAppSelector(
    (state) => state.typingSessionState,
  );

  const currentTypingMode = useAppSelector(
    (state) => state.typingSessionState.typingGameMode.currentTypingMode,
  );

  //timer
  const { remainingTime, startTimer } = useCountdownTimer({
    onTimeUp: () => {
      dispatch(markAsEnd());
    },
  });

  const dispatch = useAppDispatch();

  //trigger start game
  useEffect(() => {
    if (typingSessionState.isStarted) {
      if (
        typingSessionState.typingGameMode.currentTypingMode === TypingMode.timed
      ) {
        startTimer();
      }
    }
  }, [typingSessionState.isStarted]);

  //initialize typedWords
  useEffect(() => {
    if (
      Object.keys(typingSessionState.typedWords).length > 0 ||
      Object.keys(words).length === 0
    )
      return;

    const initialTypedWords: { [key: number]: string } = {};
    words.forEach((value, index) => {
      initialTypedWords[index] = "";
    });
    dispatch(setTypedWords(initialTypedWords));
    dispatch(setReady(true));
  }, [words, typingSessionState.typedWords]);

  useEffect(() => {
    dispatch(setReady(false));

    dispatch(fetchTypingGameThunk());
  }, [currentTypingMode]);

  return { words, typingSessionState, remainingTime };
}
