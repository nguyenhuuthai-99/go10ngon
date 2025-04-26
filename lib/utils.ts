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

export function isInParentMap(originalChar: string) {
  return originalChar in vietnameseParentMap;
}
export function isParent(originalChar: string, typedChar: string): boolean {
  return dfsFindParent(originalChar, typedChar);
}

function dfsFindParent(currentChar: string, typedChar: string): boolean {
  if (currentChar === typedChar) return true;

  if (!isInParentMap(currentChar)) return false;

  let found = false;

  for (const char of vietnameseParentMap[currentChar]) {
    found = dfsFindParent(char, typedChar);
    if (found) break;
  }

  return found;
}
