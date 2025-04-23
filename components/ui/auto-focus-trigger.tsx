export default function AutoFocusTrigger() {
  return (
    <input
      type="text"
      className="absolute opacity-0"
      autoFocus
      onKeyDown={(e) => console.log("Key:", e.key)}
    />
  );
}
