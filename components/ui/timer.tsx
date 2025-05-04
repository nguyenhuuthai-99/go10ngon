type Props = {
  remainingTime: number;
};
export function Timer({ remainingTime }: Props) {
  return (
    <div className={`text-primary text-center text-2xl`}>{remainingTime}</div>
  );
}
