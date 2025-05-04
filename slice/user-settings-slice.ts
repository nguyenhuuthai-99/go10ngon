import { createSlice } from "@reduxjs/toolkit";

enum Theme {
  light,
  dark,
  auto,
}

interface UserSettingsState {
  appearance: {
    theme: Theme;
    showPerformanceHUD: boolean;
    showKeyBoard: boolean;
    showTypingPreview: boolean;
  };
}

const initialState: UserSettingsState = {
  appearance: {
    theme: Theme.light,
    showPerformanceHUD: true,
    showKeyBoard: false,
    showTypingPreview: true,
  },
};

const userSettingsSlice = createSlice({
  name: "userSettings",
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.appearance.theme = action.payload.theme;
    },
    togglePerformanceHUD: (state) => {
      state.appearance.showPerformanceHUD =
        !state.appearance.showPerformanceHUD;
    },
    toggleKeyBoard: (state) => {
      state.appearance.showKeyBoard = !state.appearance.showKeyBoard;
    },
    toggleTypingPreview: (state) => {
      state.appearance.showTypingPreview = !state.appearance.showTypingPreview;
    },
  },
});

export const {
  setTheme,
  toggleTypingPreview,
  togglePerformanceHUD,
  toggleKeyBoard,
} = userSettingsSlice.actions;
export default userSettingsSlice.reducer;
