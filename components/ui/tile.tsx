// import {ReactElement} from "react";

import { ReactElement } from "react";

export default function Tile({
  icon,
  title,
}: {
  icon: ReactElement;
  title: string;
}) {
  return (
    <div className="mx-4 my-2 flex">
      {icon}
      <span className={"ml-2"}>{title}</span>
    </div>
  );
}
