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
import {
  fetchTypingGameThunk,
  resetTypingSessionState,
  resetTypingSessionStateAndWords,
  setReady,
} from "@/lib/redux/slice/typing-session-slice";
import { resetTypingStatsState } from "@/lib/redux/slice/typing-session-stats-slice";
import { resetPerformance } from "@/lib/redux/slice/typing-session-performance-slice";

export function TypingResult() {
  const [show, setShow] = useState<boolean>(false);
  const totalKeystrokes = useAppSelector(
    (state) => state.typingSessionStats.totalKeystrokes,
  );
  const isEnd = useAppSelector((state) => state.typingSessionState.isEnded);

  const { wpm, accuracy, adjustedWpm } = useAppSelector(
    (state) => state.typingSessionPerformance,
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    setShow(!show);
  }, [wpm, accuracy]);

  async function onRestartClick() {
    resetSession();
    dispatch(resetTypingSessionState());
  }

  function onContinueClick() {
    dispatch(setReady(false));
    resetSession();
    dispatch(resetTypingSessionStateAndWords());
    dispatch(fetchTypingGameThunk());
  }

  function resetSession() {
    dispatch(resetTypingStatsState());
    dispatch(resetPerformance());
    dispatch(setReady(true));
  }

  return (
    <div
      className={`transform transition-all duration-500 ease-out ${
        show
          ? "translate-y-0 opacity-100"
          : "pointer-events-none -translate-y-4 opacity-0"
      }mt-10 flex w-full flex-col items-center space-y-6`}
    >
      <ResultPerformance adjustedWpm={adjustedWpm} accuracy={accuracy} />
      <SizeBox height={10} />
      <div className={"flex flex-wrap items-center justify-center"}>
        <Button
          className={"text-foreground bg-card cursor-pointer hover:text-white"}
          onClick={onRestartClick}
        >
          thử lại <BsArrowClockwise />
        </Button>
        <SizeBox width={40} />
        <Button
          onClick={onContinueClick}
          className={"text-foreground bg-card cursor-pointer hover:text-white"}
        >
          tiếp tục <BsArrowRight />
        </Button>
      </div>
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
    <div className="font-orbitron flex flex-wrap justify-center text-center text-4xl">
      <div className={"mr-20"}>
        <div className="font-bold">{adjustedWpm}</div>
        <div>wpm</div>
      </div>
      <div>
        <div className="font-bold">{accuracy}</div>
        <div>%</div>
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
    <Table className={incorrectPairs.length === 0 ? "hidden" : ""}>
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
  );
}
