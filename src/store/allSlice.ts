import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TArticles, TPopularTags } from '../types/types';
import { TThemes } from '../types/styles.types';
import themes from '../themes';
import { TVocabularies } from '../types/vocabularies.types';
import vocabularies from '../vocabularies';

type TAllState = {
  articles: TArticles | null;
  popularArticles: TArticles | null;
  articlesCount: number;
  tags: TPopularTags | null;
  themes: TThemes,
  themesNames: Array<string>,
  vocabularies: TVocabularies,
  langNames: Array<string>,
};
const initialState : TAllState = {
  articles: null,
  popularArticles: null,
  articlesCount: 0,
  tags: null,
  themes,
  themesNames: Object.keys(themes),
  vocabularies,
  langNames: Object.keys(vocabularies),
};

const allSlice = createSlice({
  name: 'all',
  initialState,
  reducers: {
    setAllArticles: (state, action: PayloadAction<TArticles>) => ({
      ...state, articles: action.payload,
    }),
    setPopularArticles: (state, action: PayloadAction<TArticles>) => ({
      ...state, popularArticles: action.payload,
    }),
    setAllArticlesCount: (state, action: PayloadAction<number>) => ({
      ...state, articlesCount: action.payload,
    }),
    setPopularTags: (state, action: PayloadAction<TPopularTags>) => ({
      ...state, tags: action.payload,
    }),
    clearArticles: (state) => ({ ...state, articles: null }),
    clearTags: (state) => ({ ...state, tags: null }),
    clearAll: (state) => ({ ...state, articles: null, tags: null }),
    setAllThemes: (state, action: PayloadAction<TThemes>) => ({
      ...state, themes: action.payload,
    }),
    setAllVocabularies: (state, action:PayloadAction<TVocabularies>) => ({
      ...state, vocabularies: action.payload,
    }),
  },
});

const allReducer = allSlice.reducer;
export const {
  setAllArticles,
  setPopularArticles,
  setAllArticlesCount,
  setPopularTags,
  clearArticles,
  clearTags,
  clearAll,
  setAllThemes,
  setAllVocabularies,
} = allSlice.actions;
export default allReducer;
