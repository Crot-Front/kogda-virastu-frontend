/* eslint-disable @typescript-eslint/no-unsafe-return */
import axios, { AxiosInstance, AxiosPromise, AxiosRequestConfig } from 'axios';
import {
  API_ROOT,
  LOGIN_ROUTE,
  REGISTER_ROUTE,
  USER_ROUTE,
  ARTICLES_ROUTE,
  MODERATION_ARTICLE_ROUTE,
  PENDING_FEED_ROUTE,
  FEED_ROUTE, JWT,
  PROFILES_ROUTE,
  TAGS_ROUTE,
  INVITE_ROUTE,
  ADMIN_USERS_ROUTE,
  UPLOAD_ROUTE,
} from '../constants';
import {
  TAPINewUser,
  TAPILoginUser,
  TAPIPatchUser,
  TAPIArticles,
  TAPIParamsObject,
  TAPIArticle,
  TAPITags,
  TAPIPopularTags,
  TAPITag,
  TAPIComments,
  TAPIComment,
  TAPIProfile,
  TAPIAuth,
  TAPIPatchUserData,
  TAPIPatchArticleData,
  TAPIInvite,
  TAPIUsers,
  TAPIRolesData,
  TAPIUser,
  TAPIUploadImage,
  TFile,
} from './api.types';
import {
  IDeleteArticle,
  IDeleteComment,
  IFetchArticle,
  IFetchArticles,
  IFetchComments,
  IFetchTags,
  IFetchPopularTags,
  IFetchUser,
  ILikeArticle,
  ILoginUser,
  IPatchArticle,
  IPatchUser,
  IPostArticle,
  IPostComment,
  IProfile,
  IRegisterUser,
  ITag,
  IInvite,
  IFetchAllUsers,
  IPatchUserRoles,
  IPostImageUpload,
} from '../types/API.types';

const defaultRequestConfig : AxiosRequestConfig = {
  baseURL: API_ROOT,
  headers: {
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  },
};

const makeParams = (
  limit?: number,
  offset?: number,
  tag?: string,
  author?: string,
  favorited?: string,
) : TAPIParamsObject => {
  let res : TAPIParamsObject = {};
  if (limit) {
    res = { ...res, limit };
  }
  if (offset) {
    res = { ...res, offset };
  }
  if (tag) {
    res = { ...res, tag };
  }
  if (author) {
    res = { ...res, author };
  }
  if (favorited) {
    res = { ...res, favorited };
  }
  return res;
};

const makeArticlePatchData = (data : TAPIPatchArticleData) : TAPIPatchArticleData => {
  const {
    title,
    description,
    body,
    tagList,
    link,
  } = data;
  let res : TAPIPatchArticleData = { };
  if (title) {
    res = { ...res, title };
  }
  if (description) {
    res = { ...res, description };
  }
  if (body) {
    res = { ...res, body };
  }
  if (tagList && tagList.length > 0) {
    res = { ...res, tagList };
  }
  if (link) {
    res = { ...res, link };
  }
  return res;
};

export const jwt = {
  set: (value: string) : void => {
    if (value) {
      localStorage.setItem(JWT, `${value}`);
    } else {
      localStorage.removeItem(JWT);
    }
  },
  get: () : string => {
    const res = localStorage.getItem(JWT);
    return res || '';
  },
  test: () : boolean => !!localStorage.getItem(JWT),
  remove: () : void => localStorage.removeItem(JWT),
};

const injectBearerToken = (requestConfig : AxiosRequestConfig) : AxiosRequestConfig => {
  if (jwt.test()) {
    return { ...requestConfig, headers: { ...defaultRequestConfig.headers, Authorization: `Bearer ${jwt.get()}` } };
  }
  return requestConfig;
};

const blogAPI : AxiosInstance = axios.create(defaultRequestConfig);

export const registerUser : IRegisterUser = (
  username: string,
  email: string,
  password: string,
  nickname: string | undefined,
  invite: string | undefined,
) : AxiosPromise<TAPIAuth> => {
  const registerData : TAPINewUser = {
    invite,
    user: {
      username, email, password, nickname,
    },
  };
  const requestConfig : AxiosRequestConfig = {
    url: REGISTER_ROUTE,
    data: registerData,
    method: 'post',
  };
  return blogAPI(requestConfig);
};

export const fetchCurrentUser : IFetchUser = () : AxiosPromise<TAPIAuth> => {
  const requestConfig: AxiosRequestConfig = {
    url: USER_ROUTE,
    method: 'get',
  };
  return blogAPI(injectBearerToken(requestConfig));
};

export const loginUser : ILoginUser = (
  email: string,
  password: string,
) : AxiosPromise<TAPIAuth> => {
  const loginData : TAPILoginUser = {
    user: { email, password },
  };
  const requestConfig : AxiosRequestConfig = {
    url: LOGIN_ROUTE,
    method: 'post',
    data: loginData,
  };
  return blogAPI(requestConfig);
};

export const patchCurrentUser : IPatchUser = (
  user: TAPIPatchUserData,
) : AxiosPromise<TAPIAuth> => {
  const makePatchData = (data : TAPIPatchUserData) : TAPIPatchUserData => {
    const {
      username, email, password, bio, image, nickname,
    } = data;
    let res = {};
    if (username) {
      res = { ...res, username };
    }
    if (email) {
      res = { ...res, email };
    }
    if (password) {
      res = { ...res, password };
    }
    if (bio) {
      res = { ...res, bio };
    }
    if (image) {
      res = { ...res, image };
    }
    if (nickname) {
      res = { ...res, nickname };
    }
    return res;
  };
  const userData: TAPIPatchUserData = makePatchData(user);
  if (userData === {}) {
    return fetchCurrentUser();
  }
  const patchData : TAPIPatchUser = {
    user: userData,
  };

  const requestConfig: AxiosRequestConfig = {
    url: USER_ROUTE,
    data: patchData,
    method: 'put',
  };

  return blogAPI(injectBearerToken(requestConfig));
};

export const fetchPublicFeed : IFetchArticles = (
  queryParams?: TAPIParamsObject,
) : AxiosPromise<TAPIArticles> => {
  const {
    limit, offset, tag, author, favorited,
  } = queryParams ?? {};
  const requestConfig : AxiosRequestConfig = {
    url: ARTICLES_ROUTE,
    params: makeParams(limit, offset, tag, author, favorited),
    method: 'get',
  };
  return blogAPI(injectBearerToken(requestConfig));
};

export const fetchPrivateFeed : IFetchArticles = (
  queryParams?: TAPIParamsObject,
) : AxiosPromise<TAPIArticles> => {
  const { limit, offset, tag } = queryParams ?? {};
  const requestConfig : AxiosRequestConfig = {
    url: FEED_ROUTE,
    params: makeParams(limit, offset, tag),
    method: 'get',
  };
  return blogAPI(injectBearerToken(requestConfig));
};

export const fetchPendingFeed: IFetchArticles = (
  queryParams?: TAPIParamsObject,
) : AxiosPromise<TAPIArticles> => {
  const {
    limit, offset, tag, author,
  } = queryParams ?? {};
  const requestConfig : AxiosRequestConfig = {
    url: PENDING_FEED_ROUTE,
    params: makeParams(limit, offset, tag, author),
    method: 'get',
  };
  return blogAPI(injectBearerToken(requestConfig));
};

export const fetchArticle : IFetchArticle = (slug: string) : AxiosPromise<TAPIArticle> => {
  const requestConfig : AxiosRequestConfig = {
    url: `${ARTICLES_ROUTE}/${slug}`,
    method: 'get',
  };
  return blogAPI(injectBearerToken(requestConfig));
};

export const fetchPopularArticles : IFetchArticles = () : AxiosPromise<TAPIArticles> => {
  const requestConfig : AxiosRequestConfig = {
    url: `${ARTICLES_ROUTE}/top`,
    method: 'get',
  };
  return blogAPI(injectBearerToken(requestConfig));
};

export const publishArticle : IPatchArticle = (
  slug: string,
  articleData: TAPIPatchArticleData,
) : AxiosPromise<TAPIArticle> => {
  const postData = {
    article: makeArticlePatchData(articleData),
  };

  const requestConfig : AxiosRequestConfig = {
    url: `${MODERATION_ARTICLE_ROUTE}/${slug}/publish`,
    method: 'post',
    data: postData,
  };

  return blogAPI(injectBearerToken(requestConfig));
};

export const declineArticle : IPatchArticle = (
  slug: string,
  articleData: TAPIPatchArticleData,
) : AxiosPromise<TAPIArticle> => {
  const postData = {
    article: makeArticlePatchData(articleData),
  };

  const requestConfig : AxiosRequestConfig = {
    url: `${MODERATION_ARTICLE_ROUTE}/${slug}/decline`,
    method: 'post',
    data: postData,
  };

  return blogAPI(injectBearerToken(requestConfig));
};

export const setPendingArticle : IPatchArticle = (
  slug: string,
  articleData: TAPIPatchArticleData,
) : AxiosPromise<TAPIArticle> => {
  const postData = {
    article: makeArticlePatchData(articleData),
  };

  const requestConfig : AxiosRequestConfig = {
    url: `${MODERATION_ARTICLE_ROUTE}/${slug}/hold`,
    method: 'post',
    data: postData,
  };

  return blogAPI(injectBearerToken(requestConfig));
};

export const postArticle : IPostArticle = (
  articleData: TAPIPatchArticleData,
) : AxiosPromise<TAPIArticle> => {
  const postData = {
    article: makeArticlePatchData(articleData),
  };

  const requestConfig : AxiosRequestConfig = {
    url: ARTICLES_ROUTE,
    method: 'post',
    data: postData,
  };

  return blogAPI(injectBearerToken(requestConfig));
};

export const deleteArticle : IDeleteArticle = (slug: string) : AxiosPromise<null> => {
  const requestConfig : AxiosRequestConfig = {
    url: `${ARTICLES_ROUTE}/${slug}`,
    method: 'delete',
  };
  return blogAPI(injectBearerToken(requestConfig));
};

export const patchArticle : IPatchArticle = (
  slug: string,
  articleData: TAPIPatchArticleData,
) : AxiosPromise<TAPIArticle> => {
  const patchData = {
    article: makeArticlePatchData(articleData),
  };

  const requestConfig : AxiosRequestConfig = {
    url: `${ARTICLES_ROUTE}/${slug}`,
    method: 'put',
    data: patchData,
  };

  return blogAPI(injectBearerToken(requestConfig));
};

export const postLikeArticle : ILikeArticle = (slug: string) : AxiosPromise<TAPIArticle> => {
  const requestConfig : AxiosRequestConfig = {
    url: `${ARTICLES_ROUTE}/${slug}/favorite`,
    method: 'post',
  };
  return blogAPI(injectBearerToken(requestConfig));
};

export const deleteLikeArticle : ILikeArticle = (slug: string) : AxiosPromise<TAPIArticle> => {
  const requestConfig : AxiosRequestConfig = {
    url: `${ARTICLES_ROUTE}/${slug}/favorite`,
    method: 'delete',
  };
  return blogAPI(injectBearerToken(requestConfig));
};

export const fetchPopularTags : IFetchPopularTags = () : AxiosPromise<TAPIPopularTags> => {
  const requestConfig : AxiosRequestConfig = {
    url: `${TAGS_ROUTE}/top`,
    method: 'get',
  };
  return blogAPI(injectBearerToken(requestConfig));
};

export const deleteTagFollow : ITag = (tag: string) : AxiosPromise<TAPITag> => {
  const requestConfig : AxiosRequestConfig = {
    url: `${TAGS_ROUTE}/${tag}/follow`,
    method: 'delete',
  };
  return blogAPI(injectBearerToken(requestConfig));
};

export const fetchTagsFollow : IFetchTags = () : AxiosPromise<TAPITags> => {
  const requestConfig : AxiosRequestConfig = {
    url: `${TAGS_ROUTE}/follow`,
    method: 'get',
  };
  return blogAPI(injectBearerToken(requestConfig));
};

export const fetchComments : IFetchComments = (slug: string) : AxiosPromise<TAPIComments> => {
  const requestConfig : AxiosRequestConfig = {
    url: `${ARTICLES_ROUTE}/${slug}/comments`,
    method: 'get',
  };
  return blogAPI(injectBearerToken(requestConfig));
};

export const postComment : IPostComment = (
  slug: string,
  body: string,
) : AxiosPromise<TAPIComment> => {
  const postData = {
    comment: { body },
  };
  const requestConfig : AxiosRequestConfig = {
    url: `${ARTICLES_ROUTE}/${slug}/comments`,
    method: 'post',
    data: postData,
  };
  return blogAPI(injectBearerToken(requestConfig));
};

export const deleteComment : IDeleteComment = (slug: string, id: string) : AxiosPromise<null> => {
  const requestConfig : AxiosRequestConfig = {
    url: `${ARTICLES_ROUTE}/${slug}/comments/${id}`,
    method: 'delete',
  };
  return blogAPI(injectBearerToken(requestConfig));
};

export const fetchProfile : IProfile = (username: string) : AxiosPromise<TAPIProfile> => {
  const requestConfig : AxiosRequestConfig = {
    url: `${PROFILES_ROUTE}/${username}`,
    method: 'get',
  };
  return blogAPI(injectBearerToken(requestConfig));
};

export const postFollowProfile : IProfile = (username: string) : AxiosPromise<TAPIProfile> => {
  const requestConfig : AxiosRequestConfig = {
    url: `${PROFILES_ROUTE}/${username}/follow`,
    method: 'post',
  };
  return blogAPI(injectBearerToken(requestConfig));
};

export const deleteFollowProfile : IProfile = (username: string) : AxiosPromise<null> => {
  const requestConfig : AxiosRequestConfig = {
    url: `${PROFILES_ROUTE}/${username}/follow`,
    method: 'delete',
  };
  return blogAPI(injectBearerToken(requestConfig));
};

export const postTagFollow : ITag = (tag: string) : AxiosPromise<TAPITag> => {
  const requestConfig : AxiosRequestConfig = {
    url: `${TAGS_ROUTE}/${tag}/follow`,
    method: 'post',
  };
  return blogAPI(injectBearerToken(requestConfig));
};

export const fetchInviteCode : IInvite = () : AxiosPromise<TAPIInvite> => {
  const requestConfig: AxiosRequestConfig = {
    url: INVITE_ROUTE,
    method: 'post',
  };
  return blogAPI(injectBearerToken(requestConfig));
};

export const fetchAllUsers : IFetchAllUsers = () : AxiosPromise<TAPIUsers> => {
  const requestConfig: AxiosRequestConfig = {
    url: ADMIN_USERS_ROUTE,
    method: 'get',
  };
  return blogAPI(injectBearerToken(requestConfig));
};

export const patchUserRoles : IPatchUserRoles = (
  slug: string,
  data: TAPIRolesData,
) : AxiosPromise<TAPIUser> => {
  const requestConfig : AxiosRequestConfig = {
    url: `${ADMIN_USERS_ROUTE}/${slug}/roles`,
    method: 'patch',
    data,
  };
  return blogAPI(injectBearerToken(requestConfig));
};

const uploadRequestConfig : AxiosRequestConfig = {
  baseURL: API_ROOT,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
};
const injectBearerTokenUpload = (requestConfig : AxiosRequestConfig) : AxiosRequestConfig => {
  if (jwt.test()) {
    return { ...requestConfig, headers: { ...uploadRequestConfig.headers, Authorization: `Bearer ${jwt.get()}` } };
  }
  return requestConfig;
};
export const postImageUpload : IPostImageUpload = (data: TFile) : AxiosPromise<TAPIUploadImage> => {
  const requestConfig : AxiosRequestConfig = {
    url: `${UPLOAD_ROUTE}`,
    method: 'post',
    data,
  };
  return blogAPI(injectBearerTokenUpload(requestConfig));
};
