import React, { FC, MouseEvent } from 'react';
import styled from 'styled-components';
import { nanoid } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from '../services/hooks';
import { setTagsFollow } from '../store';
import Tag from './tag';
import addTagFollowThunk from '../thunks/add-tag-follow-thunk';
import deleteTagFollowThunk from '../thunks/delete-tag-follow-thunk';

type TBarTags = {
  tagList: string[],
};

type TLists = {
  isHasImage?: boolean,
  rowReverse?: boolean;
};

const Lists = styled.ul<TLists>`
    margin: 0;
    display: flex;
    box-sizing:border-box;
    flex-wrap:wrap;
    /*
    flex-direction: ${({ rowReverse }) => rowReverse && 'row-reverse'};
    */

    gap: 4px 24px;
    //width:526px;
    white-space: pre-line;
    padding:0;
    @media screen and (max-width:768px) {
        max-width:453px;
        ${({ isHasImage }) => isHasImage && 'margin-left: -60px'}
     }
     
     @media screen and (max-width:600px) {
        max-width:352px;
        margin:0;

        flex-direction: row;
     }
`;

Lists.defaultProps = {
  isHasImage: false,
  rowReverse: false,
};

const List = styled.li`
    list-style-type: none;
`;

const BarTags: FC<TBarTags & TLists> = ({ tagList, isHasImage = false, rowReverse = false }) => {
  const { tagsFollow } = useSelector((state) => state.view);

  const dispatch = useDispatch();
  const handleClickTag = (e: MouseEvent<HTMLButtonElement>, tag: string) => {
    e.preventDefault();
    dispatch(addTagFollowThunk(tag));
    if (tagsFollow) {
      dispatch(setTagsFollow([...tagsFollow, tag]));
    } else {
      dispatch(setTagsFollow([tag]));
    }
  };

  const deactivateTagFollow = (e: React.MouseEvent, tag: string) => {
    e.stopPropagation();
    dispatch(deleteTagFollowThunk(tag));
    dispatch(setTagsFollow(tagsFollow!.filter((el) => el !== tag)));
  };

  return (
    <Lists isHasImage={isHasImage} rowReverse={rowReverse}>
      {tagList.map((tag) => (
        <List key={nanoid(10)}>
          <Tag
            tag={tag}
            isActive={!!tagsFollow?.includes(tag)}
            handleClick={handleClickTag}
            deactivateTag={(e) => deactivateTagFollow(e, tag)} />
        </List>
      ))}
    </Lists>
  );
};

BarTags.defaultProps = {
  isHasImage: false,
  rowReverse: false,
};

export default BarTags;
