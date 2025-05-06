import { createSlice } from "@reduxjs/toolkit";

enum Theme {
  light,
  dark,
  auto,
}

enum CaretSpeed {
  off = 0,
  slow = 0.18,
  medium = 0.14,
  fast = 0.1,
  supperFast = 0.05,
}

export enum CaretShape {
  line,
  box,
  underline,
}

enum CaretSize {
  small = "0.15rem",
  medium = "0.18rem",
  large = "0.2rem",
}

interface UserSettingsState {
  appearance: {
    theme: Theme;
    showPerformanceHUD: boolean;
    showKeyBoard: boolean;
    showTypingPreview: boolean;
  };
  caret: {
    speed: CaretSpeed;
    shape: CaretShape;
    size: CaretSize;
  };
}

const initialState: UserSettingsState = {
  appearance: {
    theme: Theme.light,
    showPerformanceHUD: true,
    showKeyBoard: false,
    showTypingPreview: true,
  },
  caret: {
    speed: CaretSpeed.medium,
    shape: CaretShape.line,
    size: CaretSize.medium,
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
