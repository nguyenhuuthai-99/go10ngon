import { destructWord, stringToList } from "@/lib/utils";
import { useCallback, useEffect, useRef, useState, KeyboardEvent } from "react";
import { Caret } from "@/components/ui/caret";
import CharSpan from "@/components/ui/char-span";
import AutoFocusTrigger from "@/components/ui/auto-focus-trigger";

type Props = {
  text: string;
};
export function TypingArea({ text }: Props) {
  const words = stringToList(text);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [activeChar, setActiveChar] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [typedWords, setTypedWords] = useState<string[]>([]);
  let currentTypedWord: string = "";
  // const [currentTypedWord, setCurrentTypedWord] = useState("");

  //Game state
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [isStarted, setIsStarted] = useState(false);
  const [isEnded, setIsEnded] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyPress = useCallback((key: string, value: string) => {
    if (isEnded) return;

    if (!isValidKey(key)) return;

    console.log(key, value);

    if (key === " ") {
      onSpacePress();
      return;
    }

    //get typed word
    currentTypedWord = value;
    // console.log(currentTypedWord);

    //move to next character
    setCurrentCharIndex((prevState) => prevState + 1);
  }, []);

  function onSpacePress() {
    //todo check if last word, if last word and
    // space that mean game end

    updateTypedWords();
    // check the correction of typed word,

    // calculate wpm,

    setCurrentWordIndex((prev) => prev + 1);
  }

  function updateTypedWords() {
    setTypedWords((prevState) => [...prevState, currentTypedWord]);
  }

  function focusInput() {
    inputRef.current?.focus();
  }

  //todo handle timer

  function isCharActive(wordIndex: number, charIndex: number): boolean {
    return wordIndex === currentWordIndex && charIndex === currentCharIndex;
  }

  return (
    <div
      className="flex h-30 flex-wrap overflow-hidden text-2xl leading-10 text-clip text-gray-600"
      onClick={focusInput}
    >
      <AutoFocusTrigger ref={inputRef} handleKeyDown={handleKeyPress} />
      {words.map((word, index) => {
        return (
          <div className="mx-2" key={index}>
            {destructWord(word).map((char, i) => (
              <CharSpan
                key={`${index} ${i}`}
                char={char}
                isActive={isCharActive(index, i)}
                isCorrect={currentTypedWord[i] === char}
                isIncorrect={currentTypedWord[i] !== char}
              >
                <Caret
                  visible={activeChar.x === index && activeChar.y === i}
                  isLeft={!isStarted}
                  isTyping={isTyping}
                />
              </CharSpan>
            ))}
            {/*{index < words.length - 1 && <span>&nbsp;</span>}*/}
          </div>
        );
      })}
    </div>
  );
}

function isValidKey(key: string): boolean {
  return !(key.length !== 1 && key !== " ");
}
