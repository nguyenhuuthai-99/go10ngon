import { ReactNode, Ref } from "react";

type Props = {
  className?: string;
  isResult?: boolean;
  isActive: boolean;
  children?: ReactNode;
  isIncorrect: boolean;
  ref: Ref<HTMLDivElement>;
};

export const WordContainer = ({
  className,
  isActive = false,
  isResult = false,
  isIncorrect,
  children,
  ref,
}: Props) => {
  return (
    <div
      className={`${className} ${isIncorrect && `border-destructive border-b-2`} ${isResult ? "text-gray-600" : "h-11"}`}
      ref={ref}
    >
      {children}
    </div>
  );
};
