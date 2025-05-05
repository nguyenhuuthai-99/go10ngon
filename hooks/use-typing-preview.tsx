import { RefObject, useEffect, useState } from "react";
import { useAppSelector } from "@/hooks/redux-hook";

interface TypingPreview {
  top: number;
  left: number;
  width: number;
  height: number;
  typedWord: string | null;
}

const initialState = {
  top: 0,
  left: 0,
  width: 0,
  height: 0,
  typedWord: "null",
};

interface TypingPreviewProps {
  activeWordRef: RefObject<HTMLDivElement | null>;
  currentWordIndex: number;
  currentCharIndex: number;
}
export function useTypingPreview({
  activeWordRef,
  currentWordIndex,
  currentCharIndex,
}: TypingPreviewProps) {
  const [typingPreview, setTypingPreview] =
    useState<TypingPreview>(initialState);
  const typedWords = useAppSelector(
    (state) => state.typingSessionStore.typedWords,
  );

  //handle typing preview
  useEffect(() => {
    const activeWord = activeWordRef.current;

    if (activeWord) {
      const newPreview = {
        top: activeWord.offsetTop,
        left: activeWord.offsetLeft,
        width: activeWord.offsetWidth,
        height: activeWord.offsetHeight,
        typedWord: typedWords[currentWordIndex] || null,
      };
      setTypingPreview(newPreview);
    }
  }, [currentWordIndex, typedWords, currentCharIndex]);

  return typingPreview;
}
