import React from 'react';
import styled from 'styled-components';
import { blue } from '../constants/colors';

const FilterConteiner = styled.div`
  width: 100%;
  height: 56px;
  font-size: ${({ theme: { text18Sans: { size } } }) => `${size}px`};
font-family: ${({ theme: { text18Sans: { family } } }) => family};
line-height: ${({ theme: { text18Sans: { height } } }) => `${height}px`};
font-weight: ${({ theme: { text18Sans: { weight } } }) => weight};
color: ${({ theme: { primaryText } }) => primaryText};
margin-bottom: 32px;
`;

const FilterButton = styled.button`
height: 56px;
border: none;
font: inherit;
color: inherit;
background-color: transparent;
cursor: pointer;
color: ${({ theme: { secondaryText } }) => secondaryText};

`;

const FilterButtonActive = styled.button`
height: 56px;
border: none;
font: inherit;
color: inherit;
background-color: transparent;
cursor: pointer;
border-bottom: 2px solid ${blue};
`;

const FeedFilter: React.FC = () => (
  <FilterConteiner>
    <FilterButtonActive type='button'>Все посты</FilterButtonActive>
    <FilterButton type='button'>Мои подписки</FilterButton>
  </FilterConteiner>
);

export default FeedFilter;
