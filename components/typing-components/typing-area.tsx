import { destructWord, stringToList } from "@/lib/utils";
import { useCallback, useEffect, useRef, useState, KeyboardEvent } from "react";
import { Caret } from "@/components/typing-components/caret";
import CharSpan from "@/components/typing-components/char-span";
import AutoFocusTrigger from "@/components/typing-components/auto-focus-trigger";
import { WordContainer } from "@/components/typing-components/word-container";

type Props = {
  text: string;
};
export function TypingArea({ text }: Props) {
  const words = stringToList(text);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [typedWords, setTypedWords] = useState<{ [key: number]: string }>({});
  const [currentTypedWord, setCurrentTypedWord] = useState("");
  // const [currentTypedWord, setCurrentTypedWord] = useState("");

  //Game state
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [isStarted, setIsStarted] = useState(false);
  const [isEnded, setIsEnded] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  //initialize typed words
  useEffect(() => {
    const initialTypedWords: { [key: number]: string } = {};
    words.forEach((value, index) => {
      initialTypedWords[index] = "";
    });
    setTypedWords(initialTypedWords);
  }, []);

  const handleKeyPress = useCallback(
    (key: string, value: string) => {
      if (isEnded) return;

      if (!isValidKey(key)) return;

      if (key === " ") {
        onSpacePress();
        return;
      }

      //set typed word
      setCurrentTypedWord(value);
      updateTypedWords(value);

      //move to next character
      let newIndex = currentCharIndex + 1;
      setCurrentCharIndex(newIndex);

      console.log(value);
    },
    [currentTypedWord, words, currentWordIndex, currentCharIndex],
  );

  function onSpacePress() {
    //todo check if last word, if last word and
    // space that mean game end

    // check the correction of typed word,

    // calculate wpm,

    setCurrentWordIndex((prev) => prev + 1);
    setCurrentCharIndex(0);
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

  function checkIsCorrect(wordIndex: number, charIndex: number): boolean {
    if (currentTypedWord === "" || typedWords[wordIndex]?.length <= charIndex)
      return false;

    return typedWords[wordIndex]?.[charIndex] === words[wordIndex][charIndex];
  }

  function checkIsIncorrect(wordIndex: number, charIndex: number): boolean {
    if (currentTypedWord === "" || typedWords[wordIndex]?.length <= charIndex)
      return false;

    return typedWords[wordIndex]?.[charIndex] !== words[wordIndex][charIndex];
  }

  return (
    <div
      className="flex h-30 flex-wrap overflow-hidden text-2xl leading-10 text-clip text-gray-600"
      onClick={focusInput}
    >
      <AutoFocusTrigger ref={inputRef} handleKeyDown={handleKeyPress} />
      {words.map((word, index) => {
        return (
          <WordContainer key={index} isActive={isWordActive(index)}>
            {destructWord(word).map((char, i) => (
              <CharSpan
                key={i}
                char={char}
                isActive={isCharActive(index, i)}
                isCorrect={checkIsCorrect(index, i)}
                isIncorrect={checkIsIncorrect(index, i)}
              >
                <Caret
                  visible={currentWordIndex === index && currentCharIndex === i}
                  isLeft={!isStarted}
                  isTyping={isTyping}
                />
              </CharSpan>
            ))}
            {/*{index < words.length - 1 && <span>&nbsp;</span>}*/}
          </WordContainer>
        );
      })}
    </div>
  );
}

function isValidKey(key: string): boolean {
  return !(key.length !== 1 && key !== " ");
}
