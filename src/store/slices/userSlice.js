import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: null,
  name: '',
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
      state.name = '';
      state.isAuthenticated = false;
      localStorage.removeItem('email');
    },
    setUserName: (state, action) => {
      state.name = action.payload;
    },
  },
});

export const { loginSuccess, logout, setUserName } = userSlice.actions;
export default userSlice.reducer;
