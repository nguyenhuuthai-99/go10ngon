import { useEffect, useRef } from "react";
import { hasParent, isParent } from "@/lib/utils";

interface Props {
  currentValue: string;
  targetValue: string;
  currentWordIndex: number;
}
export default function usePerformanceCalculate({
  currentValue,
  targetValue,
  currentWordIndex,
}: Props) {
  const parentMap = useRef<Map<number, [number, string]>>(new Map());

  useEffect(() => {
    for (let i = 0; i < targetValue.length; i++) {
      if (hasParent(targetValue[i])) {
        const [isValid, depth] = isParent(targetValue[i], "i");
        parentMap.current.set(i, [depth, ""]);
      }
    }
  }, [currentWordIndex]);

  function compareChar(original: string, typed: string): boolean {
    return original === typed;
  }
  // n g u y  ễ n
  // 0,0,0,0 -2,0
  // n h u y  e n
  // 0 1 0 0 -1 0
  // n
  function trackBackParent() {}
  // function buildCorrectnessList(key: string) {
  //   // if user press backspace: set the second value to backspace
  //   if (key === "Backspace" || key === "Delete") {
  //     correctnessList.current[currentCharIndex][1] = "";
  //   } else {
  //     // if correct: change the second value to that character
  //     const currentWord = typedWords[currentWordIndex];
  //     const targetWord = words[currentWordIndex];
  //   }
  //   // if parent: change second to p1 or p2 depending on the trees depth,
  //   // else
  //   // if that character == second: skip
  //   // else: increment the first number, change 2nd value
  //   // onSpacePress(){ count missing character,
  //   // if p2: 2 error
  //   // if p1: 1 error
  //   // if second === "":
  //   // if has parent:
  //   //    check how many parents
  //   // add incorrect to the performance
  //   //          reset list
  //   // [[0,"n"],[0,"g"],[1,"y"],[0,"y"],["p2","e"],[0,"n"]]
  //   //  nguyên  original
  //   //  ngyyen  typed
  //   // [[0,"n"],[0,"g"],[1,"y"],[0,"y"],["p2","e"],[0,"n"]]
  //   // user press backspace:
  //   // [[0,"n"],[0,"g"],[1,"y"],[0,"y"],["p2","e"],[0,"Backspace"]]
  //   //  ngyye
  // }

  return { compareChar, trackBackParent };
}
