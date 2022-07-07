import React from "react";
import styled from "styled-components";

interface IEmptyState {
  message?: string;
}

export const EmptyState: React.FC<IEmptyState> = ({ message }) => {
  return (
    <EmptyStateWrapper>
      <div className="content">{message}</div>
    </EmptyStateWrapper>
  );
};

const EmptyStateWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 0;

  .content {
    text-align: center;
    > svg {
      width: 300px;
      height: 300px;
    }
  }
`;
