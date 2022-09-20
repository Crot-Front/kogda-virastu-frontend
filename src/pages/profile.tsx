import React, { FC, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { batch } from 'react-redux';
import styled from 'styled-components';
import { useDispatch, useSelector } from '../services/hooks';
import { ProfileWidget, FeedRibbon } from '../widgets';
import {
  getPublicFeedThunk,
  getUserProfileThunk,
} from '../thunks';
import {
  clearProfileFetchNotFound, clearErrorMessage, clearErrorObject, clearView,
} from '../store';
import ProfilePageLayout from '../layouts/profile-page-layout';

const FeedConteiner = styled.div`
  margin: 0 auto;
`;

const Profile: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profile = useSelector(
    (state) => state.view.profile,
  )
    ?? {
      username: '',
      nickname: '',
      following: false,
      email: '',
      bio: '',
      image: '',
    };

  const isUser = useSelector(
    (state) => !!state.profile.username
      && !!state.profile.email
      && (state.profile.username === state.view.profile?.username),
  );
  const { isProfileNotFound } = useSelector((state) => state.api);
  const totalCount = useSelector((state) => state.all.articlesCount);
  const { username } = useParams<{ username: string }>();

  useEffect(() => {
    batch(() => {
      dispatch(clearView());
      dispatch(getUserProfileThunk(username));
    });
    return () => {
      dispatch(clearView());
    };
  }, [dispatch, username]);

  useEffect(() => {
    if (!!profile.username && !!totalCount) {
      dispatch(getPublicFeedThunk({ limit: totalCount ?? 20, author: username }));
    }
  }, [dispatch, username, totalCount, profile.username]);

  useEffect(() => {
    if (isProfileNotFound) {
      batch(() => {
        dispatch(clearProfileFetchNotFound());
        dispatch(clearErrorObject());
        dispatch(clearErrorMessage());
      });
      navigate('/no-user');
    }
  }, [dispatch, navigate, isProfileNotFound]);

  return (
    <ProfilePageLayout>
      <ProfileWidget
        userName={profile.nickname ?? profile.username}
        isFollow={profile.following}
        userImage={profile.image}
        isUser={isUser}
        size='large'
        distance={0}
        color=''
        bio={profile.bio} />
      <FeedConteiner>
        <FeedRibbon />
      </FeedConteiner>
    </ProfilePageLayout>

  );
};

export default Profile;
