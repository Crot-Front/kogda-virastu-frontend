import { IComparator, TArticles } from '../types';

const makeTopFeed = (
  articles: TArticles,
  qty: number,
  compareFunction?: IComparator,
) : TArticles => articles.slice().sort(compareFunction).slice(0, qty ?? 5);

export default makeTopFeed;
