import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TimedModeDuration, TypingMode } from "@/model/typing-mode";
import { TimedMode } from "@/model/timed-mode";
import { WordCountMode } from "@/model/word-count-mode";
import {
  getQuoteTest,
  getTimedTest,
  getWordsCountTest,
} from "@/lib/infrastructure/api/services/app-service";
import { RootState } from "@/lib/store";

export interface TypingGameMode {
  currentTypingMode: TypingMode;
  modeContext: QuoteMode | TimedMode | WordCountMode;
}
export interface TypingSessionState {
  isStarted: boolean;
  isEnded: boolean;
  isAFK: boolean;
  isSessionReady: boolean;
  typingGameMode: TypingGameMode;
  typedWords: { [key: number]: string };
}

const initialState: TypingSessionState = {
  isStarted: false,
  isEnded: false,
  isAFK: false,
  isSessionReady: false,
  typingGameMode: {
    currentTypingMode: TypingMode.timed,
    modeContext: {
      duration: TimedModeDuration.short,
      text: [],
    } as TimedMode,
  },
  typedWords: {},
};

const typingSessionSlice = createSlice({
  name: "typingSession",
  initialState,
  reducers: {
    setTypedWords(state, action: { payload: { [key: number]: string } }) {
      state.typedWords = action.payload;
    },
    resetTypedWords(state) {
      state.typedWords = {};
    },
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
    changeTypingGameMode: (state, action) => {
      state.typingGameMode.currentTypingMode = action.payload;
    },
    setTimedContext: (state, action) => {
      (state.typingGameMode.modeContext as TimedMode) = action.payload;
    },
    setTimedModeDuration: (state, action) => {
      (state.typingGameMode.modeContext as TimedMode).duration = action.payload;
    },
    setTimedModeText: (state, action) => {
      (state.typingGameMode.modeContext as TimedMode).text = action.payload;
    },
    initialTypingSessionState: (state) => initialState,
    resetTypingSessionState: (state) => {
      state.isAFK = false;
      state.isSessionReady = false;
      state.isStarted = false;
      state.isEnded = false;
      state.typedWords = {};
    },
    resetTypingSessionStateAndWords: (state) => {
      state.isAFK = false;
      state.isSessionReady = false;
      state.isStarted = false;
      state.isEnded = false;
      state.typedWords = {};
      state.typingGameMode.modeContext.text = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTypingGameThunk.fulfilled, (state, action) => {
      state.typingGameMode.modeContext.text = action.payload;
    });
  },
});

export const fetchTypingGameThunk = createAsyncThunk(
  "fetchTypingGame",
  async (_, { getState }) => {
    const state = getState() as RootState;

    const mode = state.typingSessionState.typingGameMode.currentTypingMode;

    const context = state.typingSessionState.typingGameMode.modeContext;

    switch (mode) {
      case TypingMode.timed:
        return getTimedTest((context as TimedMode).duration);
      case TypingMode.wordCount:
        return getWordsCountTest((context as WordCountMode).count);
      case TypingMode.quote:
        return getQuoteTest();
      default:
        console.warn("Invalid mode");
        return [];
    }
  },
);

export const {
  setTypedWords,
  resetTypedWords,
  setTimedModeText,
  setTimedContext,
  setTimedModeDuration,
  setReady,
  markAsEnd,
  markAsStart,
  initialTypingSessionState,
  resetTypingSessionState,
  resetTypingSessionStateAndWords,
  changeTypingGameMode,
  setAFK,
} = typingSessionSlice.actions;
export default typingSessionSlice.reducer;
