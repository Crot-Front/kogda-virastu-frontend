import { AxiosError } from 'axios';
import { batch } from 'react-redux';
import { AppThunk } from '../store/store.types';
import {
  uploadFetchRequested,
  uploadFetchSucceeded,
  uploadFetchFailed,
  setImageProfile,
} from '../store';
import { postImageUpload } from '../services/api';
import { makeErrorObject } from '../services/helpers';
import { TAPIError } from '../services/api.types';
import { BASE_ROOT } from '../constants';

const avatarImageUploadThunk: AppThunk = (file : File) => async (dispatch) => {
  dispatch(uploadFetchRequested());
  try {
    const { data: { url } } = await postImageUpload({ file });
    batch(() => {
      const avatarUrl = `${BASE_ROOT}${url}`;
      dispatch(setImageProfile(avatarUrl));
      dispatch(uploadFetchSucceeded());
    });
  } catch (error) {
    dispatch(
      uploadFetchFailed(makeErrorObject(error as AxiosError<TAPIError>)),
    );
  }
};

export default avatarImageUploadThunk;
