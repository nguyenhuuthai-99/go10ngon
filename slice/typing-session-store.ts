import { createSlice } from "@reduxjs/toolkit";

interface TypingSessionStore {
  typedWords: string[];
  words: string[];
}

const initialState: TypingSessionStore = {
  typedWords: [],
  words: [],
};

const typingStoreSlice = createSlice({
  name: "typingStore",
  initialState,
  reducers: {
    setTypedWords(state, action) {
      state.typedWords = action.payload;
    },
    setWords(state, action) {
      state.words = action.payload;
    },
    reset: (state: TypingSessionStore) => initialState,
  },
});
