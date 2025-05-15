import { ChangeEvent, RefObject, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hook";
import {
  clearResetInputFlag,
  updateIME,
} from "@/lib/redux/slice/typing-session-slice";
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
  const timeOut = useRef<NodeJS.Timeout>(null);

  const showInputField = useAppSelector(
    (state) => state.userSettings.appearance.showInputField,
  );
  const isComposing = useRef(false);
  const shouldResetInput = useAppSelector(
    (state) => state.typingSessionState.shouldResetInput,
  );

  function resetInputOnComposing(): void {
    if (shouldResetInput) {
      if (isComposing.current) {
        requestAnimationFrame(() => {
          setInputValue("");
          dispatch(clearResetInputFlag());
        });
      } else {
        setInputValue("");
        dispatch(clearResetInputFlag());
      }
      return;
    }
  }
  function handeInputChange(event: ChangeEvent<HTMLInputElement>) {
    resetInputOnComposing();
    if (currentKey.current === " ") {
      setInputValue("");
      handleKeyDownCallBack(
        currentKey.current,
        "",
        currentTimestamp.current,
        restoreInputValue,
      );
      return;
    } else {
      setInputValue(event.target.value);
    }

    if (timeOut.current !== null) clearTimeout(timeOut.current);
    timeOut.current = setTimeout(() => {
      handleKeyDownCallBack(
        currentKey.current,
        event.target.value,
        currentTimestamp.current,
        restoreInputValue,
      );
    }, 15);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (timeOut.current) clearTimeout(timeOut.current);
    currentKey.current = event.key;
    currentTimestamp.current = event.timeStamp;
    onBackspaceEmptyInput(event);
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
        autoCapitalize="off"
        readOnly={isTypingSessionEnd}
        ref={ref}
        type="text"
        value={inputValue}
        className={`absolute ${!showInputField && "opacity-0"}`}
        onChange={handeInputChange}
        onCompositionStart={() => {
          if (!isIME) {
            dispatch(updateIME(true));
            isComposing.current = true;
          }
        }}
        onCompositionEnd={() => {
          isComposing.current = false;
        }}
        onKeyDown={handleKeyDown}
        autoFocus
      />
    </div>
  );
}
