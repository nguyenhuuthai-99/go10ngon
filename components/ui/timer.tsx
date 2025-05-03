import { useTimer } from "@/hooks/useTimer";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hook";
import { decrement, increment, incrementByAmount } from "@/slice/count-slice";

type Props = {
  remainingTime: number;
};
export function Timer({ remainingTime }: Props) {
  const count = useAppSelector((state) => state.counter.count);
  const dispatch = useAppDispatch();

  return (
    <div className={`text-primary text-center text-2xl`}>
      {remainingTime}
      <div>{count}</div>
      <button onClick={() => dispatch(decrement())}>click me</button>
    </div>
  );
}
