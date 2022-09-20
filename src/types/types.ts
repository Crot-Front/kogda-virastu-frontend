export type TUser = {
  email: string;
  username: string;
  roles?: Array<string>,
  bio?: string;
  image?:string;
  nickname?: string;
  friendInvite?: string,
  confirmPassword?: null | string,
  _id?: string,
};

export type TUsers = {
  users: Array<TUser>,
};

// Исправлено и переименовано по модели данных сервера
export type TProfile = {
  following: boolean;
  image?: string;
  username: string;
  email: string;
  bio?: string;
  nickname?: string;
};

type TPopularTag = {
  count: number,
  name: string,
};

export type TPopularTags = Array<TPopularTag>;

export type TTags = Array<string>;

export type TArticle = {
  author: TProfile;
  body: string;
  createdAt: string;
  description: string;
  link?: string ;
  favorited: boolean;
  favoritesCount: number;
  slug: string;
  state: string;
  tagList: TTags;
  title: string;
  updatedAt: string;
};

export type TArticleCore = Omit<TArticle,
'author' |
'createdAt' |
'favorited' |
'favoritesCount' |
'slug' |
'updatedAt'>;

export type TArticles = Array<TArticle>;

export type TComment = {
  id: string;
  body: string;
  createdAt: string;
  author: TProfile;
};

export type TComments = Array<TComment>;

export enum FeedTypes {
  public = 'public',
  private = 'private',
  moderation = 'moderation',
  tags = 'tags',
}
export enum UserArticlesTypes {
  my = 'my',
  favorite = 'favorite',
}

export type TTag = string;

export type TInvite = string;
