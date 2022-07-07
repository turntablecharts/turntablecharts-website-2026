import { css, CSSObject } from "styled-components";

type RuleOrQueryType = CSSObject | TemplateStringsArray;

const mediaQuery = (query: RuleOrQueryType) => (rules: RuleOrQueryType) =>
  css`
    @media screen and (${css(query)}) {
      ${css(rules)}
    }
  `;

/**
 * Media quries - Sample use
 * ${media.mobile`
      display: block;
    `}
 */

const media = {
  smallMobile: mediaQuery`max-width: 320px`, // iphone 5/SE
  mobile: mediaQuery`max-width: 480px`, // mobile
  mobileLarge: mediaQuery`max-width: 700px`, // mobile (surface duo)
  tablet: mediaQuery`max-width: 768px`, // tablets
  smallDesktop: mediaQuery`max-width: 1024px`, // tablets landscape, small desktops
  print: mediaQuery`print`,
  query1050: mediaQuery`max-width: 1050px`,
  query550: mediaQuery`max-width: 550px`,
  landscapeTabletMaxWidth: mediaQuery`max-width: 991px`,
  landscapeTablet: mediaQuery`min-width: 991px`, // tablets
  smallDesktopMin: mediaQuery`min-width: 1024px`, // tablets landscape, small desktops
  tabletMin: mediaQuery`min-width: 768px`, // tablets
  mobileMin: mediaQuery`min-width: 480px`,
};

export default media;
