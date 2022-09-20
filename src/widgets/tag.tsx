import React, { FC, MouseEventHandler, MouseEvent } from 'react';
import styled, { useTheme } from 'styled-components';
import { CrossIcon } from '../ui-lib';
import { getPropOnCondition } from '../services/helpers';
import getColorTag from '../services/helpers/get-color-tag';

interface ITagProps extends ITagButtonProps {
  tag: string,
  handleClick?: (e: MouseEvent<HTMLButtonElement>, tag: string, isActive: boolean) => void,
  deactivateTag?: MouseEventHandler<SVGSVGElement>,
}

interface ITagButtonProps {
  isActive: boolean;
  pointer?: boolean;
  isShowIcon?: boolean;
  isLocationArticle?: boolean;
}

const Button = styled.button<ITagButtonProps>`

    padding: 0;
    border: none;
    font-family: ${({ theme }) => theme.text16SubSans.family};
    font-weight: ${({ theme }) => theme.text16SubSans.weight};
    font-size: ${({ theme }) => theme.text16SubSans.size}px;
    line-height: ${({ theme }) => theme.text18Sans.height}px;
    cursor: ${({ pointer }) => getPropOnCondition(pointer, 'inherit', 'pointer')};
    display: flex;
    align-items: center;
    color: ${({ isActive, theme, isLocationArticle }) => getColorTag(isActive, isLocationArticle, theme.button.red.default, theme.button.blue.default, theme.secondaryText)};
    background-color: transparent;

    :active {
      outline: none;
    }
  `;

const Tag: FC<ITagProps> = ({
  tag, handleClick = () => {
  }, isActive, deactivateTag, pointer, isShowIcon, isLocationArticle,
}) => {
  const theme = useTheme();
  const colorIcon = isActive ? theme.markedText : theme.secondaryText;

  return (
    <Button
      isActive={isActive}
      pointer={pointer}
      isShowIcon={isShowIcon}
      isLocationArticle={isLocationArticle}
      type='button'
      key={tag}
      onClick={(e) => handleClick(e, tag, isActive)}>
      #
      {tag}
      {' '}
      {isShowIcon && <CrossIcon color={colorIcon} onClick={deactivateTag} />}
    </Button>
  );
};

Tag.defaultProps = {
  handleClick: undefined,
  deactivateTag: undefined,
  pointer: false,
  isShowIcon: false,
  isLocationArticle: false,
};

export default Tag;
