import { memo, ReactNode } from "react";

type Props = {
  isActive: boolean;
  children?: ReactNode;
};

export const WordContainer = memo(({ isActive = false, children }: Props) => {
  return <div>{children}</div>;
});
