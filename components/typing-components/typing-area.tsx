import { destructWord, hasParent, isParent, stringToList } from "@/lib/utils";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

import { Caret } from "@/components/typing-components/caret";
import CharSpan from "@/components/typing-components/char-span";
import InputField from "@/components/typing-components/input-field";
import { WordContainer } from "@/components/typing-components/word-container";
import { TypingWordPreview } from "@/components/typing-components/typing-word-preview";
import { useTypingSessionPerformance } from "@/hooks/use-typing-session-performance";
import { useTypingSession } from "@/hooks/use-typing-session";
import { useCaretPosition } from "@/hooks/use-caret-position";
import { useAutoScroll } from "@/hooks/use-scroll-to-caret";
import { useTypingPreview } from "@/hooks/use-typing-preview";

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
    typingSessionState,
    updateTypedWords,
    setTypedWords,
    moveCharToIndex,
    moveToPreviousChar,
    moveToNextWord,
    resetTypingSession,
  } = useTypingSession(words);

  const { wpm, accuracy, onPerformanceCalculate } =
    useTypingSessionPerformance();

  const typingAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const activeCharRef = useRef<HTMLSpanElement>(null);
  const activeSpaceRef = useRef<HTMLSpanElement>(null);
  const activeWordRef = useRef<HTMLDivElement>(null);
  const correctnessList = useRef<(string | number)[][]>([]);

  const { caret, resetCaretPosition } = useCaretPosition(
    activeCharRef,
    activeSpaceRef,
    [currentCharIndex, currentWordIndex],
  );

  useAutoScroll({ caret, typingAreaRef });

  const typingPreview = useTypingPreview({
    activeWordRef,
    typedWords,
    currentWordIndex,
    currentCharIndex,
  });

  //reset correctnessList
  useEffect(() => {
    //build the map
    const cL = [];
    for (let i = 0; i < words[currentWordIndex].length; i++) {
      cL.push([0, ""]);
    }
    correctnessList.current = cL;
  }, [currentWordIndex]);

  const handleKeyPress = useCallback(
    (
      key: string,
      value: string,
      setInputValue: Dispatch<SetStateAction<string>>,
    ) => {
      if (typingSessionState.isEnded) return;

      if (!typingSessionState.isTyping) {
        typingSessionState.setIsTyping(true);
      }

      if (key === " ") {
        onSpacePress();
        return;
      } else if (key === "Backspace" || key === "Delete") {
        moveToPreviousChar(setInputValue);
      } else {
        moveCharToIndex(value.length);
      }

      updateTypedWords(value);
    },
    [words, currentWordIndex, currentCharIndex],
  );

  function buildCorrectnessList(key: string) {
    // if user press backspace: set the second value to backspace
    if (key === "Backspace" || key === "Delete") {
      correctnessList.current[currentCharIndex][1] = "";
    } else {
      // if correct: change the second value to that character
      const currentWord = typedWords[currentWordIndex];
      const targetWord = words[currentWordIndex];
    }
    // if parent: change second to p1 or p2 depending on the trees depth,
    // else
    // if that character == second: skip
    // else: increment the first number, change 2nd value
    // onSpacePress(){ count missing character,
    // if p2: 2 error
    // if p1: 1 error
    // if second === "":
    // if has parent:
    //    check how many parents
    // add incorrect to the performance
    //          reset list
    // [[0,"n"],[0,"g"],[1,"y"],[0,"y"],["p2","e"],[0,"n"]]
    //  nguyên  original
    //  ngyyen  typed
    // [[0,"n"],[0,"g"],[1,"y"],[0,"y"],["p2","e"],[0,"n"]]
    // user press backspace:
    // [[0,"n"],[0,"g"],[1,"y"],[0,"y"],["p2","e"],[0,"Backspace"]]
    //  ngyye
  }

  function onTypeSessionEnd() {
    //todo request a new words list
  }

  function onSpacePress() {
    if (!typedWords[currentWordIndex]) return;

    // check the correction of typed word,

    // calculate wpm,

    moveToNextWord();
  }

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
      <InputField ref={inputRef} handleKeyDownCallBack={handleKeyPress} />

      <div
        className="relative flex h-36 flex-wrap overflow-hidden text-3xl leading-12 wrap-anywhere text-clip text-gray-600"
        ref={typingAreaRef}
        onClick={focusInput}
      >
        <TypingWordPreview
          {...typingPreview}
          isTyping={typingSessionState.isTyping}
        />
        <Caret
          top={caret.top}
          left={caret.left}
          width={caret.width}
          height={caret.height}
          visible={true}
          isTyping={typingSessionState.isTyping}
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
