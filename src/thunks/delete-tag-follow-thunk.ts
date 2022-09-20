import { AxiosError } from 'axios';
import { AppThunk } from '../store/store.types';
import {
  tagFollowDeleteFailed,
  tagFollowDeleteRequested,
  tagFollowDeleteSucceeded,
  setTagsFollow,
} from '../store';
import { deleteTagFollow } from '../services/api';
import { makeErrorObject } from '../services/helpers';
import { TAPIError } from '../services/api.types';

const deleteTagFollowThunk: AppThunk = (tagFollow: string) => async (dispatch, getState) => {
  try {
    dispatch(tagFollowDeleteRequested());
    await deleteTagFollow(tagFollow);
    const tagsFollow = getState().view.tagsFollow ?? [];
    dispatch(setTagsFollow(tagsFollow?.filter((el) => el !== tagFollow)));
    dispatch(tagFollowDeleteSucceeded());
  } catch (error) {
    dispatch(tagFollowDeleteFailed(makeErrorObject(error as AxiosError<TAPIError>)));
  }
};

export default deleteTagFollowThunk;
