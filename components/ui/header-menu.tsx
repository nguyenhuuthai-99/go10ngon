"use client";
import { IconButton } from "@/components/ui/icon-button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { toast } from "sonner";
import { ToggleIcon } from "@/components/ui/toggle-icon";
import {
  FaCompressAlt,
  FaExpandArrowsAlt,
  FaPalette,
  FaTrophy,
} from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { DialogTitle, Title } from "@radix-ui/react-dialog";
import UserSettingsSheet from "@/components/ui/user-settings-sheet";
import { Button } from "@/components/ui/button";

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
      {/*<li className="cursor-pointer font-mono">*/}
      {/*  nguyenhuuthai*/}
      {/*  <span className="font-chivo m-0.5 rounded-xs bg-gray-500 px-1 text-white">*/}
      {/*    25*/}
      {/*  </span>*/}
      {/*</li>*/}
      {/*<li>*/}
      {/*  <IconButton Icon={FaTrophy} />*/}
      {/*</li>*/}
      <li>
        <ThemeToggle />
      </li>
      <li>
        <Sheet onOpenChange={(isOpen) => {}}>
          <SheetTrigger>
            <IconButton Icon={FaGear} />
          </SheetTrigger>
          <SheetContent className="overflow-scroll">
            <SheetHeader>
              <SheetTitle className={"text-2xl font-bold"}>Cài đặt</SheetTitle>
              <SheetDescription>Tùy chỉnh theo ý của bạn</SheetDescription>
            </SheetHeader>
            <UserSettingsSheet />
            <SheetFooter className={"flex items-center justify-center"}>
              <SheetClose
                className={
                  "hover:bg-primary h-8 w-24 cursor-pointer rounded-xs bg-gray-500 text-white"
                }
              >
                Lưu
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </li>
      {/*<li>*/}
      {/*  <IconButton Icon={FaPalette} />*/}
      {/*</li>*/}
      <li>
        <ToggleIcon
          firstIcon={FaExpandArrowsAlt}
          secondIcon={FaCompressAlt}
          onClickFirst={expandScreen}
          onClickSecond={exitFullscreen}
        />
      </li>
    </ul>
  );
};
