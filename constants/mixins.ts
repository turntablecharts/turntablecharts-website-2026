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
  letter-spacing: -0.01em;

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
    letter-spacing: -0.015em;
  `}
`;

export const headingMixin = css`
  ${baseHeading}
  font-size: 70px;
  line-height: 0.88;
  letter-spacing: -0.01em;

  ${media.smallDesktop`
    font-size: 60px;
  `}

  ${media.tablet`
    font-size: 50px;
  `}

  ${media.mobileLarge`
    font-size: 40px;
    line-height: 0.8;
    letter-spacing: -0.025em;
  `}
`;

export const mobileHeadingMixin = css`
  font-family: 'Nohemi', sans-serif;
  font-size: 40px;
  font-weight: 900;
  text-transform: uppercase;
  line-height: 0.8;
  letter-spacing: -0.025em;
`;
