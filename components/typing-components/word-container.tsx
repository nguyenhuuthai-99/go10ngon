import { memo, ReactNode, Ref } from "react";

type Props = {
  isActive: boolean;
  children?: ReactNode;
  ref: Ref<HTMLDivElement>;
};

export const WordContainer = memo(
  ({ isActive = false, children, ref }: Props) => {
    return <div ref={ref}>{children}</div>;
  },
);
