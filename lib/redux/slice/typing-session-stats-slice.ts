import { createSlice } from "@reduxjs/toolkit";

interface TypingStats {
  totalKeystrokes: number;
  totalKeyPressed: number;
  correctKeystrokes: number;
  startTime: number | null;
  lastTimestamp: number | null;
  isRunning: boolean;
}

const initialTypingState: TypingStats = {
  totalKeystrokes: 0,
  totalKeyPressed: 0,
  correctKeystrokes: 0,
  startTime: null,
  lastTimestamp: null,
  isRunning: false,
};

export const typingSessionStatsSlice = createSlice({
  name: "typingSessionStats",
  initialState: initialTypingState,
  reducers: {
    keyPress: (state, action) => {
      const { isCorrect, timestamp, numberOfKeys } = action.payload;
      state.totalKeystrokes += numberOfKeys;
      state.totalKeyPressed += 1;
      state.correctKeystrokes += isCorrect ? 1 : 0;
      state.startTime ??= timestamp;
      state.lastTimestamp = timestamp;
      state.isRunning = true;
    },
    setInActive: (state) => {
      state.isRunning = false;
    },
    resetTypingStatsState: (state) => initialTypingState,
  },
});

export const { keyPress, setInActive, resetTypingStatsState } =
  typingSessionStatsSlice.actions;
export default typingSessionStatsSlice.reducer;
