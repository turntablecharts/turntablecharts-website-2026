import React from 'react';
import styled from 'styled-components';
import { ChartItem } from 'utility/ChartsApi/types';
import Typography from './typography';

import UpTrendIcon from 'assets/icons/upTrend.svg';
import DownTrendIcon from 'assets/icons/downTrend.svg';
import NoTrendIcon from 'assets/icons/neutralTrend.svg';
import Theme from 'constants/Theme';
import media from 'constants/MediaQuery';

const RankPlusTrend = ({ song }: { song: ChartItem }) => {
  return (
    <RankStyling>
      <Typography.Text className="rank" fontType="WorkSans" weight="semiBold">
        {song.rank}
      </Typography.Text>
      <div className="tag_wrapper">
        {song.lastPosition === 0 ? (
          <div style={{ padding: '2px 6px', backgroundColor: '#0F8F491A', borderRadius: '20px' }}>
            <Typography.Text
              style={{ color: Theme.colorPalette.ttcGreen }}
              className="tag"
              weight="semiBold"
              fontType="WorkSans"
            >
              NEW
            </Typography.Text>
          </div>
        ) : song.lastPosition === -1 ? (
          <div style={{ padding: '2px 6px', backgroundColor: '#F1A01F1A', borderRadius: '20px' }}>
            <Typography.Text
              style={{ color: Theme.colorPalette.ttcYellow }}
              weight="semiBold"
              className="tag"
              fontType="WorkSans"
            >
              RE-ENTRY
            </Typography.Text>
          </div>
        ) : song.rank < song.lastPosition ? (
          <UpTrendIcon />
        ) : song.rank > song.lastPosition ? (
          <DownTrendIcon />
        ) : (
          <NoTrendIcon />
        )}
      </div>
    </RankStyling>
  );
};

export default RankPlusTrend;

const RankStyling = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;

  ${media.tablet`
    flex-direction: column;
    align-items: center;
    gap: 6px;
  `}

  .rank {
    font-size: ${Theme.fontSizes.xlarge};
    min-width: 36px;
    text-align: left;
    flex-shrink: 0;

    ${media.tablet`
      font-size: 14px;
      min-width: auto;
      text-align: center;
    `}

    ${media.mobileLarge`
      font-size: 11px;
    `}
  }

  .tag_wrapper {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;

    ${media.tablet`
      justify-content: center;
      flex: none;
    `}

    svg {
      ${media.tablet`
        width: 12px;
        height: 12px;
      `}

      ${media.mobileLarge`
        width: 10px;
        height: 10px;
      `}
    }
  }

  .tag {
    font-size: ${Theme.fontSizes.medium};
    white-space: nowrap;

    ${media.tablet`
      font-size: 9px;
    `}

    ${media.mobileLarge`
      font-size: 7px;
    `}
  }
`;
