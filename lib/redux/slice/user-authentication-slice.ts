import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@firebase/auth";

interface AuthState {
  user: User | null;
  loading: boolean;
}

const initialState: AuthState = {
  user: null,
  loading: true,
};

const userAuthenticationSlice = createSlice({
  name: "userAuthentication",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.loading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setUser, setLoading } = userAuthenticationSlice.actions;
export default userAuthenticationSlice.reducer;
