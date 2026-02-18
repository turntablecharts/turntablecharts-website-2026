import React from "react";
import { useRouter } from "next/router";
import media from "constants/MediaQuery";

import styled from "styled-components";
import Typography from "./typography";

import CTAArrow from "assets/icons/ctaArrow.svg";
import Theme from "constants/Theme";

const CTAButton: React.FC<{ label: string; to: string }> = ({ label, to }) => {
  const router = useRouter();
  return (
    <CTAButtonStyling onClick={() => router.push(to)}>
      <Typography.Text weight="bold" fontType="OpenSans">
        {label}
      </Typography.Text>
    </CTAButtonStyling>
  );
};

export default CTAButton;

const CTAButtonStyling = styled.div`
  all: unset;
  width: 305px;
  height: 71px;
  padding: 21px 73px;
  background: #000000;
  color: ${Theme.colorPalette.white};
  border-radius: 88px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  opacity: 1;
  font-size: ${Theme.fontSizes.large};
  box-sizing: border-box;
  :hover {
    background-color: ${Theme.colorPalette.ttcYellow};
    color: ${Theme.colorPalette.black};
    cursor: pointer;
  }
  /* Inner glow */
  box-shadow: 0px 4px 24.3px 0px #F1920C inset,
              0px 4px 12.6px 0px #F1920C;

  ${media.mobileLarge`
    width: auto;
    height: auto;
    padding: 14px 24px;
    font-size: 14px;
  `}
`;
