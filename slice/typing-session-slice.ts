import { createSlice } from "@reduxjs/toolkit";

export interface TypingSessionState {
  isStarted: boolean;
  isEnded: boolean;
  isAFK: boolean;
  isSessionReady: boolean;
}

const initialState: TypingSessionState = {
  isStarted: false,
  isEnded: false,
  isAFK: false,
  isSessionReady: false,
};

const typingSessionSlice = createSlice({
  name: "typingSession",
  initialState,
  reducers: {
    setReady: (state: TypingSessionState, action) => {
      state.isSessionReady = action.payload;
    },
    markAsStart: (state) => {
      state.isStarted = true;
    },
    markAsEnd: (state) => {
      state.isEnded = true;
    },
    setAFK: (state) => {
      state.isAFK = true;
    },
    resetTypingSessionState: (state) => initialState,
  },
});

export const {
  setReady,
  markAsEnd,
  markAsStart,
  resetTypingSessionState,
  setAFK,
} = typingSessionSlice.actions;
export default typingSessionSlice.reducer;
