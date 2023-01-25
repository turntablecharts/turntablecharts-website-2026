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
      <Typography.Text className="rank" fontType="Montserrat" weight="semiBold">
        {song.rank}
      </Typography.Text>
      {song.lastPosition === 0 ? (
        <div style={{ padding: '4px 8px', backgroundColor: '#0F8F491A' }}>
          <Typography.Text
            style={{ color: Theme.colorPalette.ttcGreen }}
            // level="medium"
            className="tag"
            weight="semiBold"
            fontType="Montserrat"
          >
            NEW
          </Typography.Text>
        </div>
      ) : song.lastPosition === -1 ? (
        <div style={{ padding: '4px 8px', backgroundColor: '#F1A01F1A' }}>
          <Typography.Text
            style={{ color: Theme.colorPalette.ttcYellow }}
            // level="medium"
            weight="semiBold"
            className="tag"
            fontType="Montserrat"
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
    </RankStyling>
  );
};

export default RankPlusTrend;

const RankStyling = styled.div`
  display: flex;
  align-items: center;
  gap: 50px;
  /* max-width: 80px; */

  ${media.tablet`
    flex-direction: column;
    gap: 5px;
    align-items: center;
  `}

  .rank {
    font-size: ${Theme.fontSizes.xlarge};

    ${media.tablet`
    font-size: 14px;
  `}
  }
  .tag {
    font-size: ${Theme.fontSizes.medium};

    ${media.tablet`
    font-size: 10px;
  `}
  }
`;
