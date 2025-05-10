import { IconType } from "react-icons";

interface Props {
  Icon: IconType;
  onClick?: () => void;
}

export const IconButton = ({ Icon, onClick }: Props) => {
  return (
    <Icon
      onClick={onClick}
      className="fill-muted-foreground hover:fill-primary cursor-pointer"
    ></Icon>
  );
};
