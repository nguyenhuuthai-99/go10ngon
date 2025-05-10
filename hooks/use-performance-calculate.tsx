import { useEffect, useRef } from "react";
import { hasParent, isParent } from "@/lib/utils";
import { Parent } from "@/model/parent";

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

  useEffect(() => {
    parentList.current = [];
    validParent.current.clear();

    for (let i = 0; i < targetValue.length; i++) {
      if (hasParent(targetValue[i])) {
        const [_, depth] = isParent(targetValue[i], "i");
        const parent: Parent = { index: i, value: "", depth: depth + 1 };
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
          [found] = isParent(targetValue[i], currentChar);
          if (parentList.current[i]!.depth > 0) {
            parentList.current[i]!.depth -= 1;
          }
          parentList.current[i]!.value = currentChar;
          if (!validParent.current.has(i + 1)) {
            break;
          }
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
    if (value.length > targetValue.length) return 0;
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
