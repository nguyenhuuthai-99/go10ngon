import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hook";
import { Button } from "@/components/ui/button";
import { BsArrowClockwise, BsArrowRight } from "react-icons/bs";
import SizeBox from "@/components/ui/size-box";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { destructWord } from "@/lib/utils";
import CharSpan from "@/components/typing-components/char-span";
import { WordContainer } from "@/components/typing-components/word-container";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TypingSessionButtons } from "@/components/ui/typing-session-buttons";

export function TypingResult() {
  const [show, setShow] = useState<boolean>(false);

  const { wpm, accuracy, adjustedWpm } = useAppSelector(
    (state) => state.typingSessionPerformance,
  );

  useEffect(() => {
    setShow(!show);
  }, [wpm, accuracy]);

  return (
    <div
      className={`flex h-full max-h-screen w-full flex-col gap-6 overflow-y-auto`}
    >
      <ResultPerformance adjustedWpm={adjustedWpm} accuracy={accuracy} />
      <SizeBox height={10} />
      <TypingSessionButtons />
      <ResultHistory />
      <ResultTable />
    </div>
  );
}

interface ResultProps {
  adjustedWpm: number;
  accuracy: number;
}
function ResultPerformance({ adjustedWpm, accuracy }: ResultProps) {
  return (
    <div className="font-orbitron flex flex-wrap items-center justify-center gap-x-20 text-center text-4xl">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <div>
              <div className="font-bold">{adjustedWpm}</div>
              <div>wpm</div>
            </div>
          </TooltipTrigger>
          <TooltipContent className={"font-roboto-mono"}>tốc độ</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <div>
              <div className="font-bold">{accuracy}</div>
              <div>%</div>
            </div>
          </TooltipTrigger>
          <TooltipContent className={"font-roboto-mono"}>
            độ chính xác
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}

function ResultHistory() {
  const typedWords = useAppSelector(
    (state) => state.typingSessionState.typedWords,
  );
  const words = useAppSelector(
    (state) => state.typingSessionState.typingGameMode.modeContext.text,
  );
  const typingStats = useAppSelector((state) => state.typingSessionStats);

  return (
    <div>
      <div className={"mb-2 text-3xl font-bold"}>lịch sử</div>
      <div className="flex flex-wrap leading-5">
        {Object.values(typedWords).map((typedWord, index) => {
          return typedWord.length > 0 ? (
            <TooltipProvider key={index}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex">
                    <WordContainer
                      isResult={true}
                      isIncorrect={typedWords[index] !== words[index]}
                      ref={null}
                      isActive={false}
                    >
                      {destructWord(words[index]).map((char, i) => (
                        <CharSpan
                          key={i}
                          char={char}
                          typedChar={typedWords[index]?.[i] || null}
                          ref={null}
                          isActive={false}
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
                          ref={null}
                          isActive={false}
                        />
                      </div>
                    )}
                  </div>
                </TooltipTrigger>
                <TooltipContent
                  className={"bg-card text-foreground border-border border-2"}
                >
                  <p>{typedWord}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : null;
        })}
      </div>
    </div>
  );
}

function ResultTable() {
  const [incorrectPairs, setIncorrectPairs] = useState<
    { typed: string; original: string }[]
  >([]);

  const typedWords = useAppSelector(
    (state) => state.typingSessionState.typedWords,
  );
  const words = useAppSelector(
    (state) => state.typingSessionState.typingGameMode.modeContext.text,
  );

  useEffect(() => {
    const incorrects = [];
    for (let i = 0; i < words.length; i++) {
      if (typedWords[i] === "") break;
      if (typedWords[i] !== words[i]) {
        incorrects.push({ typed: typedWords[i], original: words[i] });
      }
    }

    setIncorrectPairs(incorrects);
  }, [typedWords, words]);

  return (
    <div>
      <Table className={`${incorrectPairs.length === 0 ? "hidden" : ""}`}>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/2 text-center">từ gốc</TableHead>
            <TableHead className={"w-1/2 text-center"}>từ nhập sai</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {incorrectPairs.map((pair, wordIndex) => (
            <TableRow key={wordIndex}>
              <TableCell className={"w-1/2 text-center"}>
                {pair.original}
              </TableCell>
              <TableCell className={"text-inactive w-1/2 text-center"}>
                {destructWord(pair.typed).map((value, index) => (
                  <CharSpan
                    key={`result-${index}`}
                    char={
                      index >= pair.original.length
                        ? "extra"
                        : pair.original[index]
                    }
                    typedChar={pair.typed[index]}
                    isResult={true}
                    isActive={false}
                    ref={null}
                  />
                ))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
