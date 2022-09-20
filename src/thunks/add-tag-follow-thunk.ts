import { AxiosError } from 'axios';
import { AppThunk } from '../store/store.types';
import { postTagFollow } from '../services/api';
import {
  tagFollowRequested,
  tagFollowSucceeded,
  tagFollowFailed,
  setTagsFollow,
  tagFollowVisible,
} from '../store';
import { TAPIError } from '../services/api.types';
import { makeErrorObject } from '../services/helpers';

const addTagFollowThunk: AppThunk = (tagFollow: string) => async (dispatch, getState) => {
  try {
    dispatch(tagFollowRequested());
    await postTagFollow(tagFollow);
    const tagsFollow = getState().view.tagsFollow ?? [];
    if (tagsFollow) {
      dispatch(setTagsFollow([...tagsFollow, tagFollow]));
    } else {
      dispatch(setTagsFollow([tagFollow]));
    }
    dispatch(tagFollowVisible(true));
    setTimeout(() => dispatch(tagFollowVisible(false)), 2000);
    dispatch(tagFollowSucceeded());
  } catch (error) {
    console.log(error);
    dispatch(tagFollowFailed(makeErrorObject(error as AxiosError<TAPIError>)));
  }
};
export default addTagFollowThunk;
