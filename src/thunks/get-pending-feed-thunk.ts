import { batch } from 'react-redux';
import { AxiosError } from 'axios';
import { AppThunk } from '../store/store.types';
import { TAPIParamsObject, TAPIError } from '../services/api.types';
import { makeErrorObject } from '../services/helpers';
import { FeedTypes } from '../types/types';
import { fetchPendingFeed } from '../services/api';
import {
  pendingFeedRequested,
  setViewFeed,
  setFeedCount,
  setFeedType,
  pendingFeedSucceeded,
  pendingFeedFailed,
} from '../store';

const getPendingFeedThunk: AppThunk = (
  params: TAPIParamsObject,
) => async (dispatch) => {
  try {
    batch(() => {
      dispatch(pendingFeedRequested());
    });
    const
      { data: { articles, articlesCount } } = await fetchPendingFeed(params);
    batch(() => {
      dispatch(setViewFeed(articles));
      dispatch(setFeedCount(articlesCount));
      dispatch(pendingFeedSucceeded());
      dispatch(setFeedType(FeedTypes.moderation));
    });
  } catch (error) {
    dispatch(pendingFeedFailed(makeErrorObject(error as AxiosError<TAPIError>)));
  }
};

export default getPendingFeedThunk;
