import { css } from 'styled-components';
import media from 'constants/MediaQuery';

export const headingMixin = css`
  font-family: 'Roboto Flex', sans-serif;
  font-size: 5rem;
  font-weight: 850;
  text-transform: uppercase;
  line-height: 0.9;
  text-align: center;
  width: 100%;
  letter-spacing: -2.5px;

  ${media.smallDesktop`
    font-size: 4rem;
    line-height: 1.2;
  `}

  ${media.tablet`
    font-size: 2.6rem;
    line-height: 1.2;
  `}

  ${media.mobileLarge`
    font-size: 3rem;
    line-height: 1.3;
  `}

  ${media.mobile`
    font-size: 3rem;
    line-height: 1.3;
  `}
`;
