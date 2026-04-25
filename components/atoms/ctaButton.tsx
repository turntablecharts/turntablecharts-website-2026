import React from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import media from "constants/MediaQuery";

const CTAButton: React.FC<{ label: string; to: string }> = ({ label, to }) => {
  const router = useRouter();
  return (
    <Wrapper onClick={() => router.push(to)}>
      <Btn>{label}</Btn>
    </Wrapper>
  );
};

export default CTAButton;

const Wrapper = styled.div`
  position: relative;
  width: 280px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 31.22px;
  cursor: pointer;

  &:hover {
    background: radial-gradient(
      55% 130% at 50.14% 50.14%,
      rgba(255, 166, 0, 0) 83.21%,
      #ffa600 100%
    );
  }

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: radial-gradient(
      55% 130% at 50.14% 50.14%,
      rgba(255, 166, 0, 0) 83.21%,
      #ffa600 100%
    );
    opacity: 0;
    transition: opacity 600ms ease-out 400ms;
    pointer-events: none;
    z-index: 0;
  }

  &:hover::before {
    opacity: 1;
  }

  ${media.mobileLarge`
    width: auto;
  `}
`;

const Btn = styled.button`
  font-family: Inter, Arial;
  font-weight: 500;
  font-size: 13.52px;
  line-height: 100%;
  letter-spacing: -3%;
  border: 1.83px solid #ffffff;
  padding: 24px 76px;
  border-radius: 31.22px;
  background: transparent;
  color: #fff;
  box-shadow: none;
  cursor: pointer;
  position: relative;
  z-index: 1;
  white-space: nowrap;

  transition: box-shadow 600ms ease-out 1200ms, border-color 0ms linear 1800ms;

  &:hover {
    box-shadow: 0px 0px 25px 0px #ffa600 inset;
    border-color: transparent;
    transition: border-color 0s;
  }

  ${media.mobileLarge`
    padding: 16px 40px;
    font-size: 13px;
  `}
`;
