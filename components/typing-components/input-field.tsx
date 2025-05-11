import { ChangeEvent, RefObject, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hook";
import { updateIME } from "@/lib/redux/slice/typing-session-slice";
import { useTypingSessionActions } from "@/hooks/use-typing-session-actions";

type Props = {
  isTypingSessionEnd: boolean;
  ref: RefObject<HTMLInputElement | null>;
  handleKeyDownCallBack: (
    key: string,
    value: string,
    timestamp: number,
    restoreInputValue: (value: string) => void,
  ) => void;
};
export default function InputField({
  isTypingSessionEnd,
  ref,
  handleKeyDownCallBack,
}: Props) {
  const [inputValue, setInputValue] = useState("");

  const currentKey = useRef("");
  const currentTimestamp = useRef<number>(0);
  const isIME = useAppSelector((state) => state.typingSessionState.isIME);
  const dispatch = useAppDispatch();
  const { refreshSession, restartSession } = useTypingSessionActions();

  const showInputField = useAppSelector(
    (state) => state.userSettings.appearance.showInputField,
  );

  const isStarted = useAppSelector(
    (state) => state.typingSessionState.isStarted,
  );

  useEffect(() => {
    window.addEventListener("keydown", onTypingSessionActions);

    return () => {
      window.removeEventListener("keydown", onTypingSessionActions);
    };
  }, []);

  useEffect(() => {
    if (isStarted) return;
    setInputValue("");
  }, [isStarted]);

  function handeInputChange(event: ChangeEvent<HTMLInputElement>) {
    console.log(inputValue, event.target.value);
    let currentValue;
    if (currentKey.current === " ") {
      setInputValue("");
      currentValue = "";
    } else {
      setInputValue(event.target.value);
      currentValue = event.target.value;
    }
    handleKeyDownCallBack(
      currentKey.current,
      currentValue,
      currentTimestamp.current,
      restoreInputValue,
    );
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    currentKey.current = event.key;
    currentTimestamp.current = event.timeStamp;
    onBackspaceEmptyInput(event);
  }

  function onTypingSessionActions(event: KeyboardEvent) {
    if (event.ctrlKey && event.key === " ") {
      restartSession();
      setInputValue("");
    } else if (event.ctrlKey && event.key === "Enter") {
      refreshSession();
      setInputValue("");
    }
  }
  function onBackspaceEmptyInput(event: React.KeyboardEvent<HTMLInputElement>) {
    if (currentKey.current === "Backspace" && inputValue === "") {
      event.preventDefault();
      handleKeyDownCallBack(
        event.key,
        event.currentTarget.value,
        currentTimestamp.current,
        restoreInputValue,
      );
    }
  }

  function restoreInputValue(value: string) {
    setInputValue(value);
  }

  return (
    <div className={"flex w-full items-center justify-center"}>
      <input
        readOnly={isTypingSessionEnd}
        ref={ref}
        type="text"
        value={inputValue}
        className={`absolute ${!showInputField && "opacity-0"}`}
        onChange={handeInputChange}
        onCompositionStart={() => {
          if (!isIME) {
            dispatch(updateIME(true));
          }
        }}
        onKeyDown={handleKeyDown}
        autoFocus
      />
    </div>
  );
}
