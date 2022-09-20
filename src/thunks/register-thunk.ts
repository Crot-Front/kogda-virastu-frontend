import { AxiosError } from 'axios';
import { batch } from 'react-redux';
import { AppThunk } from '../store/store.types';
import { registerUser, jwt } from '../services/api';
import {
  userRegistrationRequested,
  userRegistrationSucceeded,
  userRegistrationFailed,
  setUser,
} from '../store';
import { makeErrorObject } from '../services/helpers';
import { TAPIError } from '../services/api.types';

const registerThunk: AppThunk = () => async (dispatch, getState) => {
  const reg = getState().forms.register || {};
  const usernameReg = reg.username ?? '';
  const emailReg = reg.email ?? '';
  const passwordReg = reg.password ?? '';
  const nicknameReg = reg.nickname ?? '';
  const inviteReg = reg.invite ?? '';
  dispatch(userRegistrationRequested());
  try {
    const {
      data: {
        user: {
          username, email, token, bio = '', image = '', nickname = '',
        },
      },
    } = await registerUser(usernameReg, emailReg, passwordReg, nicknameReg, inviteReg);
    jwt.set(token);
    batch(() => {
      dispatch(setUser({
        username,
        email,
        bio,
        image,
        nickname,
      }));
      dispatch(userRegistrationSucceeded());
    });
    jwt.set(token);
  } catch (error) {
    dispatch(
      userRegistrationFailed(makeErrorObject(error as AxiosError<TAPIError>)),
    );
  }
};

export default registerThunk;
