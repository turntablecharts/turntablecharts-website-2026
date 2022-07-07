import React from "react";
import styled from "styled-components";
import { ChartItem } from "utility/ChartsApi/types";
import Typography from "./typography";

import UpTrendIcon from "assets/icons/upTrend.svg";
import DownTrendIcon from "assets/icons/downTrend.svg";
import NoTrendIcon from "assets/icons/neutralTrend.svg";

const RankPlusTrend = ({ song }: { song: ChartItem }) => {
  return (
    <RankStyling>
      <Typography.Text fontType="Montserrat" weight="semiBold" level="xlarge">
        {song.rank}
      </Typography.Text>
      {song.rank < song.lastPosition ? (
        <UpTrendIcon />
      ) : song.rank > song.lastPosition ? (
        <DownTrendIcon />
      ) : (
        <NoTrendIcon />
      )}
    </RankStyling>
  );
};

export default RankPlusTrend;

const RankStyling = styled.div`
  display: flex;
  align-items: center;
  gap: 50px;
`;
