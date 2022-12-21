/* eslint-disable @next/next/no-img-element */
import Typography from 'components/atoms/typography';
import media from 'constants/MediaQuery';
import Theme from 'constants/Theme';
import React from 'react';
import styled from 'styled-components';
import { ChartItem } from 'utility/ChartsApi/types';
import { truncateString } from 'utility/helpers';

const SongEntry = ({ song }: { song: ChartItem }) => {
  return (
    <SongEntryStyling>
      <div className="entry_image">
        {/* <img loading="lazy" src={song.imageUri} alt={song.title} /> */}
        <object data={song.imageUri} type="image/png">
          <img src="/assets/ttcBgWhite.png" alt="fallback" />
        </object>
      </div>
      <div className="entry_name">
        <Typography.Text
          fontType="Montserrat"
          weight="semiBold"
          // level="xlarge"
          className="title">
          {truncateString(song.title, 40)}
        </Typography.Text>
        <Typography.Text className="artiste" fontType="Montserrat" weight="medium" level="large">
          {truncateString(song.artiste, 40)}
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
    ${media.tablet`
    height: 50px;
    width: 50px;
      `}
    img, object {
      max-width: 100%;
      height: auto;
    }
  }
  .entry_name {
    .title {
      font-size: ${Theme.fontSizes.xlarge};
      ${media.tablet`
      font-size: 14px;
      `}
    }
    .artiste {
      font-size: ${Theme.fontSizes.large};
      ${media.tablet`
        font-size: 10px;
      `}
    }
  }
`;
