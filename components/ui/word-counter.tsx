type Props = {
  count: number;
  visible: boolean;
};
export function WordCounter({ count, visible }: Props) {
  return (
    <div
      className={`${!visible && "hidden"} text-center text-2xl text-blue-800`}
    >
      {count}
    </div>
  );
}
