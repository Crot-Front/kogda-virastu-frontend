import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TRegisterFormState = {
  username: string | null,
  email: string | null,
  password: string | null,
  roles: Array<string> | null,
  confirmPassword: string | null,
  nickname: string | null,
  invite: string | null,
  isPasswordCorrect: boolean,
};

const initialState: TRegisterFormState = {
  username: null,
  email: null,
  password: null,
  roles: [],
  confirmPassword: null,
  nickname: null,
  invite: null,
  isPasswordCorrect: true,
};

const registerFormSubSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    changeUsernameRegister: (
      state,
      action: PayloadAction<string>,
    ) => ({ ...state, username: action.payload }),
    changeEmailRegister: (
      state,
      action : PayloadAction<string>,
    ) => ({ ...state, email: action.payload }),
    changePasswordRegister: (state, action: PayloadAction<string>) => ({
      ...state, password: action.payload,
    }),
    changeConfirmPasswordRegister: (state, action: PayloadAction<string>) => ({
      ...state, confirmPassword: action.payload,
    }),
    changeNicknameRegister: (state, action: PayloadAction<string>) => ({
      ...state, nickname: action.payload,
    }),
    changeInviteRegister: (state, action: PayloadAction<string>) => ({
      ...state, invite: action.payload,
    }),
    resetFormRegister: (state) => ({
      ...state, ...initialState,
    }),
    setPasswordCorrectRegister: (state) => ({
      ...state, isPasswordCorrect: false,
    }),
    setPasswordInCorrectRegister: (state) => ({
      ...state, isPasswordCorrect: true,
    }),
  },
});

const registerReducer = registerFormSubSlice.reducer;
export const {
  changeUsernameRegister,
  changeEmailRegister,
  changePasswordRegister,
  changeConfirmPasswordRegister,
  changeNicknameRegister,
  changeInviteRegister,
  resetFormRegister,
  setPasswordCorrectRegister,
  setPasswordInCorrectRegister,
} = registerFormSubSlice.actions;
export default registerReducer;
