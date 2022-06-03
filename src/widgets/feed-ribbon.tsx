import React, { FC, MouseEventHandler } from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { useDispatch, useSelector } from '../services/hooks';
import { RegularText } from '../ui-lib';
import ScrollRibbon from './scroll-ribbon';
import ArticleFullPreview from './article-full-preview';
import { addLikeThunk, deleteLikeThunk } from '../thunks';

const RibbonWrapper = styled.ul`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: grid;
  align-items: start;
  grid-template-columns: 1fr 1fr;
  justify-content: flex-start;
  list-style: none outside;
  margin: 0;
  padding: 0;
  margin-block-start: 0;
  margin-block-end: 0;
  padding-inline-start: 0;
  padding-inline-end: 0;
  column-gap: 32px;
  row-gap: 32px;
  @media screen and (max-width: 765px) {
    grid-template-columns: 1fr;
}
`;

const ItemWrapper = styled.li`
  width: 100%;
  max-width: 360px;
  height: 100%;
  list-style: none outside;
  margin: 0 auto;
  padding: 0;
  margin-block-start: 0;
  margin-block-end: 0;
  padding-inline-start: 0;
  padding-inline-end: 0;
  border-bottom: 1px solid #CCCCCC;

  @media screen and (max-width: 1030px) {
    max-width: 226px;
}

@media screen and (max-width: 765px) {
  width: 100%;
  max-width: none;
}
`;

const FeedRibbon : FC = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.view.feed);
  const tags = useSelector((state) => state.view.selectedTags) ?? [];
  const { isPublicFeedFetching } = useSelector((state) => state.api);
  if (!posts || isPublicFeedFetching) {
    return (
      <RegularText size='large' weight={500}>
        <FormattedMessage id='loading' />
      </RegularText>
    );
  }
  return (
    <ScrollRibbon>
      <RibbonWrapper>
        {posts.filter((post) => post.tagList.some((tag) => (tags.includes(tag)
            || !tags
            || tags.length < 1))).map((post) => {
          const onClick : MouseEventHandler = () => {
            if (post.favorited) {
              dispatch(deleteLikeThunk(post.slug));
            } else {
              dispatch(addLikeThunk(post.slug));
            }
          };
          return (
            <ItemWrapper key={post.slug}>
              <ArticleFullPreview
                article={post}
                onLikeClick={onClick} />
            </ItemWrapper>
          );
        })}
      </RibbonWrapper>
    </ScrollRibbon>
  );
};

export default FeedRibbon;
