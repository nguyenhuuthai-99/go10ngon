import {
  ChangeEvent,
  KeyboardEvent,
  RefObject,
  useEffect,
  useState,
} from "react";

type Props = {
  ref: RefObject<HTMLInputElement | null>;
  handleKeyDown: (key: string, value: string) => void;
};
export default function AutoFocusTrigger({ ref, handleKeyDown }: Props) {
  const [inputValue, setInputValue] = useState("");

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
  });

  function handeInputChange(event: ChangeEvent<HTMLInputElement>) {
    setInputValue(event.target.value);
  }

  function handelKeyPress(event: KeyboardEvent<HTMLInputElement>) {
    handleKeyDown(event.key, inputValue);
    if (event.key === " ") {
      onSpaceKeyPress();
    }
  }

  function onSpaceKeyPress() {
    setInputValue("");
  }

  return (
    <input
      ref={ref}
      type="text"
      value={inputValue}
      className="absolute opacity-0"
      onChange={handeInputChange}
      autoFocus
      onKeyUp={handelKeyPress}
    />
  );
}
