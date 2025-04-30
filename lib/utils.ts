import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { vietnameseParentMap } from "@/utils/character-map";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function stringToList(text: string): string[] {
  return text.replace(/^\s+/gm, "").split(/[ \n]/);
}

export function destructWord(word: string): string[] {
  return word.split("");
}

export function hasParent(originalChar: string) {
  return originalChar in vietnameseParentMap;
}
export function isParent(
  originalChar: string,
  typedChar: string,
): [boolean, number] {
  return dfsFindParent(originalChar, typedChar, 0);
}

function dfsFindParent(
  currentChar: string,
  typedChar: string,
  count: number,
): [boolean, number] {
  if (currentChar === typedChar) return [true, count];

  if (!hasParent(currentChar)) return [false, count];

  let found = false;
  let newCount = count;

  for (const char of vietnameseParentMap[currentChar]) {
    [found, newCount] = dfsFindParent(char, typedChar, count + 1);
    if (found) break;
  }

  return [found, newCount];
}
