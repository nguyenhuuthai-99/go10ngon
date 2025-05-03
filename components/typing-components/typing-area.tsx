import { destructWord, stringToList } from "@/lib/utils";
import { useEffect, useRef } from "react";

import { Caret } from "@/components/typing-components/caret";
import CharSpan from "@/components/typing-components/char-span";
import InputField from "@/components/typing-components/input-field";
import { WordContainer } from "@/components/typing-components/word-container";
import { TypingWordPreview } from "@/components/typing-components/typing-word-preview";
import { useTypingSession } from "@/hooks/use-typing-session";
import { useCaretPosition } from "@/hooks/use-caret-position";
import { useAutoScroll } from "@/hooks/use-scroll-to-caret";
import { useTypingPreview } from "@/hooks/use-typing-preview";
import { Timer } from "@/components/ui/timer";
import {
  TimedModeDuration,
  TypingMode,
  WordCountQuantity,
} from "@/model/typing-mode";
import { WordCounter } from "@/components/ui/word-counter";

type Props = {
  text: string;
  //turn this one to list later
};
export function TypingArea({ text }: Props) {
  const words = stringToList(text);

  const {
    currentWordIndex,
    currentCharIndex,
    typedWords,
    wpm,
    accuracy,
    onKeyDown,
    typingSessionState,
  } = useTypingSession({ words });

  const typingAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const activeCharRef = useRef<HTMLSpanElement>(null);
  const activeSpaceRef = useRef<HTMLSpanElement>(null);
  const activeWordRef = useRef<HTMLDivElement>(null);

  const { caret } = useCaretPosition(activeCharRef, activeSpaceRef, [
    currentCharIndex,
    currentWordIndex,
  ]);

  useAutoScroll({ caret, typingAreaRef });

  const typingPreview = useTypingPreview({
    activeWordRef,
    typedWords,
    currentWordIndex,
    currentCharIndex,
  });

  function focusInput() {
    inputRef.current?.focus();
  }

  //todo handle timer

  function isWordActive(wordIndex: number) {
    return wordIndex === currentWordIndex;
  }
  function isCharActive(wordIndex: number, charIndex: number): boolean {
    return wordIndex === currentWordIndex && charIndex === currentCharIndex;
  }

  function checkIsActiveSpace(wordIndex: number) {
    return (
      currentWordIndex === wordIndex &&
      currentCharIndex >= words[wordIndex].length
    );
  }

  return (
    <div>
      <InputField
        isTypingSessionEnd={typingSessionState.isEnded}
        ref={inputRef}
        handleKeyDownCallBack={onKeyDown}
      />
      <span>{wpm}</span> <span>{accuracy}</span>
      <div
        className="text-inactive relative flex h-36 flex-wrap overflow-hidden text-3xl leading-12 wrap-anywhere text-clip"
        ref={typingAreaRef}
        onClick={focusInput}
      >
        <TypingWordPreview
          {...typingPreview}
          isTyping={typingSessionState.isStarted}
        />
        <Caret
          top={caret.top}
          left={caret.left}
          width={caret.width}
          height={caret.height}
          visible={true}
          isTyping={typingSessionState.isStarted}
        />
        {words.map((word, index) => {
          return (
            <div key={index} className="flex">
              <WordContainer
                isIncorrect={
                  index < currentWordIndex && typedWords[index] !== words[index]
                }
                ref={index === currentWordIndex ? activeWordRef : null}
                isActive={isWordActive(index)}
              >
                {destructWord(word).map((char, i) => (
                  <CharSpan
                    key={i}
                    char={char}
                    typedChar={typedWords[index]?.[i] || null}
                    ref={isCharActive(index, i) ? activeCharRef : null}
                    isActive={isCharActive(index, i)}
                  ></CharSpan>
                ))}
                {typedWords[index]?.length > words[index].length &&
                  destructWord(
                    typedWords[index]?.slice(words[index].length),
                  ).map((char, i) => (
                    <CharSpan
                      key={`extra-${i}`}
                      char={char}
                      typedChar={"extra"}
                      isActive={false}
                      ref={null}
                    />
                  ))}
              </WordContainer>
              {index < words.length - 1 && (
                <div>
                  <CharSpan
                    char=" "
                    typedChar={" "}
                    ref={checkIsActiveSpace(index) ? activeCharRef : null}
                    isActive={checkIsActiveSpace(index)}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
