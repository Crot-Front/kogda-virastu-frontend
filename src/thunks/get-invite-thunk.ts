import { AxiosError } from 'axios';
import { batch } from 'react-redux';
import {
  setInviteCode,
  inviteGetRequested,
  inviteGetSucceeded,
  inviteGetFailed,
} from '../store';
import { fetchInviteCode } from '../services/api';
import { AppThunk } from '../store/store.types';
import { TAPIError } from '../services/api.types';
import { makeErrorObject } from '../services/helpers';

const getInviteThunk: AppThunk = () => async (dispatch) => {
  dispatch(inviteGetRequested());
  try {
    const { data: { code } } = await fetchInviteCode();
    batch(() => {
      dispatch(setInviteCode(code));
      dispatch(inviteGetSucceeded());
    });
  } catch (error) {
    dispatch(inviteGetFailed(makeErrorObject(error as AxiosError<TAPIError>)));
  }
};

export default getInviteThunk;
