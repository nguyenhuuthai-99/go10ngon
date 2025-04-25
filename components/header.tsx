import Logo from "@/public/assets/logo";
import { HeaderMenu } from "@/components/ui/header-menu";

export default function Header() {
  return (
    <div className="flex items-center justify-between px-8 py-4">
      <Logo className={"w-[50vw] max-w-[280px] object-contain"} />
      <HeaderMenu />
    </div>
  );
}
