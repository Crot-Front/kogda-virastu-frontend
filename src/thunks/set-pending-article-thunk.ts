import { AxiosError } from 'axios';
import { AppThunk } from '../store/store.types';
import {
  declineArticleRequested,
  declineArticleSucceeded,
  declineArticleFailed,
} from '../store';
import { setPendingArticle } from '../services/api';
import { makeErrorObject } from '../services/helpers';
import makeTagList from '../services/helpers/make-tagList';
import { TAPIError } from '../services/api.types';

const setPendingArticleThunk: AppThunk = (slug: string) => async (dispatch, getState) => {
  dispatch(declineArticleRequested());
  const articleData = getState().forms.article ?? {};
  const {
    title, description, body, link,
  } = articleData;
  const tagList = makeTagList(articleData.tags || '');
  try {
    await setPendingArticle(slug, {
      title,
      description,
      body,
      tagList,
      link,
    });
    dispatch(declineArticleSucceeded());
  } catch (error) {
    dispatch(
      declineArticleFailed(makeErrorObject(error as AxiosError<TAPIError>)),
    );
  }
};

export default setPendingArticleThunk;
