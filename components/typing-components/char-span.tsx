import { FC, memo, Ref, useMemo } from "react";
import { ParentCharSpan } from "@/components/typing-components/parent-char-span";
import { isInParentMap, isParent } from "@/lib/utils";

interface CharSpanProps {
  char: string;
  typedChar: string | null;
  isActive: boolean;
  ref: Ref<HTMLSpanElement>;
}

const CharSpan = memo(({ char, typedChar, isActive, ref }: CharSpanProps) => {
  const { parent, className } = useMemo(() => {
    let result = { parent: null as string | null, className: "" };

    if (typedChar) {
      if (typedChar === char) {
        result.className = "text-primary";
      } else if (isInParentMap(char) && isParent(char, typedChar)) {
        result.parent = typedChar;
        result.className = "text-yellow-600";
      } else {
        result.className = "text-red-500";
      }
    }

    return result;
  }, [char, typedChar]);

  return (
    <span
      ref={ref}
      className={`relative ml-[0.1rem] whitespace-pre ${className}`}
    >
      {parent && <ParentCharSpan char={parent} />}
      {char}
    </span>
  );
});

export default CharSpan;
