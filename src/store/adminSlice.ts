import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUser, TUsers } from '../types/types';

type TAdminState = {
  users: Array<TUser> | null,
};

const initialState: TAdminState = {
  users: null,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setAllUsers: (state, action: PayloadAction<TUsers>) => ({ ...state, ...action.payload }),
    // clearUser: (state) => ({
    //   ...state, ...initialState,
    // }),
    // setInviteCode: (state, action: PayloadAction<string>) => ({
    //   ...state, friendInvite: action.payload,
    // }),
  },
});

const adminReducer = adminSlice.reducer;
export const { setAllUsers } = adminSlice.actions;
export default adminReducer;
