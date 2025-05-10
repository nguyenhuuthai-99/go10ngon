import Tile from "@/components/ui/tile";
import VerticalDivider from "@/components/ui/vertical-divider";
import { useAppSelector } from "@/hooks/redux-hook";
import { FaClock, FaListOl, FaQuoteLeft } from "react-icons/fa";
import {
  TimedModeDuration,
  TypingMode,
  WordCountQuantity,
} from "@/model/typing-mode";
import { useEffect, useState } from "react";
import { TimedMode } from "@/model/timed-mode";
import { WordCountMode } from "@/model/word-count-mode";
import { useTypingSessionActions } from "@/hooks/use-typing-session-actions";
import { IconType } from "react-icons";

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
      return (
        <ModeLevels levels={Object.values(WordCountQuantity)}></ModeLevels>
      );
    } else {
      return null;
    }
  }
  return (
    <div
      className={`flex flex-wrap justify-center md:hidden ${isStarted && isTyping ? "invisible" : "visible"} `}
    >
      <ModeSelections />
      <VerticalDivider
        height={40}
        width={3}
        className={"bg-border mx-2 mr-6"}
      />

      {generateMode()}
    </div>
  );
}

function ModeSelections() {
  const currentMode = useAppSelector(
    (state) => state.typingSessionState.typingGameMode.currentTypingMode,
  );
  const [selectedMode, setSelectedMode] = useState<TypingMode>(currentMode);
  const { updateMode } = useTypingSessionActions();

  function handleModeChange(mode: TypingMode) {
    setSelectedMode(mode);
    updateMode(mode);
  }

  return (
    <div className={"flex flex-wrap items-center justify-center"}>
      <ModeSelection
        title={"thời gian"}
        icon={FaClock}
        isSelected={selectedMode === TypingMode.timed}
        onClick={() => handleModeChange(TypingMode.timed)}
      />
      <ModeSelection
        title={"đếm từ"}
        icon={FaListOl}
        isSelected={selectedMode === TypingMode.wordCount}
        onClick={() => handleModeChange(TypingMode.wordCount)}
      />
      <ModeSelection
        title={"trích dẫn"}
        icon={FaQuoteLeft}
        isSelected={selectedMode === TypingMode.quote}
        onClick={() => handleModeChange(TypingMode.quote)}
      />
    </div>
  );
}

function ModeSelection({
  title,
  icon,
  isSelected,
  onClick,
}: {
  isSelected: boolean;
  onClick: () => void;
  title: string;
  icon: IconType;
}) {
  return (
    <div onClick={onClick} className={`hover:bg-card rounded-sm`}>
      <Tile
        title={title}
        Icon={icon}
        className={`${isSelected ? "text-foreground" : "text-inactive"}`}
      />
    </div>
  );
}
function ModeLevels({ levels }: { levels: number[] }) {
  const [selectedLevel, setSelectedLevel] = useState(levels[1]);
  const { updateLevel } = useTypingSessionActions();
  const mode = useAppSelector(
    (state) => state.typingSessionState.typingGameMode,
  );
  const duration = useAppSelector(
    (state) =>
      (state.typingSessionState.typingGameMode.modeContext as TimedMode)
        .duration,
  );
  const count = useAppSelector(
    (state) =>
      (state.typingSessionState.typingGameMode.modeContext as WordCountMode)
        .count,
  );

  useEffect(() => {
    console.log(mode);
    if (mode.currentTypingMode === TypingMode.timed) {
      setSelectedLevel(duration);
    } else if (mode.currentTypingMode === TypingMode.wordCount) {
      setSelectedLevel(count);
    }
  }, [mode.currentTypingMode]);

  function onModeLevelChange(level: number) {
    setSelectedLevel(level);
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
