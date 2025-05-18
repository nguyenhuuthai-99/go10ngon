import { UserState } from "@/lib/redux/slice/user-authentication-slice";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { logOut } from "@/lib/infrastructure/api/services/userService";

export function UserHud({ auth }: { auth: UserState }) {
  async function handleLogout() {
    await logOut();
  }
  return (
    <Popover>
      <PopoverTrigger>
        <div className="hover:text-primary flex cursor-pointer items-center justify-center">
          <div>{auth.username}</div>
          <div
            className={
              "text-foreground ml-1 rounded-xs bg-gray-600 px-1.5 leading-4"
            }
          >
            {auth.wpm}
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent>
        <div
          className={"hover:text-primary cursor-pointer"}
          onClick={handleLogout}
        >
          đăng xuất
        </div>
      </PopoverContent>
    </Popover>
  );
}
