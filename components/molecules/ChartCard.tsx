/* eslint-disable @next/next/no-img-element */
import Typography from "components/atoms/typography";
import Theme from "constants/Theme";
import React from "react";
import styled from "styled-components";
import { ChartCategory } from "utility/ChartsApi/types";
import { truncateString } from "utility/helpers";

const ChartCard: React.FC<{ category: ChartCategory }> = ({ category }) => {
  const cardColors = [
    Theme.colorPalette.ttcYellow,
    Theme.colorPalette.ttcGreen,
    "#EF5DA8",
    "#5D5FEF",
  ];

  const randomBg = Math.floor(Math.random() * cardColors.length);

  return (
    <ChartCardStyling
      style={{
        backgroundColor: cardColors[randomBg],
      }}
    >
      <a href={`/charts/${category.id}`}>
        <Typography.Heading
          style={{ fontSize: "40px", marginBottom: "10px" }}
          fontType="Mermaid"
          level={1}
        >
          {category.name}
        </Typography.Heading>
        <Typography.Text
          style={{ fontSize: Theme.fontSizes.medium, maxWidth: "460px" }}
          weight="medium"
          fontType="Montserrat"
        >
          {category.description}
        </Typography.Text>
        {category.topSong && (
          <div className="chart_topper">
            <div className="chart_topper-img">
              <img src={category.topSong.imageUri} alt="" />
            </div>
            <div className="chart_topper-details">
              <Typography.Text
                fontType="Montserrat"
                level="xlarge"
                weight="bold"
                style={{ marginBottom: "15px" }}
              >
                01
              </Typography.Text>
              <Typography.Text
                fontType="Montserrat"
                level="xlarge"
                weight="semiBold"
              >
                {truncateString(category.topSong.artiste, 25)}
              </Typography.Text>
              <Typography.Text
                fontType="Montserrat"
                level="large"
                weight="medium"
              >
                {category.topSong.title}
              </Typography.Text>
            </div>
          </div>
        )}
      </a>
    </ChartCardStyling>
  );
};

export default ChartCard;

const ChartCardStyling = styled.div`
  a {
    max-width: auto;
    display: flex;
    flex-direction: column;
    padding: 40px;
    transition: transform 1s;

    &:hover {
      transform: scale(1.05);
    }
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
