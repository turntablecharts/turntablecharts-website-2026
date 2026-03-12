/* eslint-disable @next/next/no-img-element */
import React from "react";
import styled from "styled-components";
import Typography from "components/atoms/typography";
import Link from "next/link";
import { NewsSummary } from "utility/NewsApi/types";
import Theme from "constants/Theme";
import media from "constants/MediaQuery";

const NewsCard = ({
  newsItem,
  variant = "compact",
  accentColor,
}: {
  newsItem: NewsSummary;
  variant?: "hero" | "large" | "compact" | "featured";
  accentColor?: string;
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date
      .toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
      .toUpperCase();
  };

  /* ── Hero ── */
  if (variant === "hero") {
    return (
      <NewsCardStyling className="hero">
        <Link href={`/news/${newsItem.id}`}>
          <a className="hero_link">
            <div
              className="hero_bg"
              style={{
                backgroundImage: `url(${newsItem.headerImageUri}), url('/assets/ttcBgWhite.png')`,
              }}
            />
            <div className="hero_overlay" />
            <div className="hero_content">
              <span className="hero_tag">TOP STORY</span>
              <Typography.Heading fontType="Anton" weight="normal" level={2}>
                {newsItem.title}
              </Typography.Heading>
              <Typography.Text fontType="WorkSans" weight="medium" level="small">
                {formatDate(newsItem.dateCreated)}
              </Typography.Text>
            </div>
          </a>
        </Link>
      </NewsCardStyling>
    );
  }

  /* ── Large ── */
  if (variant === "large") {
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

  /* ── Featured (big card — solid color block) ── */
  if (variant === "featured") {
    return (
      <NewsCardStyling
        className="featured"
        style={{ backgroundColor: accentColor ?? Theme.colorPalette.ttcRed } as React.CSSProperties}
      >
        <Link href={`/news/${newsItem.id}`}>
          <a className="featured_link">
            {/* Arrow icon — top right */}
            <div className="featured_arrow" aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 17L17 7M17 7H7M17 7V17"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Text block — bottom */}
            <div className="featured_content">
              <span className="featured_date">
                {formatDate(newsItem.dateCreated)}
              </span>
              <h2 className="featured_title">{newsItem.title}</h2>
            </div>
          </a>
        </Link>
      </NewsCardStyling>
    );
  }

  /* ── Compact (default) ── */
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
        <div className="news_card-date">
          <Typography.Text fontType="WorkSans" weight="semiBold" level="small">
            {formatDate(newsItem.dateCreated)}
          </Typography.Text>
        </div>
        <div className="news_card-title">
          <Typography.Heading fontType="WorkSans" weight="bold" level={3}>
            {newsItem.title}
          </Typography.Heading>
        </div>
      </div>
    </NewsCardStyling>
  );
};

export default NewsCard;

const NewsCardStyling = styled.div`
  max-width: auto;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  /* ── Hero variant ── */
  &.hero {
    position: relative;
    width: 100%;
    height: 600px;
    overflow: hidden;
    cursor: pointer;

    .hero_link {
      display: block;
      width: 100%;
      height: 100%;
      position: relative;
    }

    .hero_bg {
      position: absolute;
      inset: 0;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      transition: transform 1s ease;
    }

    &:hover .hero_bg {
      transform: scale(1.04);
    }

    .hero_overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(
        to top,
        rgba(0, 0, 0, 0.85) 0%,
        rgba(0, 0, 0, 0.3) 50%,
        rgba(0, 0, 0, 0) 100%
      );
    }

    .hero_content {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 40px 60px;
      display: flex;
      flex-direction: column;
      gap: 12px;

      .hero_tag {
        font-family: "Work Sans", sans-serif;
        font-size: 0.75rem;
        font-weight: 600;
        letter-spacing: 3px;
        color: ${Theme.colorPalette.ttcYellow};
        text-transform: uppercase;
      }

      h2 {
        color: white;
        font-size: clamp(1.8rem, 3vw, 3rem);
        line-height: 1.1;
        text-transform: uppercase;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      p {
        color: rgba(255, 255, 255, 0.7);
      }
    }

    ${media.mobileLarge`
      height: 250px;

      .hero_content {
        padding: 20px 24px;
        gap: 8px;

        h2 {
          font-size: 1.3rem;
          -webkit-line-clamp: 2;
        }
      }
    `}
  }

  /* ── Large variant ── */
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

        .news_card-category p { font-size: 12px; }
        .news_card-title h2 { font-size: 1.5rem; -webkit-line-clamp: 2; }
        .news_card-date p { font-size: 12px; }
      }
    `}
  }

  &.featured {
    cursor: pointer;
    transition: filter 0.25s ease;

    &:hover {
      filter: brightness(1.08);
    }

    .featured_link {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      padding: 28px 28px 32px;
      text-decoration: none;
      position: relative;
    }

    /* Circular arrow — top right */
    .featured_arrow {
      width: 52px;
      height: 52px;
      border-radius: 50%;
      border: 2px solid rgba(255, 255, 255, 0.7);
      display: flex;
      align-items: center;
      justify-content: center;
      align-self: flex-end;
      flex-shrink: 0;
      transition: border-color 0.2s ease, transform 0.25s ease;

      svg {
        width: 22px;
        height: 22px;
      }
    }

    &:hover .featured_arrow {
      border-color: white;
      transform: rotate(45deg);
    }

    /* Content anchored to bottom */
    .featured_content {
      margin-top: auto;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .featured_date {
      font-family: "Work Sans", sans-serif;
      font-size: 0.72rem;
      font-weight: 600;
      letter-spacing: 2px;
      color: rgba(255, 255, 255, 0.75);
      text-transform: uppercase;
    }

    .featured_title {
      font-family: "Anton", sans-serif;
      font-size: 1.55rem;
      font-weight: 400;
      line-height: 1.15;
      color: white;
      text-transform: uppercase;
      display: -webkit-box;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  }

  /* ── Compact variant ── */
  &.compact {
    cursor: pointer;
    flex-direction: column;

    .news_card-img {
      width: 100%;
      height: 220px;
      flex-shrink: 0;
      overflow: hidden;

      a {
        display: block;
        height: 100%;
        width: 100%;
      }

      img, object {
        width: 100%;
        height: 100%;
        transition: transform 1s;
        object-fit: cover;
        display: block;
      }

      &:hover {
        img, object { transform: scale(1.05); }
      }
    }

    .news_card-content {
      padding: 14px 0 0;
      display: flex;
      flex-direction: column;
      gap: 8px;

      .news_card-date p {
        color: rgba(255, 255, 255, 0.45);
        font-size: 0.7rem;
        font-weight: 600;
        letter-spacing: 1.5px;
        text-transform: uppercase;
      }

      .news_card-title h3 {
        color: white;
        font-family: "Work Sans", sans-serif;
        font-size: clamp(0.95rem, 1.3vw, 1.15rem);
        font-weight: 700;
        line-height: 1.3;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
    }


  }
`;
