/* eslint-disable @next/next/no-img-element */
import Typography from 'components/atoms/typography';
import media from 'constants/MediaQuery';
import Theme from 'constants/Theme';
import Link from 'next/link';
import React, { useState } from 'react';
import styled from 'styled-components';
import { ChartCategory } from 'utility/ChartsApi/types';
import { truncateString } from 'utility/helpers';
import MainArrow from 'assets/icons/mainArrow.svg';
import RectangleGrad from 'assets/RectangleGrad.png';

const HOVER_COLORS = [
  Theme.colorPalette.ttcBlue,
  Theme.colorPalette.ttcOrange,
  Theme.colorPalette.ttcGreen,
  Theme.colorPalette.ttcDarkGreen,
  Theme.colorPalette.ttcBlack,
];

const ChartCard: React.FC<{ category: ChartCategory; cardColor: string }> = ({ category, cardColor }) => {
  const [hoverColor, setHoverColor] = useState(cardColor);

  const handleMouseEnter = () => {
    setHoverColor(HOVER_COLORS[Math.floor(Math.random() * HOVER_COLORS.length)]);
  };

  return (
    <ChartCardStyling $cardColor={hoverColor} onMouseEnter={handleMouseEnter} onTouchStart={handleMouseEnter}>
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
              <MainArrow className="arrow_default" />
              <MainArrow className="arrow_hover" />
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

  ${media.tabletMin`
    &:hover::before { opacity: 1; }
    &:hover::after { opacity: 0.5; transform: translateY(0); }
    &:hover { color: white; }
  `}

  &:active::before { opacity: 1; }
  &:active::after { opacity: 0.5; transform: translateY(0); }
  &:active { color: white; }
${media.mobileLarge`
   height: 450px;
  `}

  /* ── Gradient Overlay (PNG) ── */
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url(${RectangleGrad.src});
    background-size: cover;
    background-position: center;
    opacity: 0;
    mix-blend-mode: screen;
    filter: blur(0.5px);
    transform: translateY(10px);
    transition: all 0.5s ease;
    pointer-events: none;
    z-index: 1;
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

  &:hover .chart_open,
  &:active .chart_open {
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
    position: relative;
    width: 60px;
    height: 60px;

    svg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      transition: all 0.4s ease;
      
      rect {
        stroke: rgba(0, 0, 0, 0.2);
        transition: stroke 0.4s ease;
      }
      path {
        fill: rgba(0, 0, 0, 0.6);
        transform-origin: center;
        transition: all 0.4s ease;
      }
    }

    .arrow_default {
      path { transform: rotate(90deg); }
    }

    .arrow_hover {
      opacity: 0;
      path { transform: rotate(45deg); }
    }
  }

  ${media.tabletMin`
    &:hover .chart_arrow {
      .arrow_default { opacity: 0; path { transform: rotate(135deg); } }
      .arrow_hover { opacity: 1; rect { stroke: white; } path { fill: white; transform: rotate(45deg); } }
    }
  `}

  &:active .chart_arrow {
    .arrow_default { opacity: 0; path { transform: rotate(135deg); } }
    .arrow_hover { opacity: 1; rect { stroke: white; } path { fill: white; transform: rotate(45deg); } }
  }
`;
