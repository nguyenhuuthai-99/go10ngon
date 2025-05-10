import { createSlice } from "@reduxjs/toolkit";

export enum Theme {
  light = "light",
  dark = "dark",
  auto = "auto",
}

export enum CaretSpeed {
  off = "0",
  slow = "0.18",
  medium = "0.14",
  fast = "0.1",
  supperFast = "0.05",
}

export enum CaretShape {
  line = "line",
  box = "box",
  underline = "underline",
}

export enum CaretSize {
  small = "0.15rem",
  medium = "0.18rem",
  large = "0.2rem",
}

export interface UserSettingsState {
  appearance: {
    theme: Theme;
    showPerformanceHUD: boolean;
    showKeyBoard: boolean;
    showTypingPreview: boolean;
    showInputField: boolean;
    markParent: boolean;
  };
  caret: {
    speed: CaretSpeed;
    shape: CaretShape;
    size: CaretSize;
  };
  notification: {
    isChecked: boolean;
  };
}

export const initialUserSettingState: UserSettingsState = {
  appearance: {
    theme: Theme.light,
    showPerformanceHUD: true,
    showKeyBoard: false,
    showTypingPreview: true,
    showInputField: false,
    markParent: true,
  },
  caret: {
    speed: CaretSpeed.medium,
    shape: CaretShape.line,
    size: CaretSize.medium,
  },
  notification: {
    isChecked: false,
  },
};

const userSettingsSlice = createSlice({
  name: "userSettings",
  initialState: initialUserSettingState,
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
    applySettings: (state, action) => action.payload,
    markNotificationAsChecked: (state) => {
      state.notification.isChecked = true;
    },
  },
});

export const {
  setTheme,
  toggleTypingPreview,
  togglePerformanceHUD,
  toggleKeyBoard,
  applySettings,
  markNotificationAsChecked,
} = userSettingsSlice.actions;
export default userSettingsSlice.reducer;
