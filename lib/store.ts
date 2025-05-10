import { configureStore } from "@reduxjs/toolkit";
import typingSessionReducer from "@/lib/redux/slice/typing-session-slice";
import typingSessionPerformanceReducer from "@/lib/redux/slice/typing-session-performance-slice";
import typingSessionStatsReducer from "@/lib/redux/slice/typing-session-stats-slice";
import userSettingsSliceReducer, {
  initialUserSettingState,
  UserSettingsState,
} from "@/lib/redux/slice/user-settings-slice";
export const makeStore = () => {
  return configureStore({
    reducer: {
      typingSessionState: typingSessionReducer,
      typingSessionPerformance: typingSessionPerformanceReducer,
      typingSessionStats: typingSessionStatsReducer,
      userSettings: userSettingsSliceReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
