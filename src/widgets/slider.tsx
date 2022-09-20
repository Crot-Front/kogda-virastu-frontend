import styled from 'styled-components';
import React, {
  FC, useState, MouseEventHandler,
} from 'react';
import { useIntl } from 'react-intl';
import BuletSlider from '../ui-lib/buledSlider';
import { useSelector } from '../services/hooks';
import BriefPostAnnounceWidget from './brief-post-announce-widget';
import { TArticle } from '../types/types';
import { Divider, HeaderThreeText } from '../ui-lib';
import ArrowRight from '../assets/images/icons/arrow-right-icon.svg';
import { mainBgColor } from '../constants/colors';

const SlideContainer = styled.div`
@keyframes show{
0%{
opacity:0;
}
100% {
opacity:1;
}
}
opacity:0;
transition: 1s;
animation: show 3s 1;
animation-fill-mode: forwards;
animation-delay: 0s;
display: flex;
transition: margin-right .3s;
width: 100%;
`;
const SlidersContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
margin-bottom: 22px;
width: 100%;
@media screen and (min-width: 768px) {
    display: none;
    }
`;
const SliderArrowRight = styled.button`
  cursor: pointer;
  background-image: url(${ArrowRight});
  background-repeat: no-repeat;
  background-size: contain;
  height: 24px;
  width: 24px;
  border: none;
  background-color: ${mainBgColor};
`;
const SliderArrowLeft = styled(SliderArrowRight)`
transform: rotate(180deg);
`;
type TSlide = {
  data: TArticle;
  name: number;
  page: number;
};
const Slide: FC<TSlide> = ({ data, name, page }) => {
  const {
    author: {
      username,
      nickname,
      image,
    },
    title,
    createdAt,
    favorited,
    favoritesCount,
    slug,
  } = data;
  const nope = (): void => {
  };
  if (page === name) {
    return (
      <SlideContainer>
        <BriefPostAnnounceWidget
          key={slug}
          username={username}
          nickname={nickname ?? username}
          title={title}
          image={image}
          date={new Date(createdAt)}
          isLiked={favorited}
          likesCount={favoritesCount}
          onLikeClick={nope} />
      </SlideContainer>
    );
  }
  return null;
};
const BuletBar = styled.div`
        display: flex;
        gap:12px;
    `;
const SliderBox = styled.div`
  display: flex;
  align-items: baseline;
  padding-top:16px;
  width: 100%;
  justify-content: space-between;
`;

const Slider: FC = () => {
  const data = useSelector((state) => state.view.topFeed) ?? [];
  const range = [];
  const intl = useIntl();
  for (let i = 0; i < data?.length ?? 0; i += 1) {
    range.push(i);
  }
  const [page, setPage] = useState<number>(0);
  const onClickRight = () => {
    if (data && (data.length - 1) > page) {
      setPage(page + 1);
    }
  };
  const onClickLeft = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  return (
    <SlidersContainer>
      <HeaderThreeText paddingCSS='padding-bottom: 24px;'>
        {intl.messages.popularContent as string}
      </HeaderThreeText>

      {
        data && data.length > 0 && data.map((DataSlide: TArticle, index: number) => (
          <Slide key={DataSlide.slug} data={DataSlide} name={index} page={page} />
        ))
      }
      <SliderBox>
        <SliderArrowLeft onClick={onClickLeft} />
        <BuletBar>
          {
          data && range.map((pageSlide) => {
            const isActive = pageSlide === page;
            const onClick: MouseEventHandler = () => {
              setPage(pageSlide);
            };
            return (
              <BuletSlider key={pageSlide} onClick={onClick} isActive={isActive} />
            );
          })
        }
        </BuletBar>
        <SliderArrowRight onClick={onClickRight} />
      </SliderBox>
      <Divider distance={24} />
    </SlidersContainer>

  );
};
export default Slider;
