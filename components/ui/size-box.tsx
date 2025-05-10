interface Props {
  height?: number;
  width?: number;
  className?: string;
}
export default function SizeBox({ height, width, className }: Props) {
  return (
    <div
      className={className}
      style={{
        height: `${height || 0}px`,
        width: `${width || 0}px`,
      }}
    ></div>
  );
}
