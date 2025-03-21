import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: null,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.email = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem('email', action.payload);
    },
    logout: (state) => {
      state.email = null;
      state.isAuthenticated = false;
      localStorage.removeItem('email');
    },
  },
});

export const { loginSuccess, logout } = userSlice.actions;
export default userSlice.reducer;
