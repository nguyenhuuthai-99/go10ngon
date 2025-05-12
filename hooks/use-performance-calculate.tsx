import { useEffect, useRef } from "react";
import { hasParent, isParent } from "@/lib/utils";
import { Parent } from "@/model/parent";
import { useAppSelector } from "@/hooks/redux-hook";

interface Props {
  targetValue: string;
  currentWordIndex: number;
}
export default function usePerformanceCalculate({
  targetValue,
  currentWordIndex,
}: Props) {
  const parentList = useRef<(Parent | null)[]>([]);
  const validParent = useRef<Map<number, number>>(new Map());
  const typedWords = useAppSelector(
    (state) => state.typingSessionState.typedWords,
  );

  useEffect(() => {
    parentList.current = [];
    validParent.current.clear();

    for (let i = 0; i < targetValue.length; i++) {
      if (hasParent(targetValue[i])) {
        let depth = 0;
        let found = false;
        const currentTypedWord = typedWords[currentWordIndex][i];
        if (currentTypedWord !== undefined) {
          [found, depth] = isParent(targetValue[i], currentTypedWord);
        } else {
          [found, depth] = isParent(targetValue[i], "");
        }
        let parent: Parent;
        if (found) {
          parent = { index: i, value: currentTypedWord, depth: depth };
        } else {
          parent = { index: i, value: "", depth: depth };
        }
        validParent.current.set(i, depth);
        parentList.current.push(parent);
      } else {
        parentList.current.push(null);
      }
    }
  }, [currentWordIndex]);

  function isCorrectAndWithin(value: string, previousWord: string): boolean {
    if (value.length > targetValue.length) return false;

    if (value.length === previousWord.length) {
      return checkForParent(value);
    } else {
      const index = value.length - 1;
      if (validParent.current.has(index)) {
        return checkForParent(value);
      }
      return value[index] === targetValue[index];
    }
  }
  function checkForParent(value: string): boolean {
    let found = false;
    for (let i = 0; i < value.length; i++) {
      const currentChar = value[i];
      if (validParent.current.has(i)) {
        if (parentList.current[i]?.value !== currentChar) {
          let newDepth = 0;
          [found, newDepth] = isParent(targetValue[i], currentChar);
          if (found) {
            parentList.current[i]!.depth = newDepth;
          }
          parentList.current[i]!.value = currentChar;
        }
      }
    }
    return found;
  }

  function onDelete(value: string) {
    if (value.length > targetValue.length - 1) return;

    const previousIndex = value.length;

    if (validParent.current.has(previousIndex)) {
      parentList.current[previousIndex]!.depth =
        validParent.current.get(previousIndex)! + 1;
      parentList.current[previousIndex]!.value = "";
    }
  }

  function checkMissingChar(value: string): number {
    console.log(parentList.current);
    let count = 0;

    for (let i = 0; i < parentList.current.length; i++) {
      if (parentList.current[i]) count += parentList.current[i]?.depth!;
    }

    const length = value.length;
    for (let i = length; i < targetValue.length; i++) {
      if (!validParent.current.has(i)) {
        count++;
      }
    }
    return count;
  }

  return { isCorrectAndWithin, onDelete, checkMissingChar };
}
