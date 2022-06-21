import { AxiosPromise } from 'axios';
import {
  TAPIArticle,
  TAPIArticles,
  TAPIAuth,
  TAPIComment,
  TAPIComments,
  TAPIParamsObject,
  TAPIPatchArticleData,
  TAPIProfile,
  TAPITags,
  TAPIPopularTags,
  TAPIUser,
  TAPITag,
  TAPIInvite,
  TAPIUsers,
  TAPIRolesData,
  TAPIUploadImage,
  TFile,
} from '../services/api.types';

export interface IRegisterUser {
  (username: string,
    email: string,
    password: string,
    nickname?: string,
    invite?: string,) : AxiosPromise<TAPIAuth>;
}

export interface ILoginUser {
  (email: string, password: string) : AxiosPromise<TAPIAuth>;
}

export interface IFetchUser {
  () : AxiosPromise<TAPIAuth>;
}

export interface IPatchUser {
  ({
    username, email, password, bio, image, nickname,
  }: {
    username?: string,
    email?: string,
    password?: string,
    bio?: string,
    image?:string,
    nickname?: string,
  }) : AxiosPromise<TAPIAuth>;
}

export interface IFetchArticles {
  (queryParams?: TAPIParamsObject) : AxiosPromise<TAPIArticles>;
}

export interface IFetchArticle {
  (slug: string) : AxiosPromise<TAPIArticle>;
}

export interface IPostArticle {
  (articleData: TAPIPatchArticleData) : AxiosPromise<TAPIArticle>;
}

export interface IDeleteArticle {
  (slug: string) : AxiosPromise<null>;
}

export interface IPatchArticle {
  (slug: string, data: TAPIPatchArticleData,) : AxiosPromise<TAPIArticle>;
}

export interface ILikeArticle {
  (slug: string) : AxiosPromise<TAPIArticle>;
}

export interface IFetchTags {
  () : AxiosPromise<TAPITags>
}

export interface IFetchPopularTags {
  () : AxiosPromise<TAPIPopularTags>
}

export interface IFetchComments {
  (slug: string) : AxiosPromise<TAPIComments>;
}

export interface IPostComment {
  (slug: string, body: string) : AxiosPromise<TAPIComment>;
}

export interface IDeleteComment {
  (slug: string, id: string) : AxiosPromise<null>;
}

export interface IProfile {
  (username: string) : AxiosPromise<TAPIProfile | null>
}

export interface ITag {
  (tag: string) : AxiosPromise<TAPITag>
}

export interface IInvite {
  (): AxiosPromise<TAPIInvite>
}

export interface IFetchAllUsers {
  () : AxiosPromise<TAPIUsers>;
}

export interface IPatchUserRoles {
  (slug: string, data: TAPIRolesData) : AxiosPromise<TAPIUser>;
}

export interface IPostImageUpload {
  (data: TFile) : AxiosPromise<TAPIUploadImage>
}

export type {
  TAPIArticle,
  TAPIArticles,
  TAPIComment,
  TAPIComments,
  TAPIProfile,
  TAPITags,
  TAPIUser,
  TAPITag,
  TAPIInvite,
};
