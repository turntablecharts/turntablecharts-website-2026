import React, { ReactNode } from "react";
import styled from "styled-components";
import Theme, { FontSizeType, FontWeightType } from "constants/Theme";

interface textBaseProps {
  soft?: boolean;
  color?:
    | "black"
    | "textGrey"
    | "white"
    | "inherit"
    | "ttcYellow"
    | "ttcBlack"
    | "ttcGreen";
  weight?: FontWeightType;
  className?: string;
  fontType?: "Mermaid" | "Montserrat" | "Fontastique" | "SFProText";
  capitalize?: boolean;
  uppercase?: boolean;
  style?: object;
  title?: string;
  text?: string;
}
interface textProps extends textBaseProps {
  level?: FontSizeType;
  children: ReactNode;
}

type textHeadingLevels = 1 | 2 | 3 | 4 | 5;
interface textHeadingProps extends textBaseProps {
  children: ReactNode;
  level: textHeadingLevels;
}

type TextHeadingsComponent = React.FC<textHeadingProps>;
type TextComponent = React.FC<textProps>;
type TypographyBase = {
  Heading: TextHeadingsComponent;
  Text: TextComponent;
  Title: TextComponent;
};

const isFont = (
  type: "Mermaid" | "Montserrat" | "Fontastique" | "SFProText" | undefined
) => {
  switch (type) {
    case "Montserrat":
      return Theme.typography.primary;
    case "Mermaid":
      return Theme.typography.secondary;
    case "Fontastique":
      return Theme.typography.tertiary;
    case "SFProText":
      return Theme.typography.extra;
    default:
      return "inherit";
  }
};

const TextStyling = styled.p<textProps>`
  display: block;
  font-family: ${({ fontType }) => isFont(fontType)};
  text-transform: ${({ capitalize, uppercase }) =>
    (capitalize && "capitalize") || (uppercase && "uppercase")};
  font-size: ${({ level }) => level && Theme.fontSizes[level || "large"]};
  font-weight: ${({ weight }) => Theme.fontWeights[weight || "normal"]};
  color: ${({ soft, color }) =>
    soft
      ? Theme.colorPalette.textGrey
      : Theme.colorPalette[color || "inherit"]};
`;

export const Text: TextComponent = ({ children, text, ...rest }) => {
  return <TextStyling {...rest}>{text || children}</TextStyling>;
};

const Typography: TypographyBase = () => Text;

const TextHeading: TextHeadingsComponent = ({ children, level, ...rest }) => {
  const props = {
    weight: Theme.fontWeights.bold,
    as: `h${level || 1}`,
    ...rest,
  } as any;
  return React.createElement(TextStyling, props, children);
};

const TextTitle: TextComponent = ({ children, text }) => {
  return (
    <TextHeading fontType="Mermaid" level={1}>
      {text || children}
    </TextHeading>
  );
};

Typography.Text = Text;
Typography.Heading = TextHeading;
Typography.Title = TextTitle;

export default Typography;
