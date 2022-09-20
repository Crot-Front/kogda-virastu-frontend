import { AxiosError } from 'axios';
import { batch } from 'react-redux';
import { AppThunk } from '../store/store.types';
import {
  userFetchRequested,
  userFetchSucceeded,
  userFetchFailed,
  setUser, onLogin,
} from '../store';
import { fetchCurrentUser, jwt } from '../services/api';
import { TAPIError } from '../services/api.types';
import { makeErrorObject } from '../services/helpers';

const getUserProfileThunk: AppThunk = () => async (dispatch) => {
  dispatch(userFetchRequested());
  try {
    const {
      data: {
        user: {
          username, email, roles, bio, image, token, nickname,
        },
      },
    } = await fetchCurrentUser();
    jwt.set(token);
    batch(() => {
      dispatch(setUser({
        username, email, roles, bio, image, nickname,
      }));
      dispatch(userFetchSucceeded());
      dispatch(onLogin());
    });
  } catch (error) {
    dispatch(userFetchFailed(makeErrorObject(error as AxiosError<TAPIError>)));
  }
};
export default getUserProfileThunk;
