import { FC, memo, Ref, useMemo } from "react";
import { ParentCharSpan } from "@/components/typing-components/parent-char-span";
import { hasParent, isParent } from "@/lib/utils";
import { useAppSelector } from "@/hooks/redux-hook";

interface CharSpanProps {
  char: string;
  typedChar: string | null;
  isActive: boolean;
  isResult?: boolean;
  ref: Ref<HTMLSpanElement>;
}

const CharSpan = memo(
  ({ char, typedChar, ref, isResult = false }: CharSpanProps) => {
    const markParent = useAppSelector(
      (state) => state.userSettings.appearance.markParent,
    );

    const { parent, className } = useMemo(() => {
      let result = { parent: null as string | null, className: "" };

      if (typedChar) {
        if (typedChar === char) {
          result.className = "text-foreground";
        } else if (hasParent(char) && isParent(char, typedChar)[0]) {
          result.parent = typedChar;
          if (markParent) result.className = "text-yellow-600";
        } else if (typedChar === "extra") {
          result.className = "text-destructive/55";
        } else {
          result.className = "text-destructive";
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
        {isResult ? typedChar : char}
      </span>
    );
  },
);

export default CharSpan;
