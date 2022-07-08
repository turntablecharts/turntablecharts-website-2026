import Typography from "components/atoms/typography";
import ArticleCard from "components/molecules/ArticleCard";
import WantUpdates from "components/molecules/WantUpdates";
import media from "constants/MediaQuery";

import Head from "next/head";
import React from "react";
import styled from "styled-components";
import { getNewsByPageNumber } from "utility/NewsApi/api";
import { NewsItem } from "utility/NewsApi/types";

export async function getStaticProps() {
  const newsResponse = await getNewsByPageNumber(1);

  return {
    props: {
      topNews: newsResponse.data.filter((item) => !item.isDeleted),
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 7200, // In seconds
  };
}

const News: React.FC<{ topNews: NewsItem[] }> = ({ topNews }) => {
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
        {topNews.map((item) => (
          <ArticleCard key={item.id} newsItem={item} />
        ))}
      </div>
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
