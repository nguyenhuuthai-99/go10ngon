interface Props {
  height?: number;
  width?: number;
}
export default function SizeBox({ height, width }: Props) {
  return (
    <div
      style={{
        height: `${height || 0}px`,
        width: `${width || 0}px`,
      }}
    ></div>
  );
}
