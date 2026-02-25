/* eslint-disable @next/next/no-img-element */
import Typography from 'components/atoms/typography';
import media from 'constants/MediaQuery';
import Theme from 'constants/Theme';
import React from 'react';
import styled from 'styled-components';
import { ChartItem } from 'utility/ChartsApi/types';
import { truncateString } from 'utility/helpers';

const SongEntry = ({ song, setVid }: { song: ChartItem; setVid: (arg: string) => void }) => {
  const vidID = song.musicLink?.split('v=')[1]?.split('&')[0];

  const handleClick = () => {
    if (!vidID) return;
    setVid(`https://www.youtube.com/embed/${vidID}?playsinline=1&rel=0`);
  };

  return (
    <SongEntryStyling
      hasVideo={!!vidID}
      onClick={handleClick}
    >
      <div className="entry_image">
        <object data={song.imageUri} type="image/png">
          <img src="/assets/ttcBgWhite.png" alt="fallback" />
        </object>
      </div>
      <div className="entry_name">
        <Typography.Text
          fontType="WorkSans"
          weight="semiBold"
          className="title"
        >
          {song.title}
        </Typography.Text>
        <Typography.Text className="artiste" fontType="WorkSans" weight="medium" level="large">
          {truncateString(song.artiste, 40)}
        </Typography.Text>
      </div>
    </SongEntryStyling>
  );
};

export default SongEntry;

const SongEntryStyling = styled.div<{ hasVideo?: boolean }>`
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: ${({ hasVideo }) => (hasVideo ? 'pointer' : 'default')};
  transition: opacity 0.15s;

  &:active {
    opacity: 0.75;
  }

  ${media.mobile`
    gap: 10px;
  `}
  .entry_image {
    height: 64px;
    width: 64px;
    border-radius: 8px;
    overflow: hidden;
    display: flex;
    align-items: center;
    ${media.tablet`
      height: 48px;
      width: 48px;
    `}
    img, object {
      max-width: 100%;
      height: auto;
    }
  }
  .entry_name {
    flex: 1;
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
