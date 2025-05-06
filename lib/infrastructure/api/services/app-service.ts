import { TimedMode } from "@/model/timed-mode";
import { TimedModeDuration } from "@/model/typing-mode";
import { stringToList } from "@/lib/utils";
import { commonVietnameseWords } from "@/utils/common-words";
export function getTimedTest(duration: number): string[] {
  if (duration === TimedModeDuration.short) {
    return shuffleAndWithdraw(commonVietnameseWords, 150);
  } else if (duration === TimedModeDuration.medium) {
    return shuffleAndWithdraw(commonVietnameseWords, 300);
  } else {
    return shuffleAndWithdraw(commonVietnameseWords, 450);
  }
}

export function getWordsCountTest(count: number): string[] {
  return [];
}

export function getQuoteTest(): string[] {
  return [];
}

function shuffleAndWithdraw(list: string[], count: number) {
  const result: string[] = [];

  while (result.length < count) {
    // Shuffle using Fisher-Yates algorithm
    const shuffled = [...list];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    // Add unique items to result
    for (let i = 0; i < shuffled.length && result.length < count; i++) {
      const splitWord = shuffled[i].split(" ");
      for (let j = 0; j < splitWord.length; j++) {
        result.push(splitWord[j]);
      }
    }
  }

  return result;
}
