import { Dispatch, SetStateAction } from "react";

interface Props {
  words: string[];
  currentCharIndex: number;
  currentWordIndex: number;
}
export function useKeyboardHandler({
  words,
  currentWordIndex,
  currentCharIndex,
}: Props) {
  function onKeyDown(
    key: string,
    value: string,
    setInputValue: Dispatch<SetStateAction<string>>,
  ) {}
}
