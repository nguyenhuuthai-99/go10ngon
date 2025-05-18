"use client";
import FullLogo from "@/public/assets/fullLogo";
import { HeaderMenu } from "@/components/ui/header-menu";
import Link from "next/link";
import { useTypingSessionActions } from "@/hooks/use-typing-session-actions";
import { IconLogo } from "@/components/ui/icon_logo";

export default function Header({ className }: { className?: string }) {
  const { refreshSession } = useTypingSessionActions();
  function onLogoClick() {
    refreshSession();
  }
  return (
    <div className={`flex w-full items-center px-8 py-4 ${className}`}>
      <Link href="/" onClick={onLogoClick}>
        <FullLogo
          className={"hidden w-[50vw] max-w-[280px] object-contain sm:block"}
        />
        <IconLogo className={"block object-contain sm:hidden"} />
      </Link>
      <div className="grow"></div>
      <HeaderMenu />
    </div>
  );
}
