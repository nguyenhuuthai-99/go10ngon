import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function stringToList(text: string): string[] {
  return text.replace(/^\s+/gm, "").split(/[ \n]/);
}

export function destructWord(word: string): string[] {
  return word.split("");
}
