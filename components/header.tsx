import Logo from "@/public/assets/logo";
import { DarkModeIcon } from "@/public/assets/icons/dark";
import { LeaderboardIcon } from "@/public/assets/icons/leaderboard";
import { ShopIcon } from "@/public/assets/icons/shop";

export default function Header() {
  return (
    <div className="flex items-center justify-between px-8 py-4">
      <Logo className="flex-shrink-0" />
      <ul className="flex items-baseline gap-3">
        <li className="font-mono">
          nguyenhuuthai
          <span className="font-chivo m-0.5 rounded-xs bg-gray-500 px-1 text-white">
            25
          </span>
        </li>
        <li>
          <LeaderboardIcon />
        </li>
        <li>
          <ShopIcon />
        </li>
        <li>
          <DarkModeIcon width={30} height={30} className={"fill-blue-950"} />
        </li>
      </ul>
    </div>
  );
}
