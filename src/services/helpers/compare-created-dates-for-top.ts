import { TArticle } from '../types';

const compareCreatedDatesForTop = (
  first : TArticle,
  second : TArticle,
) : number => +new Date(second.createdAt) - +new Date(first.createdAt);

export default compareCreatedDatesForTop;
