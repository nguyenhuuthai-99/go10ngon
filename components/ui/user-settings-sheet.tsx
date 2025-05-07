import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Monitor,
  Moon,
  Sun,
  LayoutGrid,
  Type,
  Settings,
  Eye,
} from "lucide-react";
import {
  initialUserSettingState,
  Theme,
  CaretSpeed,
  CaretSize,
  CaretShape,
  UserSettingsState,
  applySettings,
} from "@/lib/redux/slice/user-settings-slice";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hook";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FaAdjust, FaEye, FaICursor, FaMoon, FaSun } from "react-icons/fa";
import { FaA, FaI } from "react-icons/fa6";
export default function UserSettingsSheet() {
  const dispatch = useAppDispatch();
  const settings = useAppSelector((state) => state.userSettings);

  useEffect(() => {
    dispatch(applySettings(settings));
    console.log("settings change");
  }, [settings]);
  // Helper function to update settings
  const updateSettings = (
    category: "appearance" | "caret",
    setting: string,
    value: string | boolean,
  ) => {
    dispatch(
      applySettings({
        ...settings,
        [category]: {
          ...settings[category],
          [setting]: value,
        },
      }),
    );
  };

  return (
    <div className="mx-auto w-full max-w-3xl space-y-8 rounded-lg bg-white p-6 shadow dark:bg-gray-950">
      <Tabs defaultValue="appearance" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <FaEye className="h-4 w-4" />
            <span>Giao diện</span>
          </TabsTrigger>
          <TabsTrigger value="caret" className="flex items-center gap-2">
            <FaICursor className="h-4 w-4" />
            <span>Con trỏ</span>
          </TabsTrigger>
        </TabsList>

        {/* Appearance Settings */}
        <TabsContent value="appearance" className="space-y-6 pt-4">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Cài đặt theme</h3>
            <Separator />

            <div className="grid grid-cols-1 gap-6">
              {/* Theme Selector */}
              <div className="space-y-2">
                <Label htmlFor="theme">Theme</Label>
                <Select
                  value={settings.appearance.theme}
                  onValueChange={(value) =>
                    updateSettings("appearance", "theme", value)
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <div className="flex items-center justify-between px-2 py-1.5">
                      <SelectItem value={Theme.light}>
                        <div className="flex items-center gap-2">
                          <FaSun className="h-4 w-4" />
                          <span>Sáng</span>
                        </div>
                      </SelectItem>
                    </div>
                    <div className="flex items-center justify-between px-2 py-1.5">
                      <SelectItem value={Theme.dark}>
                        <div className="flex items-center gap-2">
                          <FaMoon className="h-4 w-4" />
                          <span>Tối</span>
                        </div>
                      </SelectItem>
                    </div>
                    <div className="flex items-center justify-between px-2 py-1.5">
                      <SelectItem value={Theme.auto}>
                        <div className="flex items-center gap-2">
                          <FaAdjust className="h-4 w-4" />
                          <span>Tự động</span>
                        </div>
                      </SelectItem>
                    </div>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Giao diện chung</h3>
            <Separator />

            <div className="grid grid-cols-1 gap-6">
              {/* Show Performance HUD */}
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="showPerformanceHUD">Hiển thị hiệu suất</Label>
                  <p className="text-sm text-gray-500">
                    Tốc độ và độ chính xác của bạn theo thời gian thực
                  </p>
                </div>
                <Switch
                  id="showPerformanceHUD"
                  checked={settings.appearance.showPerformanceHUD}
                  onCheckedChange={(checked) =>
                    updateSettings("appearance", "showPerformanceHUD", checked)
                  }
                />
              </div>

              {/* Show Keyboard */}
              {/*<div className="flex items-center justify-between">*/}
              {/*  <div className="space-y-0.5">*/}
              {/*    <Label htmlFor="showKeyBoard">Hiển thị bàn phím</Label>*/}
              {/*    <p className="text-sm text-gray-500">*/}
              {/*      Bàn phím ảo phía dưới vùng gõ chữ*/}
              {/*    </p>*/}
              {/*  </div>*/}
              {/*  <Switch*/}
              {/*    id="showKeyBoard"*/}
              {/*    checked={settings.appearance.showKeyBoard}*/}
              {/*    onCheckedChange={(checked) =>*/}
              {/*      updateSettings("appearance", "showKeyBoard", checked)*/}
              {/*    }*/}
              {/*  />*/}
              {/*</div>*/}

              {/* Show Typing Preview */}
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="showTypingPreview">Hiển thị đối chiếu</Label>
                  <p className="text-sm text-gray-500">
                    Cửa sổ đối chiếu dưới con trỏ văn bản
                  </p>
                </div>
                <Switch
                  id="showTypingPreview"
                  checked={settings.appearance.showTypingPreview}
                  onCheckedChange={(checked) =>
                    updateSettings("appearance", "showTypingPreview", checked)
                  }
                />
              </div>

              {/* Show Input Field */}
              {/*<div className="flex items-center justify-between">*/}
              {/*  <div className="space-y-0.5">*/}
              {/*    <Label htmlFor="showInputField">*/}
              {/*      Hiển thị vùng nhập liệu*/}
              {/*    </Label>*/}
              {/*    <p className="text-sm text-gray-500">*/}
              {/*      Vùng nhập liệu riêng biệt*/}
              {/*    </p>*/}
              {/*  </div>*/}
              {/*  <Switch*/}
              {/*    id="showInputField"*/}
              {/*    checked={settings.appearance.showInputField}*/}
              {/*    onCheckedChange={(checked) =>*/}
              {/*      updateSettings("appearance", "showInputField", checked)*/}
              {/*    }*/}
              {/*  />*/}
              {/*</div>*/}

              {/* Mark Parent */}
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="markParent">Đánh dấu chữ khiếm khuyết</Label>
                  <p className="text-sm text-gray-500">
                    Làm nổi bật từ chưa hoàn thành
                  </p>
                </div>
                <Switch
                  id="markParent"
                  checked={settings.appearance.markParent}
                  onCheckedChange={(checked) =>
                    updateSettings("appearance", "markParent", checked)
                  }
                />
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Caret Settings */}
        <TabsContent value="caret" className="space-y-6 pt-4">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Tùy chỉnh con trỏ</h3>
            <Separator />

            <div className="grid grid-cols-1 gap-6">
              {/* Caret Speed */}
              <div className="space-y-2">
                <Label htmlFor="caretSpeed">Tốc độ con trỏ</Label>
                <Select
                  value={settings.caret.speed}
                  onValueChange={(value) =>
                    updateSettings("caret", "speed", value)
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select speed" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={CaretSpeed.off}>Tắt</SelectItem>
                    <SelectItem value={CaretSpeed.slow}>Chậm</SelectItem>
                    <SelectItem value={CaretSpeed.medium}>Vừa</SelectItem>
                    <SelectItem value={CaretSpeed.fast}>Nhanh</SelectItem>
                    <SelectItem value={CaretSpeed.supperFast}>
                      Siêu nhanh
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Caret Shape */}
              <div className="space-y-2">
                <Label htmlFor="caretShape">Kiểu con trỏ</Label>
                <Select
                  value={settings.caret.shape}
                  onValueChange={(value) =>
                    updateSettings("caret", "shape", value)
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select shape" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={CaretShape.line}>Chữ I</SelectItem>
                    <SelectItem value={CaretShape.box}>Hộp</SelectItem>
                    <SelectItem value={CaretShape.underline}>
                      Gạch chân
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Caret Size */}
              <div className="space-y-2">
                <Label htmlFor="caretSize">Độ dày</Label>
                <p>Áp dụng cho con trỏ chữ I</p>
                <Select
                  value={settings.caret.size}
                  onValueChange={(value) =>
                    updateSettings("caret", "size", value)
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={CaretSize.small}>Mỏng</SelectItem>
                    <SelectItem value={CaretSize.medium}>Vừa</SelectItem>
                    <SelectItem value={CaretSize.large}>Dày</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
