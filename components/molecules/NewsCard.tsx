/* eslint-disable @next/next/no-img-element */
import React from "react";
import styled from "styled-components";
import Typography from "components/atoms/typography";
import Link from "next/link";
import { NewsSummary } from "utility/NewsApi/types";

const NewsCard: React.FC<{ newsItem: NewsSummary }> = ({ newsItem }) => {
  return (
    <NewsCardStyling>
      <div className="news_card-img">
        <Link href={`/news/${newsItem.id}`}>
          <a>
            <img
              src={newsItem.headerImageUri}
              alt="news img"
              // onError={(e) =>
              //   (e.currentTarget.src = "../../assets/icons/ttc-logo.svg")
              // }
            />
          </a>
        </Link>
      </div>
      <div className="news_card-title">
        <Typography.Text
          fontType="Mermaid"
          level="xlarge"
          style={{
            marginTop: "20px",
          }}
        >
          {newsItem.title}
        </Typography.Text>
      </div>
      {/* <div className="article_summary">
        <Typography.Text fontType="Montserrat" level="large">
          Kelvin Egonu&apos;s foray into music is born out of a need to escape
          the life he was born into, he hopes hi...
        </Typography.Text>
      </div> */}
      <div className="article_link yellow">
        <Link href={`/news/${newsItem.id}`}>
          <a>
            <Typography.Text fontType="Montserrat" level="large">
              Read more
            </Typography.Text>
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
    img {
      width: 100%;
      /* height: auto; */
      height: 100%;

      transition: transform 1s;
      object-fit: cover;
    }

    &:hover {
      img {
        transform: scale(1.05);
      }
    }
  }

  .news_card-title {
    flex: 1;
  }

  .article_summary {
    margin: 10px 0px;
    -webkit-line-clamp: 3;
  }
  .article_link {
    &:hover {
      text-decoration: underline;
    }
  }

  /* .article_img {
    border-radius: 8px;
  } */
`;
