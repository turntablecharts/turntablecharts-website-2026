/* eslint-disable @next/next/no-img-element */
import React, { useState, useCallback, useRef } from "react";
import styled from "styled-components";
import Typography from "components/atoms/typography";
import Link from "next/link";
import { NewsSummary } from "utility/NewsApi/types";
import Theme from "constants/Theme";
import media from "constants/MediaQuery";
import MainArrow from "assets/icons/mainArrow.svg";

const ACCENT_COLORS = [
  Theme.colorPalette.ttcBlue,
  Theme.colorPalette.ttcOrange,
  Theme.colorPalette.ttcGreen,
  Theme.colorPalette.ttcDarkGreen,
  Theme.colorPalette.ttcRed,
];

const NewsCard = ({
  newsItem,
  variant = "compact",
  accentColor,
}: {
  newsItem: NewsSummary;
  variant?: "hero" | "large" | "compact" | "featured";
  accentColor?: string;
}) => {
  const initialColor = accentColor ?? Theme.colorPalette.ttcBlue;
  const [currentColor, setCurrentColor] = useState(initialColor);
  const lastColorRef = useRef(initialColor);

  const cycleColor = useCallback(() => {
    const others = ACCENT_COLORS.filter((c) => c !== lastColorRef.current);
    const next = others[Math.floor(Math.random() * others.length)];
    lastColorRef.current = next;
    setCurrentColor(next);
  }, []);

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
              <Typography.Heading fontType="Nohemi" weight="normal" level={2}>
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
      <NewsCardStyling
        className={variant}
        style={{ '--accent-color': currentColor } as any}
      >
        <div className="news_card-img">
          <Link href={`/news/${newsItem.id}`}>
            <a>
              <object data={newsItem.headerImageUri} type="image/png">
                <img src="/assets/ttcBgWhite.png" alt="fallback" />
              </object>
            </a>
          </Link>
        </div>
        <Link href={`/news/${newsItem.id}`}>
          <a className="news_card-content" onMouseEnter={cycleColor} onTouchStart={cycleColor}>
            {/* Hover color reveal */}
            <div className="featured_bg_overlay" />

            <div className="news_card-category">
              <span className="category_label">TOP NEWS</span>
            </div>

            <div className="featured_arrow" aria-hidden="true">
              <MainArrow />
            </div>

            <div className="news_card-title">
              <h2 className="featured_news_title">{newsItem.title}</h2>
            </div>
            <div className="news_card-date">
              <Typography.Text fontType="WorkSans" weight="medium" level="medium">
                {formatDate(newsItem.dateCreated)}
              </Typography.Text>
            </div>
          </a>
        </Link>
      </NewsCardStyling>
    );
  }

  /* ── Featured (big card — solid color block) ── */
  if (variant === "featured") {
    return (
      <NewsCardStyling
        className="featured"
        style={{
          backgroundImage: `url(${newsItem.headerImageUri})`,
          '--accent-color': accentColor ?? Theme.colorPalette.ttcRed
        } as any}
      >
        <Link href={`/news/${newsItem.id}`}>
          <a className="featured_link">
            {/* Colored overlay revealed on hover */}
            <div className="featured_bg_overlay" />

            {/* Arrow icon — top right */}
            <div className="featured_arrow" aria-hidden="true">
              <MainArrow />
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
      <Link href={`/news/${newsItem.id}`}>
        <a className="compact_link">
          <div className="news_card-img">
            <img
              src={newsItem.headerImageUri}
              alt={newsItem.title}
              onError={(e) => { (e.target as HTMLImageElement).src = '/assets/ttcBgWhite.png'; }}
            />
          </div>
          <div className="news_card-content">
            <div className="news_card-date">
              <Typography.Text fontType="WorkSans" weight="semiBold" level="small">
                {formatDate(newsItem.dateCreated)}
              </Typography.Text>
            </div>
            <div className="news_card-title">
              <Typography.Heading fontType="Nohemi" weight="bold" level={3}>
                {newsItem.title}
              </Typography.Heading>
            </div>
          </div>
        </a>
      </Link>
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


      h2 {
        color: white;
        font-size: clamp(1.8rem, 3vw, 3rem);
        line-height: 1.1;
        text-transform: uppercase;
        font-family: 'Nohemi', sans-serif;
      }

      p {
        color: rgba(255, 255, 255, 0.7);
      }
    }

    ${media.mobileLarge`
      height: 300px;

      .hero_content {
        padding: 20px 24px;
        gap: 8px;
        h2 {
          font-size: 1.3rem;
        }
      }
    `}
  }

  /* ── Large variant ── */
  &.large {
    flex-direction: row;
    height: 400px;
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
      flex: 1.2;
      padding: 40px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      position: relative;
      overflow: hidden;
      background-color: white;
      text-decoration: none;
      color: black;

      .featured_bg_overlay {
        position: absolute;
        inset: 0;
        background-color: var(--accent-color, ${Theme.colorPalette.ttcRed});
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: 1;
      }

      .news_card-category,
      .news_card-title,
      .news_card-date {
        position: relative;
        z-index: 3;
        transition: color 0.3s ease;
      }

      .featured_news_title {
        font-family: 'Nohemi', sans-serif !important;
        font-size: clamp(1.25rem, 2vw, 1.75rem);
        font-weight: 700;
        line-height: 1.15;
        text-transform: uppercase;
        margin-bottom: 20px;
      }

      .news_card-date {
        margin-top: auto;
        p {
          font-size: ${Theme.fontSizes.small};
        }
      }

      .news_card-category {
        margin-bottom: 12px;

        .category_label {
          font-family: 'Nohemi', sans-serif !important;
          font-weight: 600;
          color: ${Theme.colorPalette.ttcGreen};
          font-size: ${Theme.fontSizes.small};
          letter-spacing: 2px;
          text-transform: uppercase;
          display: block;
        }
      }

      .featured_arrow {
        position: absolute;
        top: 32px;
        right: 32px;
        width: 48px;
        height: 48px;
        opacity: 0;
        transform: translate(10px, -10px);
        transition: all 0.3s ease;
        z-index: 3;

        svg {
          width: 100%;
          height: 100%;
          rect { stroke: rgba(255, 255, 255, 0.7); }
        }
      }

      ${media.tabletMin`
        &:hover {
          .featured_bg_overlay { opacity: 1; }
          .featured_arrow { opacity: 1; transform: translate(0, 0); svg rect { stroke: white; } }
          .category_label, .featured_news_title, .news_card-date p { color: white !important; }
        }
      `}

      &:active {
        .featured_bg_overlay { opacity: 1; }
        .category_label, .featured_news_title, .news_card-date p { color: white !important; }
      }

      ${media.tabletMin`
        padding: 50px;
      `}
    }

    ${media.mobileLarge`
      flex-direction: column;
      height: auto;
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
        flex: 1;
        height: auto;
        padding: 20px;
        gap: 12px;
        overflow: visible;

        .news_card-category p { font-size: 12px; }
        .featured_news_title { font-size: 1.2rem !important; }
        .news_card-date p { font-size: 12px; }
      }
    `}
  }

  &.featured {
    cursor: pointer;
    background-size: cover;
    background-position: center;
    position: relative;
    overflow: hidden;

    .featured_link {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      padding: 28px 28px 32px;
      text-decoration: none;
      position: relative;
      z-index: 2;
      background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 50%);
    }

    .featured_bg_overlay {
      position: absolute;
      inset: 0;
      background-color: var(--accent-color, ${Theme.colorPalette.ttcRed});
      opacity: 0;
      transition: opacity 0.3s ease;
      z-index: -1;
    }

    ${media.tabletMin`
      &:hover .featured_bg_overlay { opacity: 1; }
    `}
    &:active .featured_bg_overlay { opacity: 1; }

    /* Circular arrow — top right */
    .featured_arrow {
      width: 52px;
      height: 52px;
      display: flex;
      align-items: center;
      justify-content: center;
      align-self: flex-end;
      flex-shrink: 0;
      opacity: 0;
      transform: translate(10px, -10px);
      transition: all 0.3s ease;

      svg {
        width: 100%;
        height: 100%;

        rect {
          stroke: rgba(255, 255, 255, 0.7);
          transition: stroke 0.2s ease;
        }
      }
    }

    ${media.tabletMin`
      &:hover .featured_arrow { opacity: 1; transform: translate(0, 0); svg rect { stroke: white; } }
    `}
    &:active .featured_arrow { opacity: 1; transform: translate(0, 0); svg rect { stroke: white; } }

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
      font-family: "Nohemi", sans-serif;
      font-size: 1.55rem;
      font-weight: 900;
      line-height: 1.15;
      color: white;
      text-transform: uppercase;
    }
  }

  /* ── Compact variant ── */
  &.compact {
    cursor: pointer;
    flex-direction: column;

    .compact_link {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      text-decoration: none;
    }

    .news_card-img {
      width: 100%;
      height: 220px;
      flex-shrink: 0;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        transition: transform 1s;
        object-fit: cover;
        display: block;
      }

      &:hover {
        img { transform: scale(1.05); }
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
        font-family: 'Host Grotesk', sans-serif;
        font-size: clamp(0.95rem, 1.3vw, 1.15rem);
        font-weight: 700;
        line-height: 1.3;
      }
    }

    ${media.mobileLarge`
      .news_card-img {
        height: 160px;
      }
  
    `}
  }
`;
