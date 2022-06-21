import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TAPIError } from '../services/api.types';

type TAPIState = {
  successMessage: string | null,
  errorMessage: string | null,
  errorObject: TAPIError | null,
  isUserRegistering: boolean,
  isUserFetching: boolean,
  isUserLoggingIn: boolean,
  isUserPatching: boolean,
  isPublicFeedFetching: boolean,
  isPopularPostsRequested: boolean,
  isPopularPostsSucceeded: boolean,
  isArticleFetching: boolean,
  isArticleNotFound: boolean,
  isPrivateFeedFetching: boolean,
  isPendingFeedFetching: boolean,
  isArticlePosting: boolean,
  isArticlePostingSucceeded: boolean,
  isDeclineArticlePosting: boolean,
  isDeclineArticleSucceeded: boolean,
  isArticleDeleting: boolean,
  isArticleRemoved: boolean,
  isArticlePatching: boolean,
  isArticlePatchingSucceeded: boolean,
  isLikeArticlePosting: boolean,
  isLikeArticleDeleting: boolean,
  isTagsFetching: boolean,
  isCommentsFetching: boolean,
  isCommentPosting: boolean,
  isCommentDeleting: boolean,
  isProfileFetching: boolean,
  isProfileNotFound: boolean,
  isFollowProfilePosting: boolean,
  isFollowProfileDeleting: boolean,
  isSettingsPatching: boolean,
  isSettingsUpdateSucceeded: boolean,
  isAllPostsRequested: boolean,
  isTagFollowing: boolean,
  isTagFollowDeleting: boolean,
  isTagsFollowFetching: boolean,
  isInviteFetching: boolean,
  isVisible: boolean,
  isAllUsersFetching: boolean,
  isUserRolesFetching: boolean,
  isUploadFetching: boolean,
};

const initialState : TAPIState = {
  successMessage: null,
  errorMessage: null,
  errorObject: null,
  isUserRegistering: false,
  isUserLoggingIn: false,
  isUserFetching: false,
  isUserPatching: false,
  isPublicFeedFetching: false,
  isPopularPostsRequested: false,
  isPopularPostsSucceeded: false,
  isArticleFetching: false,
  isArticleNotFound: false,
  isPrivateFeedFetching: false,
  isPendingFeedFetching: false,
  isArticlePosting: false,
  isArticlePostingSucceeded: false,
  isDeclineArticlePosting: false,
  isDeclineArticleSucceeded: false,
  isArticleDeleting: false,
  isArticleRemoved: false,
  isArticlePatching: false,
  isArticlePatchingSucceeded: false,
  isLikeArticlePosting: false,
  isLikeArticleDeleting: false,
  isTagsFetching: false,
  isCommentsFetching: false,
  isCommentPosting: false,
  isCommentDeleting: false,
  isProfileFetching: false,
  isProfileNotFound: false,
  isFollowProfilePosting: false,
  isFollowProfileDeleting: false,
  isSettingsPatching: false,
  isSettingsUpdateSucceeded: false,
  isAllPostsRequested: false,
  isTagFollowing: false,
  isTagFollowDeleting: false,
  isTagsFollowFetching: false,
  isInviteFetching: false,
  isVisible: false,
  isAllUsersFetching: false,
  isUserRolesFetching: false,
  isUploadFetching: false,
};

const apiSlice = createSlice({
  name: 'api',
  initialState,
  reducers: {
    setSuccessMessage: (state, action: PayloadAction<string>) => ({
      ...state, successMessage: action.payload,
    }),
    clearSuccessMessage: (state) => ({
      ...state, successMessage: null,
    }),
    setErrorMessage: (state, action: PayloadAction<string>) => ({
      ...state, errorMessage: action.payload,
    }),
    clearErrorMessage: (state) => ({
      ...state, errorMessage: null,
    }),
    setErrorObject: (state, action: PayloadAction<TAPIError>) => ({
      ...state, errorObject: action.payload,
    }),
    clearErrorObject: (state) => ({
      ...state, errorObject: null,
    }),
    allPostsRequested: (state) => ({
      ...state, isAllPostsRequested: true,
    }),
    allPostsRequestSucceeded: (state) => ({
      ...state, isAllPostsRequested: false,
    }),
    allPostsRequestFailed: (state, action: PayloadAction<TAPIError>) => ({
      ...state, isUserRegistering: false, errorObject: action.payload,
    }),
    userRegistrationRequested: (state) => ({
      ...state, isUserRegistering: true,
    }),
    userRegistrationSucceeded: (state) => ({
      ...state, isUserRegistering: false,
    }),
    userRegistrationFailed: (state, action: PayloadAction<TAPIError>) => ({
      ...state, isUserRegistering: false, errorObject: action.payload,
    }),
    userLoginRequested: (state) => ({
      ...state, isUserLoggingIn: true,
    }),
    userLoginSucceeded: (state) => ({
      ...state, isUserLoggingIn: false,
    }),
    userLoginFailed: (state, action: PayloadAction<TAPIError>) => ({
      ...state, isUserLoggingIn: false, errorObject: action.payload,
    }),
    userFetchRequested: (state) => ({
      ...state, isUserFetching: true,
    }),
    userFetchSucceeded: (state) => ({
      ...state, isUserFetching: false,
    }),
    userFetchFailed: (state, action: PayloadAction<TAPIError>) => ({
      ...state, isUserFetching: false, errorObject: action.payload,
    }),
    userPatchRequested: (state) => ({
      ...state, isUserPatching: true,
    }),
    userPatchSucceeded: (state) => ({
      ...state, isUserPatching: false,
    }),
    userPatchFailed: (state, action: PayloadAction<TAPIError>) => ({
      ...state, isUserPatching: false, errorObject: action.payload,
    }),
    publicFeedRequested: (state) => ({
      ...state, isPublicFeedFetching: true,
    }),
    publicFeedSucceeded: (state) => ({
      ...state, isPublicFeedFetching: false,
    }),
    publicFeedFailed: (state, action: PayloadAction<TAPIError>) => ({
      ...state, isPublicFeedFetching: false, errorObject: action.payload,
    }),
    articleFetchRequested: (state) => ({
      ...state, isArticleFetching: true, isArticleNotFound: false,
    }),
    articleFetchSucceeded: (state) => ({
      ...state, isArticleFetching: false, isArticleNotFound: false,
    }),
    articleFetchFailed: (state, action: PayloadAction<TAPIError>) => ({
      ...state, isArticleFetching: false, errorObject: action.payload,
    }),
    setArticleFetchNotFound: (state) => ({
      ...state, isArticleNotFound: true,
    }),
    clearArticleFetchNotFound: (state) => ({
      ...state, isArticleNotFound: false,
    }),
    popularPostsRequested: (state) => ({
      ...state, isPopularPostsRequested: true, isPopularPostsSucceeded: false,
    }),
    popularPostsRequestSucceeded: (state) => ({
      ...state, isPopularPostsRequested: false, isPopularPostsSucceeded: true,
    }),
    popularPostsRequestFailed: (state, action: PayloadAction<TAPIError>) => ({
      ...state,
      isPopularPostsRequested: false,
      isPopularPostsSucceeded: false,
      errorObject: action.payload,
    }),
    privateFeedRequested: (state) => ({
      ...state, isPrivateFeedFetching: true,
    }),
    privateFeedSucceeded: (state) => ({
      ...state, isPrivateFeedFetching: false,
    }),
    privateFeedFailed: (state, action: PayloadAction<TAPIError>) => ({
      ...state, isPrivateFeedFetching: false, errorObject: action.payload,
    }),
    pendingFeedRequested: (state) => ({
      ...state, isPendingFeedFetching: true,
    }),
    pendingFeedSucceeded: (state) => ({
      ...state, isPendingFeedFetching: false,
    }),
    pendingFeedFailed: (state, action: PayloadAction<TAPIError>) => ({
      ...state, isPendingFeedFetching: false, errorObject: action.payload,
    }),
    articlePostRequested: (state) => ({
      ...state, isArticlePosting: true, isArticlePostingSucceeded: false,
    }),
    articlePostSucceeded: (state) => ({
      ...state, isArticlePosting: false, isArticlePostingSucceeded: true,
    }),
    articlePostClear: (state) => ({
      ...state,
      isArticlePosting: false,
      isArticlePostingSucceeded: false,
      successMessage: null,
      errorMessage: null,
      errorObject: null,
    }),
    articlePostFailed: (state, action: PayloadAction<TAPIError>) => ({
      ...state, isArticlePosting: false, errorObject: action.payload,
    }),
    declineArticleRequested: (state) => ({
      ...state, isDeclineArticlePosting: true, isDeclineArticleSucceeded: false,
    }),
    declineArticleSucceeded: (state) => ({
      ...state, isDeclineArticlePosting: false, isDeclineArticleSucceeded: true,
    }),
    declineArticleFailed: (state, action: PayloadAction<TAPIError>) => ({
      ...state, isDeclineArticlePosting: false, errorObject: action.payload,
    }),
    articleDeleteRequested: (state) => ({
      ...state, isArticleDeleting: true, isArticleRemoved: false,
    }),
    articleDeleteSucceeded: (state) => ({
      ...state, isArticleDeleting: false, isArticleRemoved: true,
    }),
    articleDeleteFailed: (state, action: PayloadAction<TAPIError>) => ({
      ...state, isArticleDeleting: false, errorObject: action.payload,
    }),
    articleDeleteClear: (state) => ({
      ...state,
      isArticleDeleting: false,
      isArticleRemoved: false,
      successMessage: null,
      errorMessage: null,
      errorObject: null,
    }),
    articlePatchRequested: (state) => ({
      ...state, isArticlePatching: true,
    }),
    articlePatchSucceeded: (state) => ({
      ...state, isArticlePatching: false, isArticlePatchingSucceeded: true,
    }),
    articlePatchClear: (state) => ({
      ...state,
      isArticlePatching: false,
      isArticlePatchingSucceeded: false,
      successMessage: null,
      errorMessage: null,
      errorObject: null,
    }),
    articlePatchFailed: (state, action: PayloadAction<TAPIError>) => ({
      ...state, isArticlePatching: false, errorObject: action.payload,
    }),
    likeArticlePostRequested: (state) => ({
      ...state, isLikeArticlePosting: true,
    }),
    likeArticlePostSucceeded: (state) => ({
      ...state, isLikeArticlePosting: false,
    }),
    likeArticlePostFailed: (state, action: PayloadAction<TAPIError>) => ({
      ...state, isLikeArticlePosting: false, errorObject: action.payload,
    }),
    likeArticleDeleteRequested: (state) => ({
      ...state, isLikeArticleDeleting: true,
    }),
    likeArticleDeleteSucceeded: (state) => ({
      ...state, isLikeArticleDeleting: false,
    }),
    likeArticleDeleteFailed: (state, action: PayloadAction<TAPIError>) => ({
      ...state, isLikeArticleDeleting: false, errorObject: action.payload,
    }),
    tagsFetchRequested: (state) => ({
      ...state, isTagsFetching: true,
    }),
    tagsFetchSucceeded: (state) => ({
      ...state, isTagsFetching: false,
    }),
    tagsFetchFailed: (state, action: PayloadAction<TAPIError>) => ({
      ...state, isTagsFetching: false, errorObject: action.payload,
    }),
    commentsFetchRequested: (state) => ({
      ...state, isCommentsFetching: true,
    }),
    commentsFetchSucceeded: (state) => ({
      ...state, isCommentsFetching: false,
    }),
    commentsFetchFailed: (state, action: PayloadAction<TAPIError>) => ({
      ...state, isCommentsFetching: false, errorObject: action.payload,
    }),
    commentPostRequested: (state) => ({
      ...state, isCommentPosting: true,
    }),
    commentPostSucceeded: (state) => ({
      ...state, isCommentPosting: false,
    }),
    commentPostFailed: (state, action: PayloadAction<TAPIError>) => ({
      ...state, isCommentPosting: false, errorObject: action.payload,
    }),
    commentDeleteRequested: (state) => ({
      ...state, isCommentDeleting: true,
    }),
    commentDeleteSucceeded: (state) => ({
      ...state, isCommentDeleting: false,
    }),
    commentDeleteFailed: (state, action: PayloadAction<TAPIError>) => ({
      ...state, isCommentDeleting: false, errorObject: action.payload,
    }),
    profileFetchRequested: (state) => ({
      ...state, isProfileFetching: true, isProfileNotFound: false,
    }),
    profileFetchSucceeded: (state) => ({
      ...state, isProfileFetching: false, isProfileNotFound: false,
    }),
    profileFetchFailed: (state, action: PayloadAction<TAPIError>) => ({
      ...state, isProfileFetching: false, errorObject: action.payload,
    }),
    setProfileFetchNotFound: (state) => ({
      ...state, isProfileNotFound: true,
    }),
    clearProfileFetchNotFound: (state) => ({
      ...state, isProfileNotFound: false,
    }),
    followProfilePostRequested: (state) => ({
      ...state, isFollowProfilePosting: true,
    }),
    followProfilePostSucceeded: (state) => ({
      ...state, isFollowProfilePosting: false,
    }),
    followProfilePostFailed: (state, action: PayloadAction<TAPIError>) => ({
      ...state, isFollowProfilePosting: false, errorObject: action.payload,
    }),
    followProfileDeleteRequested: (state) => ({
      ...state, isFollowProfileDeleting: true,
    }),
    followProfileDeleteSucceeded: (state) => ({
      ...state, isFollowProfileDeleting: false,
    }),
    followProfileDeleteFailed: (state, action: PayloadAction<TAPIError>) => ({
      ...state, isFollowProfileDeleting: false, errorObject: action.payload,
    }),
    settingsPatchRequested: (state) => ({
      ...state, isSettingsPatching: true, isSettingsUpdateSucceeded: false,
    }),
    settingsPatchSucceeded: (state) => ({
      ...state, isSettingsPatching: false, isSettingsUpdateSucceeded: true,
    }),
    settingsResetUpdateSucceeded: (state) => ({
      ...state, isSettingsUpdateSucceeded: false, errorObject: null,
    }),
    settingsPatchFailed: (state, action: PayloadAction<TAPIError>) => ({
      ...state,
      isSettingsPatching: false,
      isSettingsUpdateSucceeded: false,
      errorObject: action.payload,
    }),
    tagFollowRequested: (state) => ({
      ...state, isTagFollowing: true,
    }),
    tagFollowSucceeded: (state) => ({
      ...state, isTagFollowing: false,
    }),
    tagFollowFailed: (state, action: PayloadAction<TAPIError>) => ({
      ...state, isTagFollowing: false, errorObject: action.payload,
    }),
    tagFollowVisible: (state, action: PayloadAction<boolean>) => ({
      ...state, isVisible: action.payload,
    }),
    tagFollowDeleteRequested: (state) => ({
      ...state, isTagFollowDeleting: true,
    }),
    tagFollowDeleteSucceeded: (state) => ({
      ...state, isTagFollowDeleting: false,
    }),
    tagFollowDeleteFailed: (state, action: PayloadAction<TAPIError>) => ({
      ...state, isTagFollowDeleting: false, errorObject: action.payload,
    }),
    tagsFollowFetchRequested: (state) => ({
      ...state, isTagsFollowFetching: true,
    }),
    tagsFollowFetchSucceeded: (state) => ({
      ...state, isTagsFollowFetching: false,
    }),
    tagsFollowFetchFailed: (state, action: PayloadAction<TAPIError>) => ({
      ...state, isTagsFollowFetching: false, errorObject: action.payload,
    }),
    inviteGetRequested: (state) => ({
      ...state, isInviteFetching: true,
    }),
    inviteGetSucceeded: (state) => ({
      ...state, isInviteFetching: false,
    }),
    inviteGetFailed: (state, action: PayloadAction<TAPIError>) => ({
      ...state, isInviteFetching: false, errorObject: action.payload,
    }),
    allUsersFetchRequested: (state) => ({
      ...state, isAllUsersFetching: true,
    }),
    allUsersFetchSucceeded: (state) => ({
      ...state, isAllUsersFetching: false,
    }),
    allUsersFetchFailed: (state, action: PayloadAction<TAPIError>) => ({
      ...state, isAllUsersFetching: false, errorObject: action.payload,
    }),
    userRolesFetchRequested: (state) => ({
      ...state, isUserRolesFetching: true,
    }),
    userRolesFetchSucceeded: (state) => ({
      ...state, isUserRolesFetching: false,
    }),
    userRolesFetchFailed: (state, action: PayloadAction<TAPIError>) => ({
      ...state, isUserRolesFetching: false, errorObject: action.payload,
    }),
    uploadFetchRequested: (state) => ({
      ...state, isUploadFetching: true,
    }),
    uploadFetchSucceeded: (state) => ({
      ...state, isUploadFetching: false,
    }),
    uploadFetchFailed: (state, action: PayloadAction<TAPIError>) => ({
      ...state, isUploadFetching: false, errorObject: action.payload,
    }),
  },
});

const apiReducer = apiSlice.reducer;
export const {
  inviteGetRequested,
  inviteGetSucceeded,
  inviteGetFailed,
  setSuccessMessage,
  setErrorMessage,
  clearSuccessMessage,
  clearErrorMessage,
  clearErrorObject,
  setErrorObject,
  userRegistrationRequested,
  userRegistrationSucceeded,
  userRegistrationFailed,
  userLoginRequested,
  userLoginSucceeded,
  userLoginFailed,
  userFetchRequested,
  userFetchSucceeded,
  userFetchFailed,
  userPatchRequested,
  userPatchSucceeded,
  userPatchFailed,
  publicFeedRequested,
  publicFeedSucceeded,
  publicFeedFailed,
  popularPostsRequested,
  popularPostsRequestSucceeded,
  popularPostsRequestFailed,
  articleFetchRequested,
  articleFetchSucceeded,
  articleFetchFailed,
  privateFeedRequested,
  privateFeedSucceeded,
  privateFeedFailed,
  pendingFeedRequested,
  pendingFeedSucceeded,
  pendingFeedFailed,
  articlePostRequested,
  articlePostSucceeded,
  declineArticleRequested,
  declineArticleSucceeded,
  declineArticleFailed,
  articlePostFailed,
  articleDeleteRequested,
  articleDeleteSucceeded,
  articleDeleteFailed,
  articlePatchRequested,
  articlePatchSucceeded,
  articlePatchFailed,
  likeArticlePostRequested,
  likeArticlePostSucceeded,
  likeArticlePostFailed,
  likeArticleDeleteRequested,
  likeArticleDeleteSucceeded,
  likeArticleDeleteFailed,
  tagsFetchRequested,
  tagsFetchSucceeded,
  tagsFetchFailed,
  commentsFetchRequested,
  commentsFetchSucceeded,
  commentsFetchFailed,
  commentPostRequested,
  commentPostSucceeded,
  commentPostFailed,
  commentDeleteRequested,
  commentDeleteSucceeded,
  commentDeleteFailed,
  profileFetchRequested,
  profileFetchSucceeded,
  profileFetchFailed,
  followProfilePostRequested,
  followProfilePostSucceeded,
  followProfilePostFailed,
  followProfileDeleteRequested,
  followProfileDeleteSucceeded,
  followProfileDeleteFailed,
  settingsPatchFailed,
  settingsPatchRequested,
  settingsPatchSucceeded,
  settingsResetUpdateSucceeded,
  allPostsRequested,
  allPostsRequestSucceeded,
  allPostsRequestFailed,
  setArticleFetchNotFound,
  clearArticleFetchNotFound,
  clearProfileFetchNotFound,
  setProfileFetchNotFound,
  articleDeleteClear,
  articlePatchClear,
  articlePostClear,
  tagFollowRequested,
  tagFollowSucceeded,
  tagFollowFailed,
  tagFollowDeleteRequested,
  tagFollowDeleteSucceeded,
  tagFollowDeleteFailed,
  tagsFollowFetchRequested,
  tagsFollowFetchSucceeded,
  tagsFollowFetchFailed,
  tagFollowVisible,
  allUsersFetchRequested,
  allUsersFetchSucceeded,
  allUsersFetchFailed,
  userRolesFetchRequested,
  userRolesFetchSucceeded,
  userRolesFetchFailed,
  uploadFetchRequested,
  uploadFetchSucceeded,
  uploadFetchFailed,
} = apiSlice.actions;

export default apiReducer;
