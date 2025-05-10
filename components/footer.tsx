import { IconButton } from "@/components/ui/icon-button";
import {
  FaBug,
  FaDiscord,
  FaFacebook,
  FaFacebookSquare,
  FaInstagram,
  FaInstagramSquare,
  FaTiktok,
} from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaSquareThreads, FaThreads } from "react-icons/fa6";
import Link from "next/link";

function BugButton() {
  // @ts-ignore
  // @ts-ignore
  return (
    <Dialog>
      <DialogTrigger>
        <IconButton Icon={FaBug} />
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Báo cáo lỗi và góp ý</DialogTitle>
        <div>
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLScXz98BRC6ddjP4pJIh0iTxoLrw1MoKiK7n7iTpvV_3Td-2cA/viewform?embedded=true"
            width="600"
            height="500"
            frameBorder="0"
            marginHeight={0}
            marginWidth={0}
          >
            Loading...
          </iframe>{" "}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function Footer({ className }: { className?: string }) {
  return (
    <div
      className={`flex w-full items-center justify-between gap-3 px-8 pb-4 ${className}`}
    >
      <div className="flex gap-3">
        <Link
          target="_blank"
          rel="noopener noreferrer"
          href={"https://www.facebook.com/groups/go10ngon/"}
        >
          <IconButton Icon={FaFacebookSquare} />
        </Link>
        <Link
          target="_blank"
          rel="noopener noreferrer"
          href={"https://www.instagram.com/go10ngon/"}
        >
          <IconButton Icon={FaInstagramSquare} />
        </Link>
        <Link
          target="_blank"
          rel="noopener noreferrer"
          href={"https://www.threads.com/@go10ngon"}
        >
          <IconButton Icon={FaSquareThreads} />
        </Link>{" "}
        <Link
          target="_blank"
          rel="noopener noreferrer"
          href={"https://www.tiktok.com/@go10ngon.net"}
        >
          <IconButton Icon={FaTiktok} />
        </Link>
        <Link
          target="_blank"
          rel="noopener noreferrer"
          href={"https://discord.gg/CuW2M6cf86"}
        >
          <IconButton Icon={FaDiscord} />
        </Link>
      </div>
      <div className={"flex gap-3"}>
        <BugButton />
        <div>v1.0.0</div>
      </div>
    </div>
  );
}
