/* eslint-disable @next/next/no-img-element */
import Typography from "components/atoms/typography";
import { GetStaticProps, GetStaticPaths } from "next";
import Head from "next/head";
import ReactMarkdown from "react-markdown";
import WantUpdates from "components/molecules/WantUpdates";
import React from "react";
import styled from "styled-components";
import { getNewsByPageNumber, getSingleNewsById } from "utility/NewsApi/api";
import { NewsItem } from "utility/NewsApi/types";
import { format } from "date-fns";
import Theme from "constants/Theme";
import media from "constants/MediaQuery";
import ArticleCard from "components/molecules/ArticleCard";

const SingleArticlePage: React.FC<{
  selectedNews: NewsItem;
  relatedNews: NewsItem[];
}> = ({ selectedNews, relatedNews }) => {
  return (
    <SingleArticlePageStyling>
      <Head>
        <title>{selectedNews.title}</title>
        <meta
          name="description"
          content={`TurnTable News | ${selectedNews.title}`}
        />
      </Head>
      <div className="article_img">
        <img src={selectedNews.headerImageUri} alt="article" />
      </div>
      <div className="article_content">
        <div className="article_content-title">
          <Typography.Heading
            style={{ lineHeight: "30px" }}
            level={2}
            fontType="Mermaid"
          >
            {selectedNews.title}
          </Typography.Heading>
          <div className="title_meta">
            <Typography.Text fontType="Montserrat" level="large">
              by{" "}
              <span className="yellow">{`${selectedNews.ttcUser?.firstName} ${selectedNews.ttcUser?.lastName}`}</span>
            </Typography.Text>
            <Typography.Text fontType="Montserrat" level="large">
              {format(new Date(selectedNews.dateCreated), "PPpp")}
            </Typography.Text>
          </div>
        </div>
        <div className="article_content-body">
          <ReactMarkdown>{selectedNews.newsContent}</ReactMarkdown>
        </div>
      </div>
      <WantUpdates />
      <section className="related" style={{ marginTop: "100px" }}>
        <div className="section_title">
          <Typography.Heading
            fontType="Mermaid"
            level={3}
            style={{
              fontSize: Theme.fontSizes.xxlarge,
            }}
          >
            More amazing articles for you
          </Typography.Heading>
        </div>
        <div className="section_cards">
          {relatedNews.map((item) => (
            <ArticleCard key={item.id} newsItem={item} />
          ))}
        </div>
      </section>
    </SingleArticlePageStyling>
  );
};

export default SingleArticlePage;

export const getStaticProps: GetStaticProps = async (context) => {
  const newsId = context.params?.id;

  const newsResponse = await getNewsByPageNumber(1);

  if (typeof newsId === "string") {
    const news = await getSingleNewsById(newsId);

    if (news.status === 200) {
      return {
        props: {
          selectedNews: news.data,
          relatedNews: newsResponse.data
            .filter((item) => item.id.toString() !== newsId)
            .slice(0, 5),
        },
        revalidate: 7200,
      };
    }

    return {
      notFound: true,
    };
  }
  return {
    notFound: true,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const newsList = await getNewsByPageNumber(1);

  const paths = newsList.data.map((news) => ({
    params: { id: news.id.toString() },
  }));

  return {
    paths: paths,
    fallback: "blocking",
  };
};

const SingleArticlePageStyling = styled.div`
  .article_img {
    height: 50vh;
    overflow: hidden;
    display: flex;
    align-items: center;

    img {
      width: 100%;
    }
  }

  .article_content {
    max-width: 700px;
    width: 95%;
    margin: 80px auto;

    &-title {
      margin-bottom: 45px;
    }

    .title_meta {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &-body {
      white-space: pre-wrap;
      font-size: ${Theme.fontSizes.large};
      font-family: ${Theme.typography.primary};
      line-height: 26px;
      text-align: justify;

      h1 {
        line-height: 36px;
        font-size: 1.5rem;
      }

      img {
        width: 100%;
        margin: 30px 0;
      }
    }
  }

  section {
    max-width: 1200px;
    width: 95%;
    margin: 0 auto;
    margin-bottom: 100px;

    .section_title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }

    .section_cards {
      display: grid;
      gap: 20px;
      row-gap: 40px;
      grid-template-columns: repeat(5, minmax(180px, 1fr));

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
  }
`;
