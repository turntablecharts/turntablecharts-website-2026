import React from 'react';
import styled from 'styled-components';

const Container: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <ContainerStyling>{children}</ContainerStyling>;
};

export default Container;

const ContainerStyling = styled.div`
  max-height: 100vh;
  overflow: hidden;
`;
