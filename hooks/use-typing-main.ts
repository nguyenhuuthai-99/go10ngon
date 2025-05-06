import { useAppDispatch, useAppSelector } from "@/hooks/redux-hook";
import { useEffect } from "react";
// import {
//   setTypedWords,
//   setWords,
// } from "@/lib/feature/slice/typing-session-store-slice";
import {
  markAsEnd,
  setReady,
  setTimedModeText,
  setTypedWords,
} from "@/lib/feature/slice/typing-session-slice";
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
  duration = TimedModeDuration.medium,
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

  const dispatch = useAppDispatch();

  const { remainingTime, resetTimer, startTimer } = useCountdownTimer({
    duration: TimedModeDuration.short,
    onTimerEnd: () => {
      dispatch(markAsEnd());

      //todo check timer
    },
  });

  //initialize typedWords
  useEffect(() => {
    const initialTypedWords: { [key: number]: string } = {};
    words.forEach((value, index) => {
      initialTypedWords[index] = "";
    });
    dispatch(setTypedWords(initialTypedWords));
    dispatch(setReady(true));
  }, [words]);

  useEffect(() => {
    dispatch(setReady(false));

    let fetchedText: string[];
    switch (currentTypingMode) {
      case TypingMode.timed:
        fetchedText = getTimedTest(duration);
        dispatch(setTimedModeText(fetchedText));
        break;
      case TypingMode.wordCount:
        fetchedText = getWordsCountTest(count);
        break;
      case TypingMode.quote:
      default:
        fetchedText = getQuoteTest();
        break;
    }

    // dispatch(setWords(fetchedText));
  }, [currentTypingMode]);

  return { words, typingSessionState };
}
