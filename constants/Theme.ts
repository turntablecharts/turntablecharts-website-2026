const colorPalette = {
  black: "#000000",
  white: "#FFFFFF",
  textGrey: "#8B8B8B",
  inherit: "inherit",
  transparent: "transparent",
  ttcYellow: "#F1A01F",
  ttcBlack: "#0D0D0D",
  ttcGreen: "#0F8F49",
  ttcBlue: "#2B59C3",
  ttcYellow2: "#F1920C",
  ttcRed: "#EE1A26",

}

export type FontColorType =
  | "black"
  | "white"
  | "textGrey"
  | "inherit"
  | "transparent"
  | "ttcYellow"
  | "ttcBlack"
  | "ttcGreen"
  | "ttcBlue"
  | "ttcYellow2"
  | "ttcRed";

const typography = {
  text: "Inter",
  title: "Open Sans",
  heading: "Roboto Flex",
  heading2: "Anton",
  workSans: "Work Sans",
};

export type FontSizeType =
  | "xxsmall"
  | "xsmall"
  | "small"
  | "regular"
  | "medium"
  | "large"
  | "xlarge"
  | "xxlarge"
  | "xxxlarge"
  | "xxxxlarge"
  | "extralarge"
  | "xextralarge"
  | "huge";

type FontSizeOptions = { [key in FontSizeType]: string };

const fontSizes: FontSizeOptions = {
  xxsmall: "0.5rem",
  xsmall: "0.625rem",
  small: "0.75rem",
  regular: "0.813rem",
  medium: "0.875rem",
  large: "1rem",
  xlarge: "1.25rem",
  xxlarge: "1.5rem",
  xxxlarge: "1.75rem",
  xxxxlarge: "2rem",
  extralarge: "2.6rem",
  xextralarge: "3.4rem",
  huge: "6.875rem",
};

export type FontWeightType =
  | "xtraLight"
  | "light"
  | "thin"
  | "normal"
  | "medium"
  | "semiBold"
  | "bold"
  | "extraBold"
  | "black";

// eslint-disable-next-line
type FontWeightOptions = { [key in FontWeightType]: number };

const fontWeights: FontWeightOptions = {
  xtraLight: 100,
  light: 200,
  thin: 300,
  normal: 400,
  medium: 500,
  semiBold: 600,
  bold: 700,
  extraBold: 800,
  black: 900,
};

const Theme = {
  colorPalette,
  fontSizes,
  fontWeights,
  typography,
};

export default Theme;
