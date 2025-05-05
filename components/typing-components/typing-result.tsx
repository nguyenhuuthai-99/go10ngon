import { useEffect, useState } from "react";
import { useAppSelector } from "@/hooks/redux-hook";
import { Button } from "@/components/ui/button";
import { BsArrowClockwise, BsArrowRight } from "react-icons/bs";
import SizeBox from "@/components/ui/size-box";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { destructWord } from "@/lib/utils";
import CharSpan from "@/components/typing-components/char-span";

interface Props {
  typedWords: string[];
  words: string[];
}
export function TypingResult({ typedWords, words }: Props) {
  const [show, setShow] = useState<boolean>(false);
  const totalKeystrokes = useAppSelector(
    (state) => state.typingSessionStats.totalKeystrokes,
  );

  const { wpm, accuracy, adjustedWpm } = useAppSelector(
    (state) => state.typingSessionPerformance,
  );

  useEffect(() => {
    setShow(!show);
  }, [wpm, accuracy]);

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
        >
          thử lại <BsArrowClockwise />
        </Button>
        <SizeBox width={40} />
        <Button
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
  const incorrectPairs: { typed: string; original: string }[] = [];

  const { typedWords, words } = useAppSelector((state) => state.ty);

  for (let i = 0; i < typedWords.length; i++) {
    if (typedWords[i] !== words[i]) {
      incorrectPairs.push({
        typed: typedWords[i],
        original: words[i],
      });
    }
  }

  return (
    <Table className={incorrectPairs.length === 0 ? "hidden" : ""}>
      <TableHeader>
        <TableRow>
          <TableHead className="w-1/2 text-center">từ gốc</TableHead>
          <TableHead className={"w-1/2 text-center"}>từ sai</TableHead>
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
                    pair.original[index]
                      ? pair.original[index]
                      : pair.typed[index]
                  }
                  typedChar={
                    index >= pair.original.length ? "extra" : pair.typed[index]
                  }
                  isActive={true}
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
