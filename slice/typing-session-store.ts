import { createSlice } from "@reduxjs/toolkit";

interface TypingSessionStore {
  typedWords: { [key: string]: number };
  words: string[];
}

const initialState: TypingSessionStore = {
  typedWords: {},
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
    resetTypedWords(state) {
      state.typedWords = {};
    },
    reset: (state: TypingSessionStore) => initialState,
  },
});

export const { setWords, setTypedWords, resetTypedWords, reset } =
  typingStoreSlice.actions;
export default typingStoreSlice.reducer;
