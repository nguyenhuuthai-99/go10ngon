"use client";
import {
  BsArrowsAngleContract,
  BsArrowsAngleExpand,
  BsGearFill,
  BsMoonFill,
  BsMoonStarsFill,
  BsPaletteFill,
  BsSunFill,
  BsTrophyFill,
} from "react-icons/bs";
import { IconButton } from "@/components/ui/icon-button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { toast } from "sonner";
import { ToggleIcon } from "@/components/ui/toggle-icon";
import { useEffect } from "react";

const expandScreen = () => {
  const elem = document.documentElement;
  if (elem.requestFullscreen) {
    elem.requestFullscreen().catch((err) => {
      toast("Không thể bật chế độ toàn màn hình", {
        description: "Có lỗi xảy ra!!! thử lại hoặc đổi qua trình duyệt khác",
        duration: 1000,
      });
    });
  } else if ((elem as any).webkitRequestFullscreen) {
    (elem as any).webkitRequestFullscreen();
  } else if ((elem as any).msRequestFullscreen) {
    (elem as any).msRequestFullscreen();
  }
};

const exitFullscreen = () => {
  const doc = document as Document & {
    webkitExitFullscreen?: () => Promise<void>;
    msExitFullscreen?: () => Promise<void>;
  };

  if (document.fullscreenElement) {
    document
      .exitFullscreen()
      .then(() => {
        console.log("Exited fullscreen");
      })
      .catch((err) => {
        console.error("Error exiting fullscreen:", err);
      });
  } else if (doc.webkitExitFullscreen) {
    doc.webkitExitFullscreen();
  } else if (doc.msExitFullscreen) {
    doc.msExitFullscreen();
  }
};

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
      <li>
        <ToggleIcon
          firstIcon={BsArrowsAngleExpand}
          secondIcon={BsArrowsAngleContract}
          onClickFirst={expandScreen}
          onClickSecond={exitFullscreen}
        />
      </li>
    </ul>
  );
};
