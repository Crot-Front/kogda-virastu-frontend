import { batch } from 'react-redux';
import { AxiosError } from 'axios';
import { fetchTagsFollow } from '../services/api';
import {
  tagsFollowFetchFailed,
  tagsFollowFetchRequested,
  tagsFollowFetchSucceeded,
  setTagsFollow,
} from '../store';
import { AppThunk } from '../store/store.types';
import { TAPIError } from '../services/api.types';
import { makeErrorObject } from '../services/helpers';

const getTagsFollowThunk : AppThunk = () => async (dispatch) => {
  try {
    dispatch(tagsFollowFetchRequested());
    const { data: { tags } } = await fetchTagsFollow();
    dispatch(setTagsFollow(tags));
    batch(() => {
      dispatch(setTagsFollow(tags));
      dispatch(tagsFollowFetchSucceeded());
    });
  } catch (error) {
    dispatch(tagsFollowFetchFailed(makeErrorObject(error as AxiosError<TAPIError>)));
  }
};

export default getTagsFollowThunk;
