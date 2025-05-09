import Tile from "@/components/ui/tile";
import { TimeIcon } from "@/public/assets/icons/time";
import { PopularIcon } from "@/public/assets/icons/popular";
import { QuoteIcon } from "@/public/assets/icons/quote";
import { RelaxIcon } from "@/public/assets/icons/relax";
import VerticalDivider from "@/components/ui/vertical-divider";
import { LessonIcon } from "@/public/assets/icons/lesson";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hook";
import { FaClock, FaListOl, FaQuoteLeft, FaTimesCircle } from "react-icons/fa";
import { BsAlphabetUppercase } from "react-icons/bs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  TimedModeDuration,
  TypingMode,
  WordCountQuantity,
} from "@/model/typing-mode";
import { useEffect, useState } from "react";
import { useTypingMode } from "@/hooks/use-typing-mode";
import { TimedMode } from "@/model/timed-mode";
import { WordCountMode } from "@/model/word-count-mode";
import { resetTypingStatsState } from "@/lib/redux/slice/typing-session-stats-slice";
import { resetPerformance } from "@/lib/redux/slice/typing-session-performance-slice";
import { setReady } from "@/lib/redux/slice/typing-session-slice";
import { TypingSessionButtons } from "@/components/ui/typing-session-buttons";

export default function TypingModeBox() {
  const isStarted = useAppSelector(
    (state) => state.typingSessionState.isStarted,
  );
  const isTyping = useAppSelector((state) => state.typingSessionState.isTyping);

  const currentMode = useAppSelector(
    (state) => state.typingSessionState.typingGameMode.currentTypingMode,
  );

  function generateMode() {
    if (currentMode === TypingMode.timed) {
      return (
        <ModeLevels levels={Object.values(TimedModeDuration)}></ModeLevels>
      );
    } else if (currentMode === TypingMode.wordCount) {
      return null;
    } else {
      return null;
    }
  }
  return (
    <div
      className={`flex flex-wrap justify-center ${isStarted && isTyping ? "invisible" : "visible"} `}
    >
      <Tile title="thời gian" Icon={FaClock} />
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Tile title="đếm từ" Icon={FaListOl} className={"text-inactive"} />
          </TooltipTrigger>
          <TooltipContent>
            <p>Coming soon</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Tile
              title="trích dẫn"
              Icon={FaQuoteLeft}
              className={"text-inactive"}
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>Coming soon</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <VerticalDivider
        height={40}
        width={3}
        className={"bg-border mx-2 mr-6"}
      />

      {generateMode()}
    </div>
  );
}

function ModeLevels({ levels }: { levels: number[] }) {
  const [selectedLevel, setSelectedLevel] = useState(levels[1]);
  const { updateLevel } = useTypingMode();
  const mode = useAppSelector(
    (state) => state.typingSessionState.typingGameMode,
  );

  useEffect(() => {
    if (mode.currentTypingMode === TypingMode.timed) {
      setSelectedLevel((mode.modeContext as TimedMode).duration);
    } else if (mode.currentTypingMode === TypingMode.wordCount) {
      setSelectedLevel((mode.modeContext as WordCountMode).count);
    }
  }, [mode]);

  function onModeLevelChange(level: number) {
    // setSelectedLevel(level);
    updateLevel(level);
  }

  return (
    <div className={"flex gap-x-12"}>
      {levels.map((level, index) => (
        <ModeLevel
          onClick={() => onModeLevelChange(level)}
          isSelected={selectedLevel === level}
          key={index}
          level={level}
        ></ModeLevel>
      ))}
    </div>
  );
}

interface Props {
  level: string | number;
  isSelected: boolean;
  onClick: () => void;
}
function ModeLevel({ isSelected, level, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className={`${isSelected ? "text-foreground" : "text-inactive"} flex cursor-pointer items-center`}
    >
      {level}
    </div>
  );
}
