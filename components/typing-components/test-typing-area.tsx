// import React, { useRef } from "react";
// import Word from "./Word";
// import Caret from "./Caret";
// import useKeyHandler from "../hooks/useKeyHandler";
// import { useTypingSession } from "../../hooks/useTypingSession";
// import { useCaretPosition } from "../../hooks/useCaretPosition";
// import { useScrollToCaret } from "../../hooks/useScrollToCaret";
//
// interface TypingAreaProps {
//   words: string[];
//   mode: "timed" | "words";
//   isTyping: boolean;
//   isEnded: boolean;
//   setIsTyping: React.Dispatch<React.SetStateAction<boolean>>;
//   setIsEnded: React.Dispatch<React.SetStateAction<boolean>>;
//   duration: number;
//   setDuration: React.Dispatch<React.SetStateAction<number>>;
// }
//
// const TypingArea: React.FC<TypingAreaProps> = ({
//   words,
//   mode,
//   isTyping,
//   isEnded,
//   setIsTyping,
//   setIsEnded,
//   duration,
//   setDuration,
// }) => {
//   const typingAreaRef = useRef<HTMLDivElement>(null);
//   const activeCharRef = useRef<HTMLSpanElement>(null);
//   const activeSpaceRef = useRef<HTMLSpanElement>(null);
//
//   const {
//     currentWordIndex,
//     currentCharIndex,
//     currentTypedWord,
//     extraChars,
//     typedWords,
//     setCurrentCharIndex,
//     setCurrentWordIndex,
//     setCurrentTypedWord,
//     updateTypedWords,
//     handleExtraCharsChange,
//     resetSession,
//   } = useTypingSession(words);
//
//   const caret = useCaretPosition(activeCharRef, activeSpaceRef, [
//     currentCharIndex,
//     currentWordIndex,
//   ]);
//
//   useScrollToCaret(caret, typingAreaRef);
//
//   useKeyHandler({
//     words,
//     mode,
//     isTyping,
//     isEnded,
//     setIsTyping,
//     setIsEnded,
//     duration,
//     setDuration,
//     currentWordIndex,
//     setCurrentWordIndex,
//     currentCharIndex,
//     setCurrentCharIndex,
//     currentTypedWord,
//     setCurrentTypedWord,
//     typedWords,
//     updateTypedWords,
//     handleExtraCharsChange,
//     extraChars,
//   });
//
//   return (
//     <div
//       className="typing-area relative max-h-[400px] overflow-y-auto pr-2"
//       ref={typingAreaRef}
//     >
//       <Caret
//         top={caret.top}
//         left={caret.left}
//         width={caret.width}
//         height={caret.height}
//       />
//
//       <div className="flex flex-wrap gap-x-4">
//         {words.map((word, index) => (
//           <Word
//             key={index}
//             word={word}
//             wordIndex={index}
//             currentCharIndex={currentCharIndex}
//             currentWordIndex={currentWordIndex}
//             typedWord={typedWords[index] || ""}
//             extraChars={extraChars[index] || ""}
//             activeCharRef={activeCharRef}
//             activeSpaceRef={activeSpaceRef}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };
//
// export default TypingArea;
