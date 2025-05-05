import { configureStore } from "@reduxjs/toolkit";
import typingSessionReducer from "@/slice/typing-session-slice";
import typingSessionStoreReducer from "@/slice/typing-session-store-slice";
import typingSessionPerformanceReducer from "@/slice/typing-session-performance-slice";
import typingSessionStatsReducer from "@/slice/typing-session-stats-slice";
import userSettingsSliceReducer from "@/slice/user-settings-slice";
export const store = configureStore({
  reducer: {
    typingSessionState: typingSessionReducer,
    typingSessionStore: typingSessionStoreReducer,
    typingSessionPerformance: typingSessionPerformanceReducer,
    typingSessionStats: typingSessionStatsReducer,
    userSettings: userSettingsSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
