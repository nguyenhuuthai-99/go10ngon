import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { IconButton } from "@/components/ui/icon-button";
import { FaBell } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hook";
import { markNotificationAsChecked } from "@/lib/redux/slice/user-settings-slice";

export function NotificationButton() {
  const isNotificationChecked = useAppSelector(
    (state) => state.userSettings.notification.isChecked,
  );
  const dispatch = useAppDispatch();
  function toggleNotification() {
    if (!isNotificationChecked) {
      dispatch(markNotificationAsChecked());
    }
  }
  return (
    <Popover>
      <PopoverTrigger className={"relative"}>
        <IconButton Icon={FaBell} onClick={() => toggleNotification()} />
        {!isNotificationChecked && (
          <span className="absolute top-0 right-0 h-1 w-1 rounded-full bg-red-500"></span>
        )}
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex flex-col">
          <div className="border-border border-b p-4">
            <h3 className="text-lg font-medium">Thông báo</h3>
          </div>

          <div className="flex flex-col">
            {/* Welcome message */}
            <div className="border-border border-b p-4 hover:bg-gray-50">
              <p className="text-sm text-gray-500">
                Chào mừng bạn đến với gõ10ngón
              </p>
            </div>

            {/* Discord invitation */}
            <div className="border-border border-b p-4 hover:bg-gray-50">
              <p className="mb-2 text-sm text-gray-500">
                Tham gia discord để thảo luận, chia sẻ, góp ý và đăng ký ngay
                vào cuộc thử nghiệm kín.
              </p>
              <a
                href="https://discord.gg/CuW2M6cf86"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-blue-600 transition-colors hover:text-blue-800"
              >
                --{">"} Tham gia Discord
              </a>
            </div>

            {/* Error reporting */}
            <div className="p-4 hover:bg-gray-50">
              <p className="text-sm text-gray-500">
                Nếu gặp lỗi báo cáo cho mình ngay để mình fix nhé.
              </p>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
