import { useRouter } from "next/router";
import React from "react";
import styled, { css } from "styled-components";

const AppContainer: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();

  return (
    <AppContainerStyling pathname={router.pathname}>
      {children}
    </AppContainerStyling>
  );
};

export default AppContainer;

const AppContainerStyling = styled.div<{ pathname: string }>`
  ${({ pathname }) =>
    pathname === "/myTurnTable" &&
    css`
      background-image: url("/assets/myTurnTableBG.png");
    `}
`;
