import { AxiosError } from 'axios';
import { AppThunk } from '../store/store.types';
import { postTagFollow } from '../services/api';
import {
  tagFollowRequested,
  tagFollowSucceeded,
  tagFollowFailed,
} from '../store';
import { TAPIError } from '../services/api.types';
import { makeErrorObject } from '../services/helpers';

const addTagFollowThunk: AppThunk = (tagFollow: string) => async (dispatch, getState) => {
  try {
    dispatch(tagFollowRequested());
    await postTagFollow(tagFollow);
    dispatch(tagFollowSucceeded());
  } catch (error) {
    dispatch(tagFollowFailed(makeErrorObject(error as AxiosError<TAPIError>)));
  }
};
export default addTagFollowThunk;
