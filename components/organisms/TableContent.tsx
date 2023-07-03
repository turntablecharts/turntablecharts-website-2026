import React, { useContext } from 'react';
import styled from 'styled-components';

export const TableContent: React.FC<{ children: React.ReactNode }> = (props) => {
  const { children } = props;

  return <TableContentContainer>{children}</TableContentContainer>;
};

const TableContentContainer = styled.div`
  width: 100%;
  overflow: auto;
  min-height: 180px;
  max-height: 80vh;
  // position: fixed;

  /* ::-webkit-scrollbar-thumb {
    background: ${({ color }) => color};
    border: 1px solid rgba(53, 52, 52, 0.165);
    border-radius: 4px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: ${({ color }) => color}b4;
  } */
  .container {
    margin: 0;
    /* display: block; */
  }
`;
