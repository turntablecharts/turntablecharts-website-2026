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
  fontType?: "Inter" | "OpenSans" | "RobotoFlex" | "Anton" | "WorkSans";
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
  type: "Inter" | "OpenSans" | "RobotoFlex" | "Anton" | "WorkSans" | undefined
) => {
  switch (type) {
    case "Inter":
      return Theme.typography.text;
    case "OpenSans":
      return Theme.typography.title;
    case "RobotoFlex":
      return Theme.typography.heading;
    case "Anton":
      return Theme.typography.heading2;
    case "WorkSans":
      return Theme.typography.workSans;
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
  return <TextStyling fontType="Inter" {...rest}>{text || children}</TextStyling>;
};

const Typography: TypographyBase = () => Text;

const TextHeading: TextHeadingsComponent = ({ children, level, ...rest }) => {
  const fontType = level === 2 ? "Anton" : "RobotoFlex";
  const props = {
    weight: Theme.fontWeights.bold,
    fontType,
    as: `h${level || 1}`,
    ...rest,
  } as any;
  return React.createElement(TextStyling, props, children);
};

const TextTitle: TextComponent = ({ children, text }) => {
  return (
    <TextHeading fontType="OpenSans" level={1}>
      {text || children}
    </TextHeading>
  );
};

Typography.Text = Text;
Typography.Heading = TextHeading;
Typography.Title = TextTitle;

export default Typography;
