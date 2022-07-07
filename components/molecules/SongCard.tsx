/* eslint-disable @next/next/no-img-element */
import React from "react";
import styled from "styled-components";
import Typography from "components/atoms/typography";
import { ChartItem } from "utility/ChartsApi/types";
import UpTrendIcon from "assets/icons/upTrend.svg";
import DownTrendIcon from "assets/icons/downTrend.svg";
import NoTrendIcon from "assets/icons/neutralTrend.svg";

const SongCard: React.FC<{ songItem: ChartItem }> = ({ songItem }) => {
  return (
    <SongCardStyling>
      <div className="img">
        <img src={songItem.imageUri} alt="song img" />
      </div>
      <div className="details">
        <div className="rank">
          <Typography.Text
            fontType="Montserrat"
            weight="semiBold"
            level="large"
          >
            {songItem.rank}
          </Typography.Text>
          {songItem.rank < songItem.lastPosition ? (
            <UpTrendIcon />
          ) : songItem.rank > songItem.lastPosition ? (
            <DownTrendIcon />
          ) : (
            <NoTrendIcon />
          )}
        </div>
        <div className="name">
          <Typography.Text
            fontType="Montserrat"
            weight="semiBold"
            level="large"
            className="text"
          >
            {songItem.title}
          </Typography.Text>
          <Typography.Text
            className="text"
            fontType="Montserrat"
            weight="medium"
            level="medium"
          >
            {songItem.artiste}
          </Typography.Text>
        </div>
      </div>
    </SongCardStyling>
  );
};

export default SongCard;

const SongCardStyling = styled.div`
  max-width: auto;
  padding: 16px 12px;
  background-color: #121212;

  .img {
    height: 200px;
    overflow: hidden;
    display: flex;
    align-items: center;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  .details {
    display: flex;
    align-items: center;
    margin-top: 10px;
    gap: 15px;

    .rank {
      /* padding: 5px; */
      gap: 7px;
      display: flex;
      align-items: center;
    }

    .name {
      overflow: hidden;
      .text {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
`;
