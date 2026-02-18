/* eslint-disable @next/next/no-img-element */
import React from "react";
import styled from "styled-components";
import Typography from "components/atoms/typography";
import Link from "next/link";
import { NewsSummary } from "utility/NewsApi/types";
import Theme from "constants/Theme";
import media from "constants/MediaQuery";

const NewsCard = ({ newsItem, variant = 'compact' }: { newsItem: NewsSummary; variant?: 'large' | 'compact' }) => {
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).toUpperCase();
  };

  if (variant === 'large') {
    return (
      <NewsCardStyling className={variant}>
        <div className="news_card-img">
          <Link href={`/news/${newsItem.id}`}>
            <a>
              <object data={newsItem.headerImageUri} type="image/png">
                <img src="/assets/ttcBgWhite.png" alt="fallback" />
              </object>
            </a>
          </Link>
        </div>
        <div className="news_card-content">
          <div className="news_card-category">
            <Typography.Text fontType="Anton" weight="normal" level="small">
              TOP NEWS
            </Typography.Text>
          </div>
          <div className="news_card-title">
            <Typography.Heading fontType="Anton" weight="normal" level={2}>
              {newsItem.title}
            </Typography.Heading>
          </div>
          <div className="news_card-date">
            <Typography.Text fontType="WorkSans" weight="medium" level="medium">
              {formatDate(newsItem.dateCreated)}
            </Typography.Text>
          </div>
        </div>
      </NewsCardStyling>
    );
  }

  // Compact variant
  return (
    <NewsCardStyling className={variant}>
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
        <div className="news_card-date">
          <Typography.Text fontType="WorkSans" weight="medium" level="medium">
            {formatDate(newsItem.dateCreated)}
          </Typography.Text>
        </div>
        <Typography.Text
          fontType="Inter"
          style={{
            marginTop: "20px",
          }}
        >
          {newsItem.title}
        </Typography.Text>
      </div>

    </NewsCardStyling>
  );
};

export default NewsCard;

const NewsCardStyling = styled.div`
  max-width: auto;
  display: flex;
  flex-direction: column;

  /* Large variant - horizontal layout with white background */
  &.large {
    flex-direction: row;
    height: 350px;
    background-color: transparent;

    .news_card-img {
      width: 55%;
      height: 100%;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      flex-shrink: 0;

      a {
        height: 100%;
        width: 100%;
      }

      img,
      object {
        width: 100%;
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

    .news_card-content {
      flex: 1;
      background-color: white;
      padding: 40px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 20px;

      .news_card-category {
        p {
          color: ${Theme.colorPalette.ttcGreen};
          font-size: ${Theme.fontSizes.small};
          letter-spacing: 2px;
        }
      }

      .news_card-title {
        h2 {
          color: black;
          font-size: 2.5rem;
          line-height: 1.1;
          letter-spacing: -1%;
          text-transform: uppercase;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }

      .news_card-date {
      margin-top: auto;
        p {
          color: black;
          font-size: ${Theme.fontSizes.small};
        }
      }
    }
    
    /* Mobile: Vertical layout with 250px image + 250px content */
    ${media.mobileLarge`
      flex-direction: column;
      height: 500px;
      width: 100%;
      
      .news_card-img {
        width: 100%;
        height: 250px;
        
        img,
        object {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      
      .news_card-content {
        height: 250px;
        padding: 20px;
        gap: 12px;
        
        .news_card-category {
          p {
            font-size: 12px;
          }
        }
        
        .news_card-title {
          h2 {
            font-size: 1.5rem;
            -webkit-line-clamp: 2;
          }
        }
        
        .news_card-date {
          p {
            font-size: 12px;
          }
        }
      }
    `}
  }

  /* Compact variant - vertical layout */
  &.compact {
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
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        ${media.mobileLarge`
          font-size: 1rem;
        `}
      }
      flex: 1;
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
  }
`;
