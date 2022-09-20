import React, { FC, MouseEvent, useState } from 'react';
import styled, { keyframes, useTheme } from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { nanoid } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from '../services/hooks';
import Tag from './tag';
import addTagFollowThunk from '../thunks/add-tag-follow-thunk';
import deleteTagFollowThunk from '../thunks/delete-tag-follow-thunk';
import { RegularText } from '../ui-lib';

type TBarTags = {
  tagList: string[],
};

type TLists = {
  rowReverse?: boolean;
};

type TMessageContainer = {
  visible: boolean,
};

const Lists = styled.ul<TLists>`
    margin: 0;
    display: flex;
    box-sizing:border-box;
    flex-wrap:wrap;
    position: relative;
    /*
    flex-direction: ${({ rowReverse }) => rowReverse && 'row-reverse'};
    */

    gap: 4px 24px;
    //width:526px;
    white-space: pre-line;
    padding:0;
    @media screen and (max-width:768px) {
        max-width:453px;
     }
     
     @media screen and (max-width:600px) {
        max-width:352px;
        margin:0;

        flex-direction: row;
     }
`;

Lists.defaultProps = {
  rowReverse: false,
};

const List = styled.li`
    list-style-type: none;
`;

const fade = keyframes`
  from {
    opacity: .9;
  }

  to {
    opacity: 0;
  }
`;

const MessageContainer = styled.div<TMessageContainer>`
  padding: 0 16px;
  min-height: 32px;
  background-color: ${({ theme }) => theme.primaryText};
  opacity: .9;
  display: flex;
  max-width: 270px;
  justify-content: center;
  align-items: center;
  border-radius: 32px;
  position: absolute;
  top: -56px;

  left: calc(50% - 280px / 2);
  max-width: 270px;
  visibility: ${({ visible }) => visible && 'visible'};
  animation: ${({ visible }) => visible && fade} 1s linear 1s;

  @media screen and (max-width:640px) {
    left: calc(50% - 196px / 2);
    max-width: 160px;
  }
`;

const BarTags: FC<TBarTags & TLists> = ({ tagList, rowReverse = false }) => {
  const { tagsFollow } = useSelector((state) => state.view);
  const { isVisible } = useSelector((state) => state.api);
  const dispatch = useDispatch();
  const pointer = !rowReverse;
  const theme = useTheme();
  const [tagName, setTagName] = useState('');
  const handleClickTag = (e: MouseEvent<HTMLButtonElement>, tag: string, isActive: boolean) => {
    e.preventDefault();
    if (pointer) {
      if (!isActive) {
        dispatch(addTagFollowThunk(tag));
        setTagName(tag);
      } else {
        dispatch(deleteTagFollowThunk(tag));
      }
    }
  };

  return (
    <Lists rowReverse={rowReverse}>
      {tagList.map((tag) => (
        <List key={nanoid(10)}>
          <Tag
            tag={tag}
            pointer={pointer}
            isShowIcon={false}
            isLocationArticle={pointer}
            isActive={!!tagsFollow?.includes(tag)}
            handleClick={handleClickTag} />
          {isVisible && (
            <MessageContainer visible={isVisible}>
              <RegularText
                size='medium'
                weight={500}
                color={theme.button.blue.font}
                align='center'
                sansSerif>
                <FormattedMessage id='popupMessage' />
                {tagName}
              </RegularText>
            </MessageContainer>
          )}
        </List>
      ))}
    </Lists>
  );
};

BarTags.defaultProps = {
  rowReverse: false,
};

export default BarTags;
