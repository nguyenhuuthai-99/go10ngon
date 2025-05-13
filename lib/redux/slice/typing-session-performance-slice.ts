import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SessionRecord {
  wpm: number;
  adjustedWpm: number;
  accuracy: number;
  key: string | null;
  timestamp: number;
}

export interface TypingSessionPerformance {
  wpm: number;
  accuracy: number;
  adjustedWpm: number;
  isRunning: boolean;
  history: SessionRecord[];
}

const initialTypingState: TypingSessionPerformance = {
  wpm: 0,
  accuracy: 100,
  adjustedWpm: 0,
  isRunning: false,
  history: [],
};

const typingSessionPerformanceSlice = createSlice({
  name: "typingPerformance",
  initialState: initialTypingState,
  reducers: {
    updatePerformance: (state, action) => {
      state.wpm = Math.round(action.payload.wpm);
      state.accuracy = Math.round(action.payload.accuracy);
      state.adjustedWpm = Math.round(action.payload.adjustedWpm);
    },
    addToHistory(state, action: PayloadAction<SessionRecord>) {
      state.history.unshift(action.payload);
      // state.history = state.history.slice(0, 50);
    },
    clearHistory(state) {
      state.history = [];
    },
    setHistory(state, action: PayloadAction<SessionRecord[]>) {
      state.history = action.payload;
    },
    resetPerformance(state) {
      state.wpm = 0;
      state.accuracy = 100;
      state.adjustedWpm = 0;
      state.isRunning = false;
      state.history = [];
    },
  },
});

export const {
  updatePerformance,
  clearHistory,
  resetPerformance,
  setHistory,
  addToHistory,
} = typingSessionPerformanceSlice.actions;
export default typingSessionPerformanceSlice.reducer;
