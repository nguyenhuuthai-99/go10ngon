import Logo from "@/public/assets/logo";
import { HeaderMenu } from "@/components/ui/header-menu";
import Link from "next/link";
import { Space } from "lucide-react";

export default function Header({ className }: { className?: string }) {
  return (
    <div className={`flex w-full items-center px-8 py-4 ${className}`}>
      <Link href="/">
        <Logo className={"w-[50vw] max-w-[280px] object-contain"} />
      </Link>
      <div className="grow"></div>
      <HeaderMenu />
    </div>
  );
}
