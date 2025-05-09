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
import { createContext, useContext, useEffect, useState } from "react";
import { IconType } from "react-icons";
import { useTypingSessionActions } from "@/hooks/use-typing-session-actions";
import { useTypingMode } from "@/hooks/use-typing-mode";
import { Button } from "@/components/ui/button";

type TypingModeContextType = ReturnType<typeof useTypingMode>;

const TypingModeContext = createContext<TypingModeContextType | undefined>(
  undefined,
);
const useTypingModeContext = () => {
  const context = useContext(TypingModeContext);
  if (!context) {
    throw new Error(
      "useTypingModeContext must be used within TypingModeProvider",
    );
  }
  return context;
};
export function ModeIndicator() {
  const { isTyping, typingGameMode } = useAppSelector(
    (state) => state.typingSessionState,
  );
  const [open, setOpen] = useState(false);
  const typingMode = useTypingMode();
  function generateIcon() {
    if (typingGameMode.currentTypingMode === TypingMode.timed) {
      return FaClock;
    } else if (typingGameMode.currentTypingMode === TypingMode.wordCount) {
      return FaListOl;
    } else if (typingGameMode.currentTypingMode === TypingMode.quote) {
      return FaQuoteLeft;
    } else {
      return FaKeyboard;
    }
  }

  function ModeTrigger() {
    return (
      <div
        className={`flex-col items-center justify-center md:flex ${isTyping && "invisible"}`}
      >
        <div
          className={
            "hover:text-primary flex h-6 cursor-pointer items-center justify-center"
          }
        >
          <Tile
            Icon={generateIcon()}
            title={typingGameMode.currentTypingMode}
          />
          <div className={"text-primary"}>
            <span>
              {typingGameMode.currentTypingMode === TypingMode.timed &&
                (typingGameMode.modeContext as TimedMode).duration}
            </span>
            <span>
              {typingGameMode.currentTypingMode === TypingMode.wordCount &&
                (typingGameMode.modeContext as WordCountMode).count}
            </span>
          </div>
        </div>
        <div className={"relative top-[-8]"}>
          <FaCaretDown />
        </div>
      </div>
    );
  }

  function handleOpenChange(isOpen: boolean) {
    setOpen(isOpen);
  }

  return (
    <TypingModeContext.Provider value={typingMode}>
      <Popover open={open} onOpenChange={handleOpenChange}>
        <PopoverTrigger>{ModeTrigger()}</PopoverTrigger>
        <PopoverContent
          className={
            "bg-card flex w-[90vw] flex-col items-center justify-center rounded-xs md:max-w-[50vw]"
          }
        >
          <ModePanel />
          <Button
            className={
              "text-foreground bg-background cursor-pointer hover:text-white"
            }
            onClick={() => {
              // setOpen(false);
              typingMode.submitChange();
            }}
          >
            xác nhận
          </Button>
        </PopoverContent>
      </Popover>
    </TypingModeContext.Provider>
  );
}

function ModePanel() {
  const [selectedMode, setSelectedMode] = useState(TypingMode.timed);
  const mode = useAppSelector(
    (state) => state.typingSessionState.typingGameMode,
  );

  return (
    <div className={"mb-4 flex w-full justify-around rounded-xs"}>
      <ModeSelections
        selectedMode={selectedMode}
        changeMode={(mode) => setSelectedMode(mode)}
      />
      <div className={"bg-border w-1"}></div>
      <LevelSelections mode={selectedMode} />

      {/*<div className={"flex flex-col items-center justify-center text-nowrap"}>*/}
      {/*  <div>tiếng việt</div>*/}
      {/*  <div>tiếng anh</div>*/}
      {/*</div>*/}
    </div>
  );
}
function ModeSelections({
  selectedMode,
  changeMode,
}: {
  selectedMode: TypingMode;
  changeMode: (mode: TypingMode) => void;
}) {
  const currentMode = useAppSelector(
    (state) => state.typingSessionState.typingGameMode.currentTypingMode,
  );
  const typingMode = useTypingModeContext();

  function onModeChange(mode: TypingMode) {
    changeMode(mode);
    typingMode!.changeMode(mode);
  }

  return (
    <div className="text-inactive flex flex-col items-start gap-3">
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
      className={`${isSelected && "bg-foreground text-background"} hover:bg-foreground/80 flex h-8 w-full cursor-pointer items-center justify-center rounded-xs tracking-wider`}
      onClick={() => onClick(mode)}
    >
      <Tile className={"w-full"} title={mode} Icon={icon} />
    </div>
  );
}

function LevelSelections({ mode }: { mode: TypingMode }) {
  const [selectedLevel, setSelectedLevel] = useState(0);
  const typingMode = useTypingModeContext();

  useEffect(() => {
    if (mode === TypingMode.timed) {
      setSelectedLevel(typingMode.modeInfo.duration);
    } else if (mode === TypingMode.wordCount) {
      setSelectedLevel(typingMode.modeInfo.count);
    }
  }, [mode]);
  function onLevelChange(level: number) {
    if (!typingMode) return;
    setSelectedLevel(level);
    // updateLevel(level);
    typingMode.changeLevel(level, mode);
  }

  function renderLevel() {
    if (mode === TypingMode.timed) {
      return Object.values(TimedModeDuration).map((level) => (
        <LevelSelection
          level={level}
          key={level}
          isSelected={selectedLevel === level}
          onClick={onLevelChange}
        />
      ));
    } else if (mode === TypingMode.wordCount) {
      return Object.values(WordCountQuantity).map((level) => (
        <LevelSelection
          level={level}
          key={level}
          isSelected={selectedLevel === level}
          onClick={onLevelChange}
        />
      ));
    } else {
      return <div className={"ml-1 w-20"}>Không có lựa chọn</div>;
    }
  }

  return (
    <div className="text-inactive mx-8 flex flex-col items-start gap-3">
      {renderLevel()}
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
      className={`${isSelected && "bg-foreground text-background"} hover:bg-foreground/80 ml-1 flex h-8 w-20 cursor-pointer items-center justify-center rounded-xs tracking-wider`}
      onClick={() => onClick(level)}
    >
      {level}
    </div>
  );
}
