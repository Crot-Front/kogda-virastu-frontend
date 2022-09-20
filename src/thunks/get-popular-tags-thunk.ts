import { batch } from 'react-redux';
import { AxiosError } from 'axios';
import { fetchPopularTags } from '../services/api';
import {
  setPopularTags,
  tagsFetchFailed,
  tagsFetchRequested,
  tagsFetchSucceeded,
} from '../store';
import { AppThunk } from '../store/store.types';
import { TAPIError } from '../services/api.types';
import { makeErrorObject } from '../services/helpers';

const getPopularTagsThunk : AppThunk = () => async (dispatch) => {
  try {
    dispatch(tagsFetchRequested());
    const { data: { tags } } = await fetchPopularTags();
    batch(() => {
      dispatch(setPopularTags(tags));
      dispatch(tagsFetchSucceeded());
    });
  } catch (error) {
    dispatch(tagsFetchFailed(makeErrorObject(error as AxiosError<TAPIError>)));
  }
};

export default getPopularTagsThunk;
