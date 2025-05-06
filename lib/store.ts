import { configureStore } from "@reduxjs/toolkit";
import typingSessionReducer from "@/lib/feature/slice/typing-session-slice";
import typingSessionStoreReducer from "@/lib/feature/slice/typing-session-store-slice";
import typingSessionPerformanceReducer from "@/lib/feature/slice/typing-session-performance-slice";
import typingSessionStatsReducer from "@/lib/feature/slice/typing-session-stats-slice";
import userSettingsSliceReducer from "@/lib/feature/slice/user-settings-slice";
export const makeStore = () => {
  return configureStore({
    reducer: {
      typingSessionState: typingSessionReducer,
      typingSessionStore: typingSessionStoreReducer,
      typingSessionPerformance: typingSessionPerformanceReducer,
      typingSessionStats: typingSessionStatsReducer,
      userSettings: userSettingsSliceReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
