import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { IconButton } from "@/components/ui/icon-button";
import { BsMoonStarsFill, BsSunFill } from "react-icons/bs";
import { IconType } from "react-icons";

interface Props {
  firstIcon: IconType;
  secondIcon: IconType;
  onClickFirst: () => void;
  onClickSecond: () => void;
}
export function ToggleIcon({
  firstIcon,
  secondIcon,
  onClickFirst,
  onClickSecond,
}: Props) {
  const [icon, setIcon] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  function toggleIcon() {
    if (icon === 0) {
      setIcon(1);
    } else {
      setIcon(0);
    }
  }

  if (!mounted) return null; // prevent hydration mismatch

  return icon === 0 ? (
    <IconButton
      Icon={firstIcon}
      onClick={() => {
        onClickFirst();
        toggleIcon();
      }}
    />
  ) : (
    <IconButton
      Icon={secondIcon}
      onClick={() => {
        onClickSecond();
        toggleIcon();
      }}
    />
  );
}
