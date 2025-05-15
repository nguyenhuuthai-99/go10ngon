"use client";
import Logo from "@/public/assets/logo";
import { HeaderMenu } from "@/components/ui/header-menu";
import Link from "next/link";
import { Space } from "lucide-react";
import { useTypingSessionActions } from "@/hooks/use-typing-session-actions";

export default function Header({ className }: { className?: string }) {
  const { refreshSession } = useTypingSessionActions();
  function onLogoClick() {
    refreshSession();
  }
  return (
    <div className={`flex w-full items-center px-8 py-4 ${className}`}>
      <Link href="/" onClick={onLogoClick}>
        <Logo className={"w-[50vw] max-w-[280px] object-contain"} />
      </Link>
      <div className="grow"></div>
      <HeaderMenu />
    </div>
  );
}
