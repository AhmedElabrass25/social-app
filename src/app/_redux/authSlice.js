import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  token: null,
  isLoading: false,
  isError: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading(state) {
      state.isLoading = true;
    },
    setToken(state, action) {
      state.isLoading = false;
      state.token = action.payload;
    },
    setError(state, action) {
      state.isLoading = false;
      state.isError = action.payload;
    },
    removeToken(state, action) {
      state.isLoading = false;
      state.token = null;
    },
  },
});
export const { setLoading, setError, setToken, removeToken } =
  authSlice.actions;
export const authReducer = authSlice.reducer;
