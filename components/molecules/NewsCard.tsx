/* eslint-disable @next/next/no-img-element */
import React from "react";
import styled from "styled-components";
import Typography from "components/atoms/typography";
import Link from "next/link";
import { NewsSummary } from "utility/NewsApi/types";
import Theme from "constants/Theme";
import media from "constants/MediaQuery";

const NewsCard: React.FC<{ newsItem: NewsSummary }> = ({ newsItem }) => {
  return (
    <NewsCardStyling>
      <div className="news_card-img">
        <Link href={`/news/${newsItem.id}`}>
          <a>
            <object data={newsItem.headerImageUri} type="image/png">
              <img src="/assets/ttcBgWhite.png" alt="fallback" />
            </object>
          </a>
        </Link>
      </div>
      <div className="news_card-title">
        <Typography.Text
          fontType="Mermaid"
          // level="xlarge"
          style={{
            marginTop: "20px",
          }}
        >
          {newsItem.title}
        </Typography.Text>
      </div>
      <div className="article_link yellow">
        <Link href={`/news/${newsItem.id}`}>
          <a>
            <Typography.Text fontType="Montserrat">Read more</Typography.Text>
          </a>
        </Link>
      </div>
    </NewsCardStyling>
  );
};

export default NewsCard;

const NewsCardStyling = styled.div`
  max-width: auto;
  display: flex;
  flex-direction: column;

  .news_card-img {
    height: 200px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    a {
      height: 100%;
      width: 100%;
    }
    img,
    object {
      width: 100%;
      /* height: auto; */
      height: 100%;

      transition: transform 1s;
      object-fit: cover;
    }

    &:hover {
      img,
      object {
        transform: scale(1.05);
      }
    }
  }

  .news_card-title {
    p {
      font-size: ${Theme.fontSizes.xlarge};
      ${media.mobileLarge`
      font-size: 1rem;
    `}
    }
    flex: 1;
  }

  .article_summary {
    margin: 10px 0px;
    -webkit-line-clamp: 3;
  }
  .article_link {
    p {
      font-size: ${Theme.fontSizes.large};
      ${media.mobileLarge`
      font-size: 12px;
    `}
    }
    &:hover {
      text-decoration: underline;
    }
  }

  /* .article_img {
    border-radius: 8px;
  } */
`;
