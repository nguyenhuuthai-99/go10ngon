import { LeaderboardIcon } from "@/public/assets/icons/leaderboard";
import { ShopIcon } from "@/public/assets/icons/shop";
import {
  BsGearFill,
  BsMoonFill,
  BsMoonStarsFill,
  BsPaletteFill,
  BsSunFill,
  BsTrophyFill,
} from "react-icons/bs";
import { IconButton } from "@/components/ui/icon-button";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export const HeaderMenu = () => {
  return (
    <ul className="flex items-baseline gap-3">
      <li className="cursor-pointer font-mono">
        nguyenhuuthai
        <span className="font-chivo m-0.5 rounded-xs bg-gray-500 px-1 text-white">
          25
        </span>
      </li>
      <li>
        <IconButton Icon={BsTrophyFill} />
      </li>
      <li>
        <ThemeToggle />
      </li>
      <li>
        <IconButton Icon={BsGearFill} />
      </li>
      <li>
        <IconButton Icon={BsPaletteFill} />
      </li>
    </ul>
  );
};
