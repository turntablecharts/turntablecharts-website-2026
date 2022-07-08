/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */
import React from "react";
import styled from "styled-components";
import Typography from "components/atoms/typography";
import Theme from "constants/Theme";
import { NewsItem } from "utility/NewsApi/types";
import { calculateReadingTime } from "utility/helpers";
import { format } from "date-fns";
import Link from "next/link";

const ArticleCard: React.FC<{ newsItem: NewsItem }> = ({ newsItem }) => {
  return (
    <ArticleCardStyling>
      <div className="article_card-img">
        <Link href={`/news/${newsItem.id}`}>
          <a>
            <img
              src={newsItem.headerImageUri}
              alt="article img"
              // onError={(e) =>
              //   (e.currentTarget.src = "../../assets/icons/ttc-logo.svg")
              // }
            />
          </a>
        </Link>
      </div>
      <div className="article_card-tag">
        <Typography.Text
          fontType="Montserrat"
          level="large"
          weight="medium"
          style={{
            color: Theme.colorPalette.ttcYellow,
            margin: "16px 0px 8px 0px",
          }}
        >
          {newsItem.category}
        </Typography.Text>
      </div>
      <div className="article_card-title">
        <Typography.Text
          fontType="Mermaid"
          style={{ lineHeight: "24px" }}
          level="xlarge"
        >
          {newsItem.title}
        </Typography.Text>
      </div>
      <div className="article_card-meta">
        <span>{format(new Date(newsItem.dateCreated), "PPP")}</span>
        <span className="dot"></span>
        <span>{`${calculateReadingTime(
          newsItem.newsContent.split(" ").length
        )} MIN READ`}</span>
      </div>
    </ArticleCardStyling>
  );
};

export default ArticleCard;

const ArticleCardStyling = styled.div`
  max-width: auto;
  display: flex;
  flex-direction: column;

  .article_card-img {
    height: 200px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    img {
      max-width: 100%;
      height: auto;
      transition: transform 1s;
    }

    &:hover {
      img {
        transform: scale(1.05);
      }
    }
  }

  .article_card-title {
    flex: 1;
  }

  .article_card-meta {
    font-family: ${Theme.typography.primary};
    font-size: ${Theme.fontSizes.small};
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 10px;

    .dot {
      width: 3px;
      height: 3px;
      border-radius: 50%;
      background: #fff;
    }
  }
`;
