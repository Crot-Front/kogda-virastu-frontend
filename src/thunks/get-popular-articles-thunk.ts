import { batch } from 'react-redux';
import { AxiosError } from 'axios';
import { fetchPopularArticles } from '../services/api';
import {
  popularPostsRequested,
  popularPostsRequestSucceeded,
  popularPostsRequestFailed, setPopularArticles,
} from '../store';
import { AppThunk } from '../store/store.types';
import { makeErrorObject, makeTopFeed } from '../services/helpers';
import { TAPIError } from '../services/api.types';

const getPopularArticlesThunk: AppThunk = (qty = 7) => async (dispatch) => {
  try {
    dispatch(popularPostsRequested());
    const { data: { articles } } = await fetchPopularArticles();
    batch(() => {
      dispatch(setPopularArticles(makeTopFeed(articles, qty as number)));
      dispatch(popularPostsRequestSucceeded());
    });
  } catch (error) {
    dispatch(popularPostsRequestFailed(makeErrorObject(error as AxiosError<TAPIError>)));
  }
};

export default getPopularArticlesThunk;