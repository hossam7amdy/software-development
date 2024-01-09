import { createSlice } from "@reduxjs/toolkit";

const intialAuthState = { isAuthenticated: false };

const authSlice = createSlice({
  name: "auth",
  initialState: intialAuthState,
  reducers: {
    login(state) {
      state.isAuthenticated = !state.isAuthenticated;
    },
    logout(state) {
      state.isAuthenticated = !state.isAuthenticated;
    },
  },
});

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;
