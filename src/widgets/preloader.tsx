import React, { FC } from 'react';
import styled, { keyframes } from 'styled-components';

const PreloaderContainer = styled.div`
  width: 100%;
  height: 480px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const rotation = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const PreloaderIcon = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 2px solid #FFC600;
  border-right: solid white 2px;
  animation: ${rotation} 2s linear infinite;
`;

const Preloader: FC = () => (
  <PreloaderContainer>
    <PreloaderIcon />
  </PreloaderContainer>
);

export default Preloader;
