import { AxiosError } from 'axios';
import { batch } from 'react-redux';
import { AppThunk } from '../store/store.types';
import {
  allUsersFetchRequested,
  allUsersFetchSucceeded,
  allUsersFetchFailed,
  setAllUsers,
} from '../store';
import { fetchAllUsers } from '../services/api';
import { TAPIError } from '../services/api.types';
import { makeErrorObject } from '../services/helpers';

const getAllUsersThunk: AppThunk = () => async (dispatch) => {
  dispatch(allUsersFetchRequested());
  try {
    const { data: { users } } = await fetchAllUsers();
    batch(() => {
      dispatch(setAllUsers({ users }));
      dispatch(allUsersFetchSucceeded());
    });
  } catch (error) {
    dispatch(allUsersFetchFailed(makeErrorObject(error as AxiosError<TAPIError>)));
  }
};

export default getAllUsersThunk;
