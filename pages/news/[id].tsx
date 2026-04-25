/* eslint-disable @next/next/no-img-element */
import Typography from "components/atoms/typography";
import NewsCard from "components/molecules/NewsCard";

import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import React from "react";
import styled from "styled-components";
import { getNewsByPageNumber, getSingleNewsById } from "utility/NewsApi/api";
import { NewsItem, NewsSummary } from "utility/NewsApi/types";
import { format } from "date-fns";
import media from "constants/MediaQuery";
import { headingMixin } from "constants/mixins";
import MainArrow from "assets/icons/mainArrow.svg";

export const getStaticProps: GetStaticProps = async (context) => {
  const newsId = context.params?.id;

  const newsResponse = await getNewsByPageNumber(1);
  const news = await getSingleNewsById(newsId as string);

  if (news.data) {
    return {
      props: {
        selectedNews: news.data,
        relatedNews: newsResponse.data.news
          .filter((n) => n.id.toString() !== newsId)
          .slice(0, 4),
      },
      revalidate: 3600,
    };
  }

  return { revalidate: 3600, notFound: true };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const newsList = await getNewsByPageNumber(1);
  const paths = newsList.data.news.map((n) => ({
    params: { id: n.id.toString() },
  }));
  return { paths, fallback: "blocking" };
};

const formatDate = (dateString: string) =>
  new Date(dateString)
    .toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })
    .toUpperCase();

const SingleArticlePage: React.FC<{
  selectedNews: NewsItem;
  relatedNews: NewsSummary[];
}> = ({ selectedNews, relatedNews }) => {
  const byline =
    selectedNews.ttcUser
      ? `${selectedNews.ttcUser.firstName} ${selectedNews.ttcUser.lastName}`
      : "Turntable Charts";

  return (
    <ArticleStyling>
      <Head>
        <title>{selectedNews.title} | TurnTable Charts</title>
        <meta name="description" content={selectedNews.description} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@TurntableCharts" />
        <meta
          property="og:url"
          content={`https://www.turntablecharts.com/news/${selectedNews.id}`}
        />
        <meta property="og:title" content={selectedNews.title} />
        <meta property="og:description" content={selectedNews.description} />
        <meta property="og:image" content={selectedNews.headerImageUri} />
      </Head>

      {/* ── Article body ── */}
      <article className="article_wrapper">

        {/* Meta row: BY … | DATE */}
        <div className="article_meta">
          <span className="article_meta-by">
            BY{" "}
            <span className="article_meta-brand">TURNTABLE CHARTS</span>
          </span>
          <span className="article_meta-date">
            {formatDate(selectedNews.dateCreated)}
          </span>
        </div>

        {/* Headline */}
        <h1 className="article_headline">{selectedNews.title}</h1>

        {/* Hero image */}
        <div className="article_hero">
          <img
            src={selectedNews.headerImageUri}
            alt={selectedNews.title}
          />
        </div>

        {/* Body copy */}
        <div className="article_body">
          <ReactMarkdown>{selectedNews.newsContent}</ReactMarkdown>
        </div>
      </article>

      {/* ── Latest articles ── */}
      {relatedNews.length > 0 && (
        <section className="latest_articles">
          {/* Section header */}
          <div className="latest_articles-header">
            <h2 className="latest_articles-title">LATEST ARTICLES</h2>
            <div className="latest_articles-arrow" aria-hidden="true">
              <MainArrow />
            </div>
          </div>

          {/* 3 related cards */}
          <div className="latest_articles-grid">
            {relatedNews.map((item) => (
              <div key={item.id} className="latest_card">
                <NewsCard newsItem={item} variant="compact" />
              </div>
            ))}
          </div>
        </section>
      )}

    </ArticleStyling>
  );
};

export default SingleArticlePage;

/* ─── Styles ──────────────────────────────────────────────────── */
const ArticleStyling = styled.main`
  width: 100%;
  background-color: white;

  .page_header {
    background-color: white;
    padding: 60px 0 20px;
    text-align: center;
    border-bottom: 1px solid #eee;
    margin-bottom: 40px;

    h1 {
      font-size: 3.5rem;
      font-family: "Nohemi", sans-serif;
      font-weight: 900;
      letter-spacing: -2px;
      margin: 0;
    }

    ${media.mobileLarge`
      padding: 40px 0 15px;
      h1 {
        font-size: 2.2rem;
        letter-spacing: -1px;
      }
    `}
  }
  padding-top: 80px;
  padding-bottom: 120px;

  /* ── Article wrapper — matches nav width exactly ── */
  .article_wrapper {
    width: 80vw;
    margin: 0 auto;
    padding: 40px 0 64px;

    ${media.smallDesktop`
      width: 88vw;
    `}
    ${media.tablet`
      width: 92vw;
    `}
    ${media.mobileLarge`
      width: 100%;
      padding: 24px 20px 48px;
    `}
  }

  /* Meta row */
  .article_meta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  .article_meta-by,
  .article_meta-date {
    font-family: "Work Sans", sans-serif;
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #8e8e8e;
  }

  .article_meta-brand {
    color: #F1A01F;
    font-weight: 700;
  }

  /* Headline */
  .article_headline {
    font-family: "Anton", sans-serif;
    font-size: clamp(2rem, 4vw, 3.2rem);
    font-weight: 400;
    line-height: 1.1;
    color: #000;
    text-transform: uppercase;
    margin-bottom: 32px;
  }

  /* Hero image — full width of the content column */
  .article_hero {
    width: 100%;
    margin-bottom: 36px;
    overflow: hidden;

    img {
      width: 100%;
      height: 460px;
      object-fit: cover;
      object-position: center 15%;
      display: block;
    }

    ${media.mobileLarge`
      img { height: 220px; }
    `}
  }

  /* Body copy */
  .article_body {
    width: 100%;
    font-family: "Work Sans", sans-serif;
    font-size: 1rem;
    line-height: 1.8;
    color: #222;

    p {
      margin-bottom: 1.4em;
    }

    h1, h2, h3 {
      font-family: "Anton", sans-serif;
      font-weight: 400;
      text-transform: uppercase;
      margin: 1.6em 0 0.6em;
    }

    h1 { font-size: 2rem; }
    h2 { font-size: 1.5rem; }
    h3 { font-size: 1.2rem; }

    blockquote {
      border-left: 3px solid #e8251a;
      margin-left: 0;
      padding: 8px 24px;
      font-style: italic;
      color: #555;
      background: #fafafa;
    }

    img {
      width: 100%;
      margin: 28px 0;
      display: block;
    }
  }

  /* ── Latest articles section — also matches nav width ── */
  .latest_articles {
    width: 80vw;
    margin: 0 auto;
    border-top: 1px solid #e0e0e0;
    padding-top: 40px;

    ${media.smallDesktop`
      width: 88vw;
    `}
    ${media.tablet`
      width: 92vw;
    `}
    ${media.mobileLarge`
      width: 100%;
      padding: 24px 20px 48px;
    `}
  }

  /* Section header: title left, arrow right */
  .latest_articles-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 32px;
  }

  .latest_articles-title {
    ${headingMixin}
    font-family: "Anton", sans-serif;
    font-weight: 400;
    color: #000;
    text-align: left;
    letter-spacing: 1px;
    margin: 0;
  }

  /* Circular arrow — desktop only */
  .latest_articles-arrow {
      width: 48px;
      height: 48px;
      cursor: pointer;
      transition: transform 0.3s ease;

      svg {
        width: 100%;
        height: 100%;
        rect {
          stroke: #111;
        }
        path {
          fill: #111;
        }
      }

      &:hover {
        transform: rotate(45deg);
      }
    }

  /* Card grid: 3-col desktop → 2×2 tablet/mobile */
  .latest_articles-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;

    ${media.tablet`
      grid-template-columns: repeat(2, 1fr);
    `}
    ${media.mobileLarge`
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
    `}
  }

  .latest_card {
    height: 320px;
    overflow: hidden;

    /* Hide 4th card on desktop — only show in 2×2 on tablet/mobile */
    &:nth-child(4) {
      display: none;

      ${media.tablet`
        display: block;
      `}
    }

    ${media.tablet`
      height: auto;
    `}
    ${media.mobileLarge`
      height: auto;

      .compact .news_card-img {
        height: 160px;
      }
    `}

    /* Override NewsCard colors for white background */
    .news_card-title h3 {
      color: black !important;
    }
    .news_card-date p {
      color: rgba(0, 0, 0, 0.5) !important;
    }
  }
`;
