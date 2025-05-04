import { TypingMode } from "@/model/typing-mode";
import { useState } from "react";

interface Props {
  selected: TypingMode;
}
export function useModeController({ selectedMode = TypingMode.timed }) {
  const [mode, setMode] = useState<TypingMode>(selectedMode);
}
