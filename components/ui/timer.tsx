type Props = {
  time: number;
  visible: boolean;
};
export function Timer({ time, visible }: Props) {
  return (
    <div
      className={`${!visible && "hidden"} text-center text-2xl text-blue-800`}
    >
      {time}
    </div>
  );
}
