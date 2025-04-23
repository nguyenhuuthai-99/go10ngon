import { destructWord, stringToList } from "@/lib/utils";
import { useCallback, useEffect, useRef, useState } from "react";
import { Caret } from "@/components/ui/caret";
import { clearInterval } from "node:timers";

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
  const [typedWords, setTypedWords] = useState([]);
  const [currentTypedWord, setCurrentTypedWord] = useState("");

  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [isStarted, setIsStarted] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  // // focus input on mount
  // useEffect(() => {
  //   inputRef.current?.focus();
  //
  //   //refocus if it loses focus
  //   const interval = setInterval(() => {
  //     if (document.activeElement !== inputRef.current) {
  //       inputRef.current?.focus();
  //     }
  //   }, 100);
  //
  //   return () => clearInterval(interval);
  // });

  const handleKeyPress = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {},
    [],
  );

  return (
    <div
      id="typing-area"
      className="flex h-30 flex-wrap overflow-hidden text-2xl leading-10 text-clip text-gray-600"
    >
      {words.map((word, index) => {
        return (
          <div className="mx-2" key={index}>
            {destructWord(word).map((char, i) => (
              <span className={"relative ml-[0.1rem]"} key={`${index} ${i}`}>
                {char}
                <Caret
                  visible={activeChar.x === index && activeChar.y === i}
                  isLeft={!isStarted}
                  isTyping={isTyping}
                />
              </span>
            ))}
            {/*{index < words.length - 1 && <span>&nbsp;</span>}*/}
          </div>
        );
      })}
    </div>
  );
}
