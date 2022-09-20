import { AxiosError } from 'axios';
import { AppThunk } from '../store/store.types';
import {
  articlePatchRequested,
  articlePatchSucceeded,
  articlePatchFailed,
} from '../store';
import { patchArticle } from '../services/api';
import { makeErrorObject } from '../services/helpers';
import makeTagList from '../services/helpers/make-tagList';
import { TAPIError } from '../services/api.types';

const patchArticleThunk: AppThunk = (slug: string) => async (dispatch, getState) => {
  dispatch(articlePatchRequested());
  const articleData = getState().forms.article ?? {};
  const {
    title, description, body, link,
  } = articleData;
  const tagList = makeTagList(articleData.tags || '');
  try {
    await patchArticle(slug, {
      title,
      description,
      body,
      tagList,
      link,
    });
    dispatch(articlePatchSucceeded());
  } catch (error) {
    dispatch(
      articlePatchFailed(makeErrorObject(error as AxiosError<TAPIError>)),
    );
  }
};

export default patchArticleThunk;
