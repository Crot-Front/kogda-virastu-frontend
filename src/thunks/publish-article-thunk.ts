import { AxiosError } from 'axios';
import { AppThunk } from '../store/store.types';
import {
  articlePostRequested,
  articlePostSucceeded,
  articlePostFailed,
} from '../store';
import { publishArticle } from '../services/api';
import { makeErrorObject } from '../services/helpers';
import makeTagList from '../services/helpers/make-tagList';
import { TAPIError } from '../services/api.types';

const publishArticleThunk: AppThunk = (slug: string) => async (dispatch, getState) => {
  dispatch(articlePostRequested());
  const articleData = getState().forms.article ?? {};
  const {
    title, description, body, link,
  } = articleData;
  const tagList = makeTagList(articleData.tags || '');
  try {
    await publishArticle(slug, {
      title,
      description,
      body,
      tagList,
      link,
    });
    dispatch(articlePostSucceeded());
  } catch (error) {
    dispatch(
      articlePostFailed(makeErrorObject(error as AxiosError<TAPIError>)),
    );
  }
};

export default publishArticleThunk;
