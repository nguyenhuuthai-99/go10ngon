import { useAppSelector } from "@/hooks/redux-hook";

export function WordCounter() {
  const words = useAppSelector(
    (state) => state.typingSessionState.typingGameMode.modeContext.text,
  );

  const currentWord = useAppSelector(
    (state) => state.typingSessionState.currentWordIndex,
  );

  return (
    <div className={`text-primary text-center text-2xl`}>
      {currentWord}/{words.length}
    </div>
  );
}
