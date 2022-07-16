import Typography from "components/atoms/typography";
import NewsCard from "components/molecules/NewsCard";
import Pagination from "components/molecules/Pagination";
import WantUpdates from "components/molecules/WantUpdates";
import media from "constants/MediaQuery";

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
      <div className="page_article_cards">
        {newsData?.news.map((item) => (
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
  max-width: 1200px;
  width: 95%;
  margin: 0 auto;
  .page_header {
    padding: 7vh 0;
    text-align: center;

    h1 {
      font-size: 64px;
    }
    ${media.tabletMin`
      h1 {
        font-size: 50px;

      }
    `}
  }

  .page_article_cards {
    display: grid;
    gap: 20px;
    row-gap: 40px;
    margin-bottom: 100px;
    grid-template-columns: repeat(4, minmax(200px, 1fr));

    ${media.smallDesktop`
      grid-template-columns: repeat(4, minmax(180px, 1fr));
    `}
    ${media.tablet`
      grid-template-columns: repeat(3, minmax(180px, 1fr));
    `}
      ${media.mobileLarge`
      grid-template-columns: repeat(2, minmax(180px, 1fr));
    `}
  }
`;
