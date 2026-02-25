import React, { useContext } from 'react';
import styled from 'styled-components';

export const TableContent: React.FC<{ children: React.ReactNode }> = (props) => {
  const { children } = props;

  return <TableContentContainer>{children}</TableContentContainer>;
};

const TableContentContainer = styled.div`
  width: 100%;
  height: calc(100vh - 320px);
  min-height: 600px;
  overflow-y: auto;
  overflow-x: hidden;
  border-radius: 12px;

  .container {
    margin: 0;
  }
`;
