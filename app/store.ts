import { configureStore } from "@reduxjs/toolkit";
import typingSessionReducer from "@/slice/typing-session-slice";
export const store = configureStore({
  reducer: {
    typingSessionState: typingSessionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
