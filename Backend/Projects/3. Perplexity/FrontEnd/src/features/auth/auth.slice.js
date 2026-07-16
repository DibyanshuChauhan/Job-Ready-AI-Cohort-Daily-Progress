import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: true,
    authChecked: false,
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setAuthChecked: (state, action) => {
      state.authChecked = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
    },

    logoutSuccess: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const { setUser, setLoading, setError, setAuthChecked, logoutSuccess } =
  authSlice.actions;
export default authSlice.reducer;
