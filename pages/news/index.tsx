import Typography from "components/atoms/typography";
import NewsCard from "components/molecules/NewsCard";
import WantUpdates from "components/molecules/WantUpdates";
import media from "constants/MediaQuery";
import { headingMixin } from "constants/mixins";
import Theme from "constants/Theme";

import Head from "next/head";
import React, { useCallback, useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import { getNewsByPageNumber } from "utility/NewsApi/api";
import { NewsSummary, NewsResponsePaginated } from "utility/NewsApi/types";

// Cycle through these brand colors for each 'featured' big card
const FEATURED_COLORS = [
  Theme.colorPalette.ttcBlue,
  Theme.colorPalette.ttcYellow2,
  Theme.colorPalette.ttcRed,
  Theme.colorPalette.ttcGreen,
];

export async function getStaticProps() {
  const newsResponse = await getNewsByPageNumber(1);

  return {
    props: {
      newsPage: newsResponse.data,
    },
    revalidate: 3600,
  };
}

const News: React.FC<{ newsPage: NewsResponsePaginated }> = ({ newsPage }) => {
  // All accumulated articles across pages
  const [allNews, setAllNews] = useState<NewsSummary[]>(newsPage.news);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(newsPage.totalItems);
  const [isFetching, setIsFetching] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // IntersectionObserver sentinel ref
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const pageSize = newsPage.pageSize || 12;
  const hasMore = allNews.length < totalItems;

  // Load next page and append
  const loadMore = useCallback(async () => {
    if (isFetching || !hasMore) return;
    setIsFetching(true);
    try {
      const nextPage = currentPage + 1;
      const res = await getNewsByPageNumber(nextPage);
      const data = res.data;
      setAllNews((prev) => [...prev, ...data.news]);
      setCurrentPage(nextPage);
      setTotalItems(data.totalItems);
    } catch (err) {
      // fail silently — user can scroll again
    } finally {
      setIsFetching(false);
    }
  }, [isFetching, hasMore, currentPage]);

  // Wire up IntersectionObserver to the sentinel
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { rootMargin: "200px" } // start fetching 200px before sentinel is visible
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadMore]);

  // Show/hide back-to-top after 400px scroll
  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  // Hero = index 0; grid = index 1+
  const heroItem = allNews[0];
  const gridItems = allNews.slice(1);

  return (
    <NewsPageStyling>
      <Head>
        <title>TurnTable Charts | News This Week</title>
        <meta name="description" content="TurnTable Charts - News This Week" />
      </Head>

      <div className="page_header">
        <Typography.Title>News This Week</Typography.Title>
      </div>

      {/* Hero card — first article, full bleed */}
      {heroItem && (
        <div className="hero_card">
          <NewsCard newsItem={heroItem} variant="hero" />
        </div>
      )}

      <hr className="section_divider" />

      {/* Remaining cards grid */}
      <div className="page_article_cards">
        {(() => {
          let bigCardCount = 0;
          return gridItems.map((item, index) => {
            const posInGroup = index % 3;
            const groupIndex = Math.floor(index / 3);
            const isBig =
              (groupIndex % 2 === 0 && posInGroup === 2) ||
              (groupIndex % 2 === 1 && posInGroup === 0);
            const accentColor = isBig
              ? FEATURED_COLORS[bigCardCount++ % FEATURED_COLORS.length]
              : undefined;
            return (
              <div
                key={item.id}
                className={`card_wrap ${isBig ? "card_wrap--big" : "card_wrap--small"}`}
              >
                <NewsCard
                  newsItem={item}
                  variant={isBig ? "featured" : "compact"}
                  accentColor={accentColor}
                />
              </div>
            );
          });
        })()}
      </div>

      {/* Infinite scroll sentinel */}
      <div ref={sentinelRef} className="scroll_sentinel" aria-hidden="true" />

      {/* Loading spinner */}
      {isFetching && (
        <div className="load_indicator" aria-label="Loading more articles">
          <span className="spinner" />
        </div>
      )}

      {/* End-of-feed message */}
      {!hasMore && allNews.length > 0 && (
        <p className="end_message">You&apos;re all caught up ✦</p>
      )}


      {/* Back-to-top button */}
      <button
        className={`back_to_top ${showBackToTop ? "back_to_top--visible" : ""}`}
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M12 19V5M5 12l7-7 7 7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </NewsPageStyling>
  );
};

export default News;

/* ─── Animations ─────────────────────────────────────────────── */
const spin = keyframes`
  to { transform: rotate(360deg); }
`;
const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
`;

/* ─── Styled component ───────────────────────────────────────── */
const NewsPageStyling = styled.div`
  width: 100%;
  background-color: white;
  padding-top: 80px;

  /* Page heading */
  .page_header {
    max-width: 1300px;
    margin: 0 auto;
    text-align: center;
    h1 {
      ${headingMixin}
      padding: 2rem 0;
      color: black;
    }
  }

  /* Hero card */
  .hero_card {
    max-width: 1300px;
    width: 90%;
    margin: 0 auto;
    overflow: hidden;
  }

  /* Thin divider */
  .section_divider {
    border: none;
    border-top: 1px solid #e0e0e0;
    margin: 40px 0;
  }

  /* Cards grid — alternating big/small pattern
     Small : Big ratio = 320 : 500 (total row = 1140)
     With 2 gaps of 24px each (48px total):
       small width = (100% - 48px) × 320/1140  ≈ calc(28.07% - 13.5px)
       big   width = (100% - 48px) × 500/1140  ≈ calc(43.86% - 21px)
     This guarantees exactly 3 cards per row at ANY container width.
  */
  .page_article_cards {
    max-width: 1300px;
    width: 90%;
    margin: 0 auto 0;
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
    row-gap: 32px;
    justify-content: center;

    .card_wrap {
      overflow: hidden;
      flex-shrink: 0;
      animation: ${fadeInUp} 0.4s ease both;

      &.card_wrap--small {
        width: calc(28.07% - 13.5px);
        height: 320px;
      }

      &.card_wrap--big {
        width: calc(43.86% - 21px);
        height: 360px;
      }
    }

    /* Two columns on mobile */
    ${media.mobileLarge`
      .card_wrap--small,
      .card_wrap--big {
        width: calc(50% - 12px);
        height: 220px;
      }
    `}
  }

  /* Sentinel — invisible trigger element */
  .scroll_sentinel {
    height: 1px;
    width: 100%;
    margin-top: 40px;
  }

  /* Loading spinner */
  .load_indicator {
    display: flex;
    justify-content: center;
    padding: 40px 0;
  }

  .spinner {
    display: block;
    width: 36px;
    height: 36px;
    border: 3px solid #e0e0e0;
    border-top-color: #0d0d0d;
    border-radius: 50%;
    animation: ${spin} 0.8s linear infinite;
  }

  /* End-of-feed */
  .end_message {
    text-align: center;
    padding: 48px 0 64px;
    font-family: "Work Sans", sans-serif;
    font-size: 0.85rem;
    font-weight: 600;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: #aaa;
  }

  /* ── Back-to-top button ── */
  .back_to_top {
    position: fixed;
    bottom: 36px;
    right: 36px;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background-color: #0d0d0d;
    color: white;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
    opacity: 0;
    transform: translateY(16px);
    pointer-events: none;
    transition: opacity 0.3s ease, transform 0.3s ease, background-color 0.2s ease;
    z-index: 999;

    svg {
      width: 20px;
      height: 20px;
    }

    &.back_to_top--visible {
      opacity: 1;
      transform: translateY(0);
      pointer-events: auto;
    }

    &:hover {
      background-color: #e8251a;
      transform: translateY(-2px);
    }

    &:active {
      transform: translateY(0);
    }

    ${media.mobileLarge`
      bottom: 20px;
      right: 20px;
      width: 42px;
      height: 42px;
    `}
  }
`;
