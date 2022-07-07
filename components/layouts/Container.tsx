import React from "react";
import styled from "styled-components";

const Container: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <ContainerStyling>{children}</ContainerStyling>;
};

export default Container;

const ContainerStyling = styled.div`
  min-height: 100vh;
`;
