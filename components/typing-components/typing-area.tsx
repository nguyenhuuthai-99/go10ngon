"use client";
import { destructWord } from "@/lib/utils";
import { useEffect, useRef, useState, MouseEvent } from "react";

import { Caret } from "@/components/typing-components/caret";
import CharSpan from "@/components/typing-components/char-span";
import InputField from "@/components/typing-components/input-field";
import { WordContainer } from "@/components/typing-components/word-container";
import { TypingWordPreview } from "@/components/typing-components/typing-word-preview";
import { useTypingSession } from "@/hooks/use-typing-session";
import { useCaretPosition } from "@/hooks/use-caret-position";
import { useAutoScroll } from "@/hooks/use-scroll-to-caret";
import { useTypingPreview } from "@/hooks/use-typing-preview";
import { useAppSelector } from "@/hooks/redux-hook";
import { FaMousePointer } from "react-icons/fa";

export function TypingArea() {
  const words = useAppSelector(
    (state) => state.typingSessionState.typingGameMode.modeContext.text,
  );

  const {
    typedWords,
    currentWordIndex,
    currentCharIndex,
    onKeyDown,
    typingSessionState,
  } = useTypingSession();

  const typingAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const activeCharRef = useRef<HTMLSpanElement>(null);
  const activeSpaceRef = useRef<HTMLSpanElement>(null);
  const activeWordRef = useRef<HTMLDivElement>(null);

  const { caret } = useCaretPosition(activeCharRef, activeSpaceRef, [
    currentCharIndex,
    currentWordIndex,
  ]);
  const [isFocus, setIsFocus] = useState(true);

  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    const input = inputRef.current;
    if (!input) return;

    const handleFocus = () => setIsFocus(true);
    const handleBlur = () => {
      setIsFocus(false);
    };

    input.addEventListener("focus", handleFocus);
    input.addEventListener("blur", handleBlur);

    // Initial state check
    setIsFocus(document.activeElement === input);

    return () => {
      input.removeEventListener("focus", handleFocus);
      input.removeEventListener("blur", handleBlur);
    };
  }, []);

  useAutoScroll({ caret, typingAreaRef });

  const typingPreview = useTypingPreview({
    activeWordRef,
    currentWordIndex,
    currentCharIndex,
  });

  function focusInput(e: MouseEvent) {
    if (!hasMounted) return;
    e.preventDefault();
    inputRef.current?.focus();
  }

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
    <div className={"relative"} onMouseDown={(event) => focusInput(event)}>
      {!isFocus && (
        <div
          className={
            "absolute z-20 flex h-full w-full items-center justify-center backdrop-blur-xs"
          }
          onMouseDown={(event) => focusInput(event)}
        >
          <FaMousePointer />
          <div>&nbsp;nhấp để trở lại vùng nhập liệu</div>
        </div>
      )}
      <div>
        <div
          className="text-inactive relative flex h-36 flex-wrap overflow-hidden pl-1 text-3xl leading-12 wrap-anywhere text-clip"
          ref={typingAreaRef}
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
                    index < currentWordIndex &&
                    typedWords[index] !== words[index]
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
                {index < words.length && (
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
      <InputField
        isTypingSessionEnd={typingSessionState.isEnded}
        ref={inputRef}
        handleKeyDownCallBack={onKeyDown}
      />
    </div>
  );
}
