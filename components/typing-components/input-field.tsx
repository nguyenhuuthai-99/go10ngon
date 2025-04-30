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

type Props = {
  ref: RefObject<HTMLInputElement | null>;
  handleKeyDownCallBack: (
    key: string,
    value: string,
    setInputValue: Dispatch<SetStateAction<string>>,
  ) => void;
};
export default function InputField({ ref, handleKeyDownCallBack }: Props) {
  const [inputValue, setInputValue] = useState("");

  const currentKey = useRef("");
  const currentTimestamp = useRef<number>(0);

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
    console.log(event.target.value);
    if (currentKey.current === " ") {
      setInputValue("");
      currentValue = "";
    } else {
      setInputValue(event.target.value);
      currentValue = event.target.value;
    }
    handleKeyDownCallBack(currentKey.current, currentValue, setInputValue);
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
        setInputValue,
      );
    }
  }

  return (
    <div>
      <input
        ref={ref}
        type="text"
        value={inputValue}
        className="absolute opacity-0"
        onChange={handeInputChange}
        onKeyDown={handleKeyDown}
        autoFocus
      />
    </div>
  );
}

// function handleKeyUp(event: KeyboardEvent<HTMLInputElement>) {
//
//   let currentValue = event.currentTarget.value;
//   if (currentValue.length > 1 && currentValue.slice(-1) === " ") {
//     currentValue = currentValue.slice(0, -1);
//   }
//
//   handleKeyDownCallBack(currentKey.current, currentValue);
//   if (event.key === " ") {
//     onSpaceKeyPress();
//   }
//
// }
// function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
//   currentKey.current = event.key;
// }
