import Tile from "@/components/ui/tile";
import { useAppSelector } from "@/hooks/redux-hook";
import {
  TimedModeDuration,
  TypingMode,
  WordCountQuantity,
} from "@/model/typing-mode";
import { TimedMode } from "@/model/timed-mode";
import { WordCountMode } from "@/model/word-count-mode";
import { FaKeyboard } from "react-icons/fa6";
import { FaCaretDown, FaClock, FaListOl, FaQuoteLeft } from "react-icons/fa";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { IconType } from "react-icons";
import SizeBox from "@/components/ui/size-box";
import { useTypingSessionActions } from "@/hooks/use-typing-session-actions";

export function ModeIndicator() {
  const mode = useAppSelector(
    (state) => state.typingSessionState.typingGameMode,
  );
  function generateIcon() {
    if (mode.currentTypingMode === TypingMode.timed) {
      return FaClock;
    } else if (mode.currentTypingMode === TypingMode.wordCount) {
      return FaListOl;
    } else if (mode.currentTypingMode === TypingMode.quote) {
      return FaQuoteLeft;
    } else {
      return FaKeyboard;
    }
  }

  function ModeTrigger() {
    return (
      <div className="hover:text-primary flex-col items-center justify-center md:flex">
        <div className={"flex h-6 items-center justify-center"}>
          <Tile Icon={generateIcon()} title={mode.currentTypingMode} />
          <div className={"text-primary"}>
            <span>
              {mode.currentTypingMode === TypingMode.timed &&
                (mode.modeContext as TimedMode).duration}
            </span>
            <span>
              {mode.currentTypingMode === TypingMode.wordCount &&
                (mode.modeContext as WordCountMode).count}
            </span>
          </div>
        </div>
        <div className={"relative top-[-8]"}>
          <FaCaretDown />
        </div>
      </div>
    );
  }

  return (
    <Popover>
      <PopoverTrigger>{ModeTrigger()}</PopoverTrigger>
      <PopoverContent className={"bg-card w-[90vw] rounded-xs md:max-w-[50vw]"}>
        <ModePanel />
      </PopoverContent>
    </Popover>
  );
}

function ModePanel() {
  const mode = useAppSelector(
    (state) => state.typingSessionState.typingGameMode,
  );

  return (
    <div className={"flex w-full justify-around"}>
      <ModeSelections />
      <div className={"bg-border w-1"}></div>
      {mode.currentTypingMode === TypingMode.timed && (
        <LevelSelections
          currentLevel={(mode.modeContext as TimedMode).duration}
          mode={TypingMode.timed}
          levels={Object.values(TimedModeDuration)}
        />
      )}
      {mode.currentTypingMode === TypingMode.wordCount && (
        <LevelSelections
          currentLevel={(mode.modeContext as WordCountMode).count}
          mode={TypingMode.wordCount}
          levels={Object.values(WordCountQuantity)}
        />
      )}
      {/*<div className={"flex flex-col items-center justify-center text-nowrap"}>*/}
      {/*  <div>tiếng việt</div>*/}
      {/*  <div>tiếng anh</div>*/}
      {/*</div>*/}
    </div>
  );
}
function ModeSelections() {
  const [selectedMode, setSelectedMode] = useState(TypingMode.timed);

  function onModeChange(mode: TypingMode) {
    setSelectedMode(mode);
  }

  return (
    <div className="text-inactive mx-8 flex flex-col items-start gap-3">
      <ModeSelection
        mode={TypingMode.timed}
        icon={FaClock}
        onClick={onModeChange}
        isSelected={selectedMode === TypingMode.timed}
      />
      <ModeSelection
        mode={TypingMode.wordCount}
        icon={FaListOl}
        onClick={onModeChange}
        isSelected={selectedMode === TypingMode.wordCount}
      />
      <ModeSelection
        mode={TypingMode.quote}
        icon={FaQuoteLeft}
        onClick={onModeChange}
        isSelected={selectedMode === TypingMode.quote}
      />
    </div>
  );
}

function ModeSelection({
  mode,
  icon,
  isSelected,
  onClick,
}: {
  onClick: (mode: TypingMode) => void;
  mode: TypingMode;
  icon: IconType;
  isSelected: boolean;
}) {
  return (
    <div
      className={`${isSelected && "bg-foreground text-background"} flex h-8 w-full cursor-pointer items-center justify-center rounded-xs tracking-wider`}
      onClick={() => onClick(mode)}
    >
      <Tile className={"w-full"} title={mode} Icon={icon} />
    </div>
  );
}

function LevelSelections({
  mode,
  levels,
  currentLevel,
}: {
  mode: TypingMode;
  currentLevel: number;
  levels: number[];
}) {
  const [selectedLevel, setSelectedLevel] = useState(currentLevel);
  const { updateLevel } = useTypingSessionActions();

  function onLevelChange(level: number) {
    setSelectedLevel(level);
    updateLevel(level);
  }

  return (
    <div className="text-inactive mx-8 flex flex-col items-start gap-3">
      {levels.map((level) => (
        <LevelSelection
          level={level}
          key={level}
          isSelected={selectedLevel === level}
          onClick={onLevelChange}
        />
      ))}
    </div>
  );
}

function LevelSelection({
  level,
  isSelected,
  onClick,
}: {
  level: number;
  isSelected: boolean;
  onClick: (level: number) => void;
}) {
  return (
    <div
      className={`${isSelected && "bg-foreground text-background"} flex h-8 w-20 cursor-pointer items-center justify-center rounded-xs tracking-wider`}
      onClick={() => onClick(level)}
    >
      {level}
    </div>
  );
}
