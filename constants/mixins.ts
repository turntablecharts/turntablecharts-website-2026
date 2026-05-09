import { css } from 'styled-components';
import media from 'constants/MediaQuery';

export const baseHeading = css`
  font-family: 'Nohemi', sans-serif;
  font-weight: 900;
  text-transform: uppercase;
  text-align: center;
  width: 100%;
`;

export const heroHeadingMixin = css`
  ${baseHeading}
  font-size: 110px;
  line-height: 0.95;
  letter-spacing: -1%;

  ${media.smallDesktop`
    font-size: 80px;
  `}

  ${media.tablet`
    font-size: 60px;
    line-height: 0.88;
  `}

  ${media.mobileLarge`
    font-size: 46px;
    line-height: 0.8;
    letter-spacing: -2.5%;
  `}
`;

export const headingMixin = css`
  ${baseHeading}
  font-size: 90px;
  line-height: 0.88;
  letter-spacing: -1%;

  ${media.smallDesktop`
    font-size: 60px;
  `}

  ${media.tablet`
    font-size: 50px;
  `}

  ${media.mobileLarge`
    font-size: 46px;
    line-height: 0.8;
    letter-spacing: -2.5%;
  `}
`;

export const mobileHeadingMixin = css`
  font-family: 'Nohemi', sans-serif;
  font-size: 46px;
  font-weight: 900;
  text-transform: uppercase;
  line-height: 0.8;
    letter-spacing: -2.5%;
`;
