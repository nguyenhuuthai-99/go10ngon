type Props = {
  count: number;
};
export function WordCounter({ count }: Props) {
  return <div className={`text-center text-2xl text-blue-800`}>{count}</div>;
}
