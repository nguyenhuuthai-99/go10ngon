export function DarkModeIcon({
  width,
  height,
  className,
}: {
  width: number;
  height: number;
  className: string;
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className={className}
        d="M13.9688 0.5C6.25 0.5 0 6.76875 0 14.5C0 22.2313 6.25 28.5 13.9688 28.5C17.7563 28.5 21.1875 26.9875 23.7062 24.5375C24.0187 24.2313 24.1 23.7563 23.9 23.3687C23.7 22.9812 23.2687 22.7625 22.8375 22.8375C22.225 22.9438 21.6 23 20.9562 23C14.9 23 9.9875 18.075 9.9875 12C9.9875 7.8875 12.2375 4.30625 15.5688 2.41875C15.95 2.2 16.1437 1.7625 16.05 1.3375C15.9562 0.9125 15.5938 0.59375 15.1562 0.55625C14.7625 0.525 14.3687 0.50625 13.9688 0.50625V0.5Z"
        fill="none"
      />
    </svg>
  );
}
