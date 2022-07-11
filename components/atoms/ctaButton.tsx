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
      <Typography.Text weight="semiBold" fontType="SFProText">
        {label}
      </Typography.Text>
      <CTAArrow style={{ width: "50px" }} />
    </CTAButtonStyling>
  );
};

export default CTAButton;

const CTAButtonStyling = styled.div`
  all: unset;
  padding: 24px 48px;
  background-color: ${Theme.colorPalette.ttcYellow};
  color: ${Theme.colorPalette.black};
  border-radius: 36px;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  font-size: ${Theme.fontSizes.xlarge};

  ${media.mobileLarge`
  padding: 14px 24px;
  font-size: 14px;
    `}
`;
