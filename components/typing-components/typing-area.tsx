import { destructWord, stringToList } from "@/lib/utils";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  KeyboardEvent,
  Dispatch,
  SetStateAction,
} from "react";
import { Caret } from "@/components/typing-components/caret";
import CharSpan from "@/components/typing-components/char-span";
import InputField from "@/components/typing-components/input-field";
import { WordContainer } from "@/components/typing-components/word-container";

type Props = {
  text: string;
};
export function TypingArea({ text }: Props) {
  const words = stringToList(text);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [typedWords, setTypedWords] = useState<{ [key: number]: string }>({});
  const [extraChars, setExtraChars] = useState<{ [key: number]: string }>({});
  const [currentTypedWord, setCurrentTypedWord] = useState("");
  const [caret, setCaret] = useState<{
    top: number;
    left: number;
    width: number;
    height: number;
  }>({ top: 7, left: 0, width: 2, height: 7 });

  //Game state
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [isStarted, setIsStarted] = useState(false);
  const [isEnded, setIsEnded] = useState(false);

  const typingAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const activeCharRef = useRef<HTMLSpanElement>(null);
  const activeSpaceRef = useRef<HTMLSpanElement>(null);
  const activeWordRef = useRef<HTMLDivElement>(null);

  //trigger endgame
  useEffect(() => {
    if (isTypeSessionEnd(currentCharIndex)) {
      onTypeSessionEnd();
      return;
    }
  }, [currentCharIndex, currentWordIndex]);

  //initialize typed words
  useEffect(() => {
    const initialTypedWords: { [key: number]: string } = {};
    words.forEach((value, index) => {
      initialTypedWords[index] = "";
    });
    setTypedWords(initialTypedWords);
  }, []);

  // handle scrolling
  useEffect(() => {
    let offsetTop: number = 0;
    let offsetLeft: number = 0;
    let width: number = 0;
    let height: number = 0;

    const element = activeCharRef.current;
    const space = activeSpaceRef.current;
    if (space) {
      offsetTop = space.offsetTop;
      offsetLeft = space.offsetLeft;
      height = space.offsetHeight;
      width = space.offsetWidth;
    } else if (element) {
      offsetTop = element.offsetTop;
      offsetLeft = element.offsetLeft;
      width = element.offsetWidth;
      height = element.offsetHeight;
    }

    setCaret({
      top: offsetTop,
      left: offsetLeft,
      width: width,
      height: height,
    });
  }, [currentCharIndex, currentWordIndex]);

  const handleKeyPress = useCallback(
    (
      key: string,
      value: string,
      setInputValue: Dispatch<SetStateAction<string>>,
    ) => {
      if (isEnded) return;

      if (key === "Backspace" || key === "Delete") {
        onBackspace(setInputValue);
        return;
      }

      if (!isValidKey(key)) return;

      if (!isTyping) {
        setIsTyping(true);
      }

      if (!isStarted) {
        setIsStarted(true);
      }

      if (key === " ") {
        onSpacePress();
        return;
      }

      //move to next character
      let newIndex = currentCharIndex + 1;
      setCurrentCharIndex(newIndex);

      if (isExtraChars(newIndex)) {
        handleExtraCharsChange(value);
      }

      //set typed word
      setCurrentTypedWord(value);
      updateTypedWords(value);

      console.log(value);
    },
    [currentTypedWord, words, currentWordIndex, currentCharIndex],
  );

  function isExtraChars(index: number): boolean {
    return index > words[currentWordIndex].length;
  }
  function handleExtraCharsChange(typedValue: string) {
    const extras = typedValue.slice(words[currentWordIndex].length);
    setExtraChars((prevState) => {
      return {
        ...prevState,
        [currentWordIndex]: extras,
      };
    });
  }

  const scrollToCaret = useCallback(() => {
    if (!typingAreaRef.current) return;

    const typingArea = typingAreaRef.current;
    const caretTop = caret.top;
    const caretHeight = caret.height;

    const visibleHeight = typingArea.clientHeight;
    const currentScroll = typingArea.scrollTop;

    const caretMid = caretTop + caretHeight / 2;

    const idealScroll = caretMid - visibleHeight / 2;

    typingArea.scrollTo({
      top: idealScroll,
      behavior: "smooth",
    });
  }, [caret]);

  useEffect(() => {
    scrollToCaret();
  }, [caret, scrollToCaret]);

  function isTypeSessionEnd(index: number) {
    return (
      currentWordIndex >= words.length ||
      (index === words[-1]?.length - 1 && currentWordIndex === words.length - 1)
    );
  }

  function onTypeSessionEnd() {
    setIsEnded(true);
    //todo request a new words list

    //reset fields
    setCurrentWordIndex(0);
    setCurrentCharIndex(0);
    setTypedWords({});
    setCurrentTypedWord("");
    setIsTyping(false);
    setIsStarted(false);
  }

  function onSpacePress() {
    // check the correction of typed word,

    // calculate wpm,

    setCurrentWordIndex((prev) => prev + 1);
    setCurrentCharIndex(0);
  }

  function onBackspace(setInputValue: Dispatch<SetStateAction<string>>) {
    if (currentCharIndex > 0) {
      handleBackSpaceWithinWord();
    } else if (currentCharIndex === 0 && currentWordIndex > 0) {
      moveToPreviousWord(setInputValue);
    }
  }

  function handleBackSpaceWithinWord() {
    const updateWord = currentTypedWord.slice(0, -1);
    setCurrentTypedWord(updateWord);
    updateTypedWords(updateWord);
    setCurrentCharIndex((prev) => prev - 1);
    if (hasExtraChars()) {
      removeExtraChars();
    }
  }

  function moveToPreviousWord(setInputValue: Dispatch<SetStateAction<string>>) {
    const prevWordIndex = currentWordIndex - 1;
    const prevWord = typedWords[prevWordIndex] ?? "";
    setCurrentTypedWord(prevWord);
    setCurrentCharIndex(prevWord.length);
    setCurrentWordIndex(prevWordIndex);
    setInputValue(prevWord);
  }

  function hasExtraChars(): boolean {
    return extraChars[currentWordIndex]?.length > 0;
  }

  function removeExtraChars(): void {
    const updateExtraChars = extraChars[currentWordIndex].slice(0, -1);
    setExtraChars((prevState) => {
      return {
        ...prevState,
        [currentWordIndex]: updateExtraChars,
      };
    });
  }

  function updateTypedWords(value: string) {
    setTypedWords((prevState) => ({
      ...prevState,
      [currentWordIndex]: value,
    }));
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

  function checkIsCorrectChar(wordIndex: number, charIndex: number): boolean {
    if (!isStarted || typedWords[wordIndex]?.length <= charIndex) return false;

    return typedWords[wordIndex]?.[charIndex] === words[wordIndex][charIndex];
  }

  function checkIsIncorrectChar(wordIndex: number, charIndex: number): boolean {
    if (!isStarted || typedWords[wordIndex]?.length <= charIndex) return false;

    return typedWords[wordIndex]?.[charIndex] !== words[wordIndex][charIndex];
  }

  function checkIsActiveSpace(wordIndex: number) {
    return (
      currentWordIndex === wordIndex &&
      currentCharIndex >= words[wordIndex].length
    );
  }

  return (
    <div>
      <InputField ref={inputRef} handleKeyDown={handleKeyPress} />
      <div
        className="relative flex h-36 flex-wrap overflow-hidden text-3xl leading-12 wrap-anywhere text-clip text-gray-500"
        ref={typingAreaRef}
        onClick={focusInput}
      >
        <Caret
          top={caret.top}
          left={caret.left}
          width={caret.width}
          height={caret.height}
          visible={true}
          isLeft={!isStarted}
          isTyping={isTyping}
        />
        {words.map((word, index) => {
          return (
            <div key={index} className="flex">
              <WordContainer
                ref={index === currentWordIndex ? activeWordRef : null}
                isActive={isWordActive(index)}
              >
                {destructWord(word).map((char, i) => (
                  <CharSpan
                    key={i}
                    char={char}
                    ref={isCharActive(index, i) ? activeCharRef : null}
                    isActive={isCharActive(index, i)}
                    isCorrect={checkIsCorrectChar(index, i)}
                    isIncorrect={checkIsIncorrectChar(index, i)}
                  ></CharSpan>
                ))}
                {extraChars[index] &&
                  destructWord(extraChars[index]).map((char, i) => (
                    <CharSpan
                      key={`extra-${i}`}
                      char={char}
                      isActive={false}
                      isCorrect={false}
                      isIncorrect={true}
                      ref={null}
                    />
                  ))}
              </WordContainer>
              {index < words.length - 1 && (
                <div>
                  <CharSpan
                    char=" "
                    ref={checkIsActiveSpace(index) ? activeCharRef : null}
                    isActive={checkIsActiveSpace(index)}
                    isCorrect={false}
                    isIncorrect={false}
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

function isValidKey(key: string): boolean {
  return !(key.length !== 1 && key !== " ");
}
