import { useAppDispatch, useAppSelector } from "@/hooks/redux-hook";
import { useEffect, useRef } from "react";
import {
  applySettings,
  UserSettingsState,
} from "@/lib/redux/slice/user-settings-slice";

const USER_SETTINGS_KEY = "user-settings";
export function useUserSettings() {
  const userSettings = useAppSelector((state) => state.userSettings);
  const dispatch = useAppDispatch();
  const hasLoadedRef = useRef(false);

  // Load settings from localStorage only once
  useEffect(() => {
    if (hasLoadedRef.current) return;
    hasLoadedRef.current = true;

    try {
      const saved = localStorage.getItem(USER_SETTINGS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as UserSettingsState;
        dispatch(applySettings(parsed));
      }
    } catch (error) {
      console.error("Failed to load user settings:", error);
    }
  }, [dispatch]);

  // Save settings to localStorage on change
  useEffect(() => {
    if (!hasLoadedRef.current) return;
    try {
      localStorage.setItem(USER_SETTINGS_KEY, JSON.stringify(userSettings));
    } catch (error) {
      console.error("Failed to save user settings:", error);
    }
  }, [userSettings]);

  return userSettings;
}
