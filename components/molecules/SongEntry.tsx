/* eslint-disable @next/next/no-img-element */
import Typography from "components/atoms/typography";
import React from "react";
import styled from "styled-components";
import { ChartItem } from "utility/ChartsApi/types";

const SongEntry = ({ song }: { song: ChartItem }) => {
  return (
    <SongEntryStyling>
      <div className="entry_image">
        <img loading="lazy" src={song.imageUri} alt={song.title} />
      </div>
      <div className="entry_name">
        <Typography.Text
          fontType="Montserrat"
          weight="semiBold"
          level="xlarge"
          className="text"
        >
          {song.title}
        </Typography.Text>
        <Typography.Text
          className="text"
          fontType="Montserrat"
          weight="medium"
          level="large"
        >
          {song.artiste}
        </Typography.Text>
      </div>
    </SongEntryStyling>
  );
};

export default SongEntry;

const SongEntryStyling = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  .entry_image {
    height: 64px;
    width: 64px;
    border-radius: 8px;
    overflow: hidden;
    display: flex;
    align-items: center;
  }

  img {
    max-width: 100%;
    height: auto;
  }
`;
