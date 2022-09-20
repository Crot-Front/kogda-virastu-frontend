import { TArticle } from '../types';

const compareLikesForTop = (
  first : TArticle,
  second : TArticle,
) : number => second.favoritesCount - first.favoritesCount;

export default compareLikesForTop;
