import { batch } from 'react-redux';
import { AxiosError } from 'axios';
import { fetchPublicFeed } from '../services/api';
import {
  publicFeedFailed,
  publicFeedRequested,
  publicFeedSucceeded,
  setFeedCount,
  setViewFeed,
  setFeedType,
} from '../store';
import { AppThunk } from '../store/store.types';
import { makeErrorObject } from '../services/helpers';
import { TAPIError, TAPIParamsObject } from '../services/api.types';
import { FeedTypes } from '../types/types';

const getPublicFeedThunk: AppThunk = (
  params: TAPIParamsObject,
) => async (dispatch) => {
  try {
    batch(() => {
      dispatch(publicFeedRequested());
    });
    const
      { data: { articles, articlesCount } } = await fetchPublicFeed(params);
    batch(() => {
      const publishedArticles = articles.filter((article) => article.state === 'published');
      dispatch(setViewFeed(publishedArticles));
      dispatch(setFeedCount(articlesCount));
      dispatch(publicFeedSucceeded());
      dispatch(setFeedType(FeedTypes.public));
    });
  } catch (error) {
    dispatch(publicFeedFailed(makeErrorObject(error as AxiosError<TAPIError>)));
  }
};

export default getPublicFeedThunk;
