import { createSlice } from "@reduxjs/toolkit";

export interface TypingSessionState {
  isStarted: boolean;
  isEnded: boolean;
  isAFK: boolean;
}

const initialState: TypingSessionState = {
  isStarted: false,
  isEnded: false,
  isAFK: false,
};

const typingSessionSlice = createSlice({
  name: "typingSession",
  initialState,
  reducers: {
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

export const { markAsEnd, markAsStart, resetTypingSessionState, setAFK } =
  typingSessionSlice.actions;
export default typingSessionSlice.reducer;
