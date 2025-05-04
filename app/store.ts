import { configureStore } from "@reduxjs/toolkit";
import typingSessionReducer from "@/slice/typing-session-slice";
import typingSessionPerformanceReducer from "@/slice/typing-session-performance-slice";
import typingSessionStatsReducer from "@/slice/typing-session-stats-slice";
import userSettingsSliceReducer from "@/slice/user-settings-slice";
export const store = configureStore({
  reducer: {
    typingSessionState: typingSessionReducer,
    typingSessionPerformance: typingSessionPerformanceReducer,
    typingSessionStats: typingSessionStatsReducer,
    userSettings: userSettingsSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
