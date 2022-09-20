import { AxiosError } from 'axios';
import { AppThunk } from '../store/store.types';
import {
  userRolesFetchRequested,
  userRolesFetchSucceeded,
  userRolesFetchFailed,
} from '../store';
import { patchUserRoles } from '../services/api';
import { TAPIError, TAPIRolesData } from '../services/api.types';
import { makeErrorObject } from '../services/helpers';

const patchUserRolesThunk: AppThunk = (
  slug: string,
  data: TAPIRolesData,
) => async (dispatch) => {
  dispatch(userRolesFetchRequested());
  try {
    await patchUserRoles(slug, data);
    dispatch(userRolesFetchSucceeded());
  } catch (error) {
    dispatch(userRolesFetchFailed(makeErrorObject(error as AxiosError<TAPIError>)));
  }
};

export default patchUserRolesThunk;
