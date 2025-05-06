import { useAppDispatch, useAppSelector } from "@/hooks/redux-hook";
import { useEffect } from "react";

export function useTypingSessionState() {
  const typingSessionState = useAppSelector(
    (state) => state.typingSessionState,
  );
  const dispatch = useAppDispatch();

  //start Game
  useEffect(() => {}, [typingSessionState.isStarted]);

  //end Game
  useEffect(() => {}, [typingSessionState.isEnded]);

  function resetTypingSessionState() {}
}
