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
import { getBindingIdentifiers } from "@babel/types";
import keys = getBindingIdentifiers.keys;

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
  const [inputSet, setInputSet] = useState<Set<string>>();
  const currentKey = useRef<string>("");

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
    setInputValue(event.target.value);
  }

  function handleKeyUp(event: KeyboardEvent<HTMLInputElement>) {
    if (inputSet?.has("Backspace") && inputSet?.size > 1) {
      setInputSet(new Set<string>());
      return;
    }

    let currentValue = event.currentTarget.value;
    if (currentValue.length > 1 && currentValue.slice(-1) === " ") {
      currentValue = currentValue.slice(0, -1);
    }

    handleKeyDownCallBack(currentKey.current, currentValue, setInputValue);
    if (event.key === " ") {
      onSpaceKeyPress();
    }

    setInputSet(new Set<string>());
  }
  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    currentKey.current = event.key;
    setInputSet((prevState) => {
      return new Set<string>(prevState).add(event.key);
    });
  }

  function onSpaceKeyPress() {
    setInputValue("");
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
        onKeyUpCapture={handleKeyUp}
        autoFocus
      />
    </div>
  );
}
