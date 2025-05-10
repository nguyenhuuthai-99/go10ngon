// import {ReactElement} from "react";

import { ReactElement } from "react";
import { IconType } from "react-icons";

export default function Tile({
  className,
  Icon,
  title,
  onClick,
}: {
  Icon: IconType;
  title: string;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <div className={`${className} mx-4 my-2 flex items-center text-nowrap`}>
      <Icon onClick={onClick} />
      <span className={"ml-2"}>{title}</span>
    </div>
  );
}
