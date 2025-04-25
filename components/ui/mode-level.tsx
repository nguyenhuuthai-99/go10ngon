interface Props {
  levels: string[];
}
export function ModeLevel({ levels }: Props) {
  return (
    <div className={"ml-8 flex items-center"}>
      {levels.map((level) => (
        <span className={"mr-8"} key={level}>
          {level}
        </span>
      ))}
    </div>
  );
}
