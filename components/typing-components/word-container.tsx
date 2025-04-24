import { memo, ReactNode } from "react";

type Props = {
  isActive: boolean;
  children?: ReactNode;
};

export const WordContainer = memo(({ isActive = false, children }: Props) => {
  return <div className="relative mx-2">{children}</div>;
});
