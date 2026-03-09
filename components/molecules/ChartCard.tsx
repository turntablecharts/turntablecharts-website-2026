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
    <ChartCardStyling $cardColor={cardColor}>
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

          {/* CENTRE: "Open Folder" — visible only on hover */}
          <div className="chart_open">
            <span>(Open Folder)</span>
          </div>

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
              {/* default arrow ↘ */}
              <svg className="arrow_default" width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="5" x2="19" y2="19" />
                <polyline points="10 19 19 19 19 10" />
              </svg>
              {/* hover arrow → */}
              <svg className="arrow_hover" width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" y1="12" x2="20" y2="12" />
                <polyline points="14 6 20 12 14 18" />
              </svg>
            </div>
          </div>
        </a>
      </Link>
    </ChartCardStyling>
  );
};

export default ChartCard;

const ChartCardStyling = styled.div<{ $cardColor: string }>`
  width: 100%;
  height: 600px;
  overflow: hidden;
  background-color: ${Theme.colorPalette.white};
  color: black;
  border-radius: 10px;
  position: relative;
  transition: background-color 0.4s ease, color 0.4s ease;

  /* ── Coloured grid overlay (hidden by default) ── */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 10px;
    background-color: ${({ $cardColor }) => $cardColor};
    background-image:
      repeating-linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
      repeating-linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px);
    background-size: 36px 36px;
    opacity: 0;
    transition: opacity 0.4s ease;
    pointer-events: none;
    z-index: 0;
  }

  &:hover::before {
    opacity: 1;
  }

  &:hover {
    color: white;
  }

  a {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    padding: 32px;
    text-decoration: none;
    position: relative;
    z-index: 1;

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

  /* ── CENTRE: Open Folder ── */
  .chart_open {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;

    span {
      font-family: 'Work Sans', sans-serif;
      font-size: 1.1rem;
      font-weight: 500;
      color: white;
      letter-spacing: 0.5px;
    }
  }

  &:hover .chart_open {
    opacity: 1;
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

  /* ── Arrow ── */
  .chart_arrow {
    flex-shrink: 0;
    color: black;
    opacity: 0.6;
    position: relative;
    width: 42px;
    height: 42px;
    transition: opacity 0.3s ease, color 0.4s ease;

    svg {
      position: absolute;
      top: 0;
      left: 0;
      transition: opacity 0.3s ease, transform 0.3s ease;
    }

    .arrow_hover {
      opacity: 0;
      transform: rotate(-45deg) scale(0.8);
    }
  }

  &:hover .chart_arrow {
    color: white;
    opacity: 1;

    .arrow_default {
      opacity: 0;
      transform: rotate(45deg) scale(0.8);
    }

    .arrow_hover {
      opacity: 1;
      transform: rotate(0deg) scale(1);
    }
  }
`;
