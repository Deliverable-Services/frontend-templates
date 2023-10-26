import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userDetails: {},
  },
  reducers: {
    setExampleState: (state, action) => {
      state.user = action?.payload;
    },
  },
});

export const { setExampleState } = userSlice.actions;

export default userSlice.reducer;
