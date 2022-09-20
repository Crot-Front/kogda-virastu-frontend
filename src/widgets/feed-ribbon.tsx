import React, { FC, MouseEventHandler } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from '../services/hooks';
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
  row-gap: 32px;
  
  @media screen and (max-width: 765px) {
    grid-template-columns: 1fr;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const ItemWrapper = styled.li`
  position: relative;
  width: 100%;
  height: 100%;
  list-style: none outside;
  margin: 0 auto;
  padding: 0;
  margin-block-start: 0;
  margin-block-end: 0;
  padding-inline-start: 0;
  padding-inline-end: 0;
  border-bottom: 1px solid #CCC;

  @media screen and (max-width: 765px) {
    border-bottom: none;
  }
`;

const FeedRibbon : FC = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.view.feed);
  const tags = useSelector((state) => state.view.selectedTags) ?? [];

  if (posts) {
    posts.filter((post) => post.tagList.some((tag) => (tags.includes(tag))));
  }

  return (
    <ScrollRibbon>
      <RibbonWrapper>
        {posts?.filter((post) => post.tagList.some((tag) => (tags.includes(tag)
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
