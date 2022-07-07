import React from "react";
import Skeleton from "react-loading-skeleton";
import styled from "styled-components";
import "react-loading-skeleton/dist/skeleton.css";

export const TableLoadingSkeleton: React.FC = () => {
  return (
    <Wrapper>
      <Skeleton height={60} />
      <br />
      <br />
      <Skeleton height={60} />
      <br />
      <br />
      <Skeleton height={60} />
      <br />
      <br />
      <Skeleton height={60} />
      <br />
      <br />
      <Skeleton height={60} />
      <br />
      <br />
      <Skeleton height={60} />
      <br />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  padding: 0 20px 20px 20px;
`;
