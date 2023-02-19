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
  // const cardColors = [
  //   Theme.colorPalette.ttcYellow,
  //   Theme.colorPalette.ttcGreen,
  //   "#EF5DA8",
  //   "#5D5FEF",
  //   "#8F540F",
  //   "#8F0F73",
  //   "#0F8F80",
  // ];

  // const randomBg = Math.floor(Math.random() * cardColors.length);

  return (
    <ChartCardStyling
      style={{
        backgroundColor: cardColor,
      }}
    >
      <Link href={`/charts/${category.id}`}>
        <a>
          <Typography.Heading fontType="Mermaid" level={1}>
            {category.name}
          </Typography.Heading>
          <Typography.Text style={{ fontSize: Theme.fontSizes.medium, maxWidth: '460px' }} weight="medium" fontType="Montserrat">
            {category.description}
          </Typography.Text>
          {category.topSong && (
            <div className="chart_topper">
              <div className="chart_topper-img">
                <img src={category.topSong.imageUri} alt="" />
              </div>
              <div className="chart_topper-details">
                <Typography.Text fontType="Montserrat" level="xlarge" weight="bold" style={{ marginBottom: '15px' }}>
                  01
                </Typography.Text>
                <Typography.Text fontType="Montserrat" level="xlarge" weight="semiBold">
                  {truncateString(category.topSong.artiste, 25)}
                </Typography.Text>
                <Typography.Text fontType="Montserrat" level="large" weight="medium">
                  {category.topSong.title}
                </Typography.Text>
              </div>
            </div>
          )}
        </a>
      </Link>
    </ChartCardStyling>
  );
};

export default ChartCard;

const ChartCardStyling = styled.div`
  overflow: hidden;
  a {
    max-width: auto;
    display: flex;
    flex-direction: column;
    padding: 40px;
    transition: transform 1s;

    ${media.mobileLarge`
    padding: 20px;
          `}

    &:hover {
      transform: scale(1.05);
    }
  }
  h1 {
    font-size: 40px;
    margin-bottom: 10px;
    ${media.mobileLarge`
          font-size: 32px;
          `}
  }
  .chart_topper {
    margin-top: 50px;
    display: flex;
    align-items: flex-start;
    gap: 10px;
    &-img {
      width: 100px;
      height: 100px;
      overflow: hidden;
      display: flex;
      align-items: center;

      img {
        width: 100px;
        height: 100px;
      }
    }
  }
`;
