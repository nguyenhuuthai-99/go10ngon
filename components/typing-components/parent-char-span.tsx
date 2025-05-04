type Props = {
  char: string;
};

export function ParentCharSpan({ char }: Props) {
  return <span className={`text-foreground absolute`}>{char}</span>;
}
