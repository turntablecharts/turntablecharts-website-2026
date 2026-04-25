import React, { useContext } from 'react';
import styled from 'styled-components';

export const TableContent: React.FC<{ children: React.ReactNode }> = (props) => {
  const { children } = props;

  return <TableContentContainer>{children}</TableContentContainer>;
};

const TableContentContainer = styled.div`
  width: 100%;
  height: auto;
  overflow: visible;
  border-radius: 12px;

  .container {
    margin: 0;
  }
`;
