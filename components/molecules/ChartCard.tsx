/* eslint-disable @next/next/no-img-element */
import Typography from 'components/atoms/typography';
import media from 'constants/MediaQuery';
import Theme from 'constants/Theme';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { ChartCategory } from 'utility/ChartsApi/types';
import { truncateString } from 'utility/helpers';

const ChartCard: React.FC<{ category: ChartCategory; cardColor: string }> = ({ category, cardColor }) => {
  return (
    <ChartCardStyling>
      <Link href={`/charts/${category.id}`}>
        <a>
          {/* TOP: album art + song info */}
          {category.topSong && (
            <div className="chart_topper">
              <div className="chart_topper-img">
                <img src={category.topSong.imageUri} alt="" />
              </div>
              <div className="chart_topper-details">
                <Typography.Text fontType="WorkSans" level="xlarge" weight="extraBold">
                  {truncateString(category.topSong.title, 25)}
                </Typography.Text>
                <Typography.Text fontType="WorkSans" level="regular" weight="medium">
                  {truncateString(category.topSong.artiste, 25)}
                </Typography.Text>
              </div>
            </div>
          )}

          {/* BOTTOM: category name + description + arrow */}
          <div className="chart_meta">
            <div className="chart_meta-text">
              <Typography.Heading fontType="WorkSans" level={1} weight="extraBold">
                {category.name}
              </Typography.Heading>
              <Typography.Text
                style={{ fontSize: Theme.fontSizes.medium, maxWidth: '400px' }}
                weight="normal"
                fontType="WorkSans"
              >
                {category.description}
              </Typography.Text>
            </div>
            <div className="chart_arrow">
              <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="5" x2="19" y2="19" />
                <polyline points="10 19 19 19 19 10" />
              </svg>
            </div>
          </div>
        </a>
      </Link>
    </ChartCardStyling>
  );
};

export default ChartCard;

const ChartCardStyling = styled.div`
  width: 100%;
  height: 600px;
  overflow: hidden;
  background-color: ${Theme.colorPalette.white};
  color: black;
  border-radius: 10px;

  a {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    padding: 32px;
    transition: transform 0.4s ease;
    text-decoration: none;

    &:hover {
      transform: scale(1.02);
    }

    ${media.mobileLarge`
      padding: 20px;
    `}
  }

  /* ── TOP BLOCK ── */
  .chart_topper {
    display: flex;
    align-items: flex-start;
    gap: 16px;

    &-img {
      width: 140px;
      height: 140px;
      flex-shrink: 0;
      overflow: hidden;

      img {
        width: 140px;
        height: 140px;
        object-fit: cover;
        display: block;
      }

      ${media.mobileLarge`
        width: 100px;
        height: 100px;

        img {
          width: 100px;
          height: 100px;
        }
      `}
    }

    &-details {
      display: flex;
      flex-direction: column;
      gap: 4px;
      padding-top: 4px;
    }
  }

  /* ── BOTTOM BLOCK ── */
  .chart_meta {
    display: flex;
    align-items: center;
    justify-content: space-between;

    &-text {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
  }

  h1 {
    font-size: 36px;
    line-height: 1;
    margin: 0;

    ${media.mobileLarge`
      font-size: 26px;
    `}
  }

  .chart_arrow {
    flex-shrink: 0;
    color: black;
    opacity: 0.6;
  }
`;
