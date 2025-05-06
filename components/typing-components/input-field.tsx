import {
  ChangeEvent,
  Dispatch,
  KeyboardEvent,
  RefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { useAppSelector } from "@/hooks/redux-hook";

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

  const showInputField = useAppSelector(
    (state) => state.userSettings.appearance.showInputField,
  );

  // focus input on mount
  useEffect(() => {
    ref.current?.focus();

    //refocus if it loses focus
    const interval = setInterval(() => {
      if (document.activeElement !== ref.current) {
        ref.current?.focus();
      }
    }, 100);

    return () => clearInterval(interval);
  }, [ref]);

  function handeInputChange(event: ChangeEvent<HTMLInputElement>) {
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

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    currentKey.current = event.key;
    currentTimestamp.current = event.timeStamp;

    onBackspaceEmptyInput(event);
  }

  function onBackspaceEmptyInput(event: KeyboardEvent<HTMLInputElement>) {
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
    <div>
      <input
        readOnly={isTypingSessionEnd}
        ref={ref}
        type="text"
        value={inputValue}
        className={`absolute ${!showInputField && "opacity-0"}`}
        onChange={handeInputChange}
        onKeyDown={handleKeyDown}
        autoFocus
      />
    </div>
  );
}
