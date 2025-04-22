type Props = {
  visible: boolean;
  reference?: string;
};
export function Citation({ visible, reference }: Props) {
  return (
    <div
      className={`${visible ? "visible" : "invisible"} w-full text-end font-light text-gray-500 italic`}
    >
      {reference ? `nguồn: ${reference} ` : ""}
    </div>
  );
}
