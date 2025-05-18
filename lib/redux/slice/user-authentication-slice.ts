import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@firebase/auth";

export interface UserState {
  username: string | null;
  uid: string | null;
  email: string | null;
  wpm: number;
  loading: boolean;
}

const initialState: UserState = {
  username: null,
  uid: null,
  email: null,
  wpm: 75,
  loading: false,
};

const userAuthenticationSlice = createSlice({
  name: "userAuthentication",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.username = action.payload.username;
      state.uid = action.payload.uid;
      state.email = action.payload.email;
      state.wpm = action.payload.wpm;
      state.loading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setUser, setLoading } = userAuthenticationSlice.actions;
export default userAuthenticationSlice.reducer;
