import Typography from "components/atoms/typography";
import NewsCard from "components/molecules/NewsCard";
import Pagination from "components/molecules/Pagination";
import WantUpdates from "components/molecules/WantUpdates";
import media from "constants/MediaQuery";
import { headingMixin } from "constants/mixins";

import Head from "next/head";
import React, { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { getNewsByPageNumber } from "utility/NewsApi/api";
import { NewsResponsePaginated, NewsSummary } from "utility/NewsApi/types";

export async function getStaticProps() {
  const newsResponse = await getNewsByPageNumber(1);

  return {
    props: {
      newsPage: newsResponse.data,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 3600, // In seconds
  };
}

const News: React.FC<{ newsPage: NewsResponsePaginated }> = ({ newsPage }) => {
  const [page, setPage] = useState(1);

  const { data: paginatedNews } = useQuery(
    ["newsPage", page],
    () => getNewsByPageNumber(page).then((res) => res.data),
    {
      enabled: page !== 1,
      staleTime: 60 * 60 * 1000,
      cacheTime: 60 * 60 * 1000,
      keepPreviousData: true,
    }
  );

  const newsData = page === 1 || !paginatedNews ? newsPage : paginatedNews;

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
      {newsData?.news[0] && (
        <div className="hero_card">
          <NewsCard newsItem={newsData.news[0]} variant="hero" />
        </div>
      )}

      <hr className="section_divider" />

      {/* Remaining cards grid */}
      <div className="page_article_cards">
        {newsData?.news.slice(1).map((item) => (
          <NewsCard key={item.id} newsItem={item} />
        ))}
      </div>

      <Pagination totalElements={newsData?.totalItems!} setPage={setPage} />
      <WantUpdates />
    </NewsPageStyling>
  );
};

export default News;

const NewsPageStyling = styled.div`
  width: 100%;
  background-color: white;
  padding-top: 80px; /* clear fixed navbar */

  /* Page heading */
  .page_header {
    text-align: center;

    h1 {
      ${headingMixin}
      padding: 5rem 0 2rem 0;
      color: black;
    }
  }

  /* Hero card */
  .hero_card {
    width: 80%;
    margin: 0 auto;
    overflow: hidden;
  }

  /* Thin divider between hero and cards */
  .section_divider {
    border: none;
    border-top: 1px solid #e0e0e0;
    margin: 40px 0;
  }

  /* Cards grid */
  .page_article_cards {
    max-width: 1200px;
    width: 90%;
    margin: 0 auto 80px;
    display: grid;
    gap: 32px;
    row-gap: 48px;
    grid-template-columns: repeat(3, 1fr);

    ${media.tablet`
      grid-template-columns: repeat(2, 1fr);
    `}
    ${media.mobileLarge`
      grid-template-columns: 1fr;
    `}
  }
`;
