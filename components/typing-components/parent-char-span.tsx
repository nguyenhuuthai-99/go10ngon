type Props = {
  char: string;
};

export function ParentCharSpan({ char }: Props) {
  return <span className={`text-primary absolute`}>{char}</span>;
}
