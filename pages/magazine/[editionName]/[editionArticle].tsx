/* eslint-disable @next/next/no-img-element */
import Typography from "components/atoms/typography";
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from "next";
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
import NewsCard from "components/molecules/NewsCard";
import { getSingleMagazineArticleById } from "utility/MagazinesApi/api";
import { MagazineArticleItem } from "utility/MagazinesApi/types";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const articleId = context.params?.editionArticle;

  const article = await getSingleMagazineArticleById(articleId as string);

  if (article.data) {
    return {
      props: {
        selectedArticle: article.data,
      },
      // revalidate: 3600,
    };
  }

  return {
    revalidate: 3600,
    notFound: true,
  };
};

const EditionArticlePage: React.FC<{
  selectedArticle: MagazineArticleItem;
}> = ({ selectedArticle }) => {
  return (
    <EditionArticlePageStyling>
      <Head>
        <title>{selectedArticle.title}</title>
        <meta
          name="description"
          content={`TurnTable News | ${selectedArticle.title}`}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@TurntableCharts" />
        <meta
          property="og:url"
          content={`https://www.turntablecharts.com/news/${selectedArticle.id.toString()}`}
        />
        <meta property="og:title" content={`${selectedArticle.title}`} />
        <meta
          property="og:description"
          content={`${selectedArticle.description}`}
        />
        <meta property="og:image" content={`${selectedArticle.headerImage}`} />
      </Head>
      <div className="article_img">
        <img src={selectedArticle.headerImage} alt="article" />
      </div>
      <div className="article_content">
        <div className="article_content-title">
          <Typography.Heading
            style={{ lineHeight: "30px" }}
            level={2}
            fontType="Mermaid">
            {selectedArticle.title}
          </Typography.Heading>
          <div className="title_meta">
            {/* <Typography.Text fontType="Montserrat" level="large"> */}
            {/* {selectedArticle.description} */}
            <div
              style={{ fontFamily: "Montserrat", fontSize: "16px" }}
              dangerouslySetInnerHTML={{
                __html: selectedArticle.description,
              }}
            />
            {/* </Typography.Text> */}
            <Typography.Text fontType="Montserrat" level="large">
              {format(new Date(selectedArticle.dateCreated), "PPP")}
            </Typography.Text>
          </div>
        </div>
        <div className="article_content-body">
          {/<\/?[a-z][\s\S]*>/i.test(selectedArticle.content) ? (
            <div
              dangerouslySetInnerHTML={{ __html: selectedArticle.content }}
            />
          ) : (
            <ReactMarkdown>{selectedArticle.content}</ReactMarkdown>
          )}
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
            }}>
            More amazing articles for you
          </Typography.Heading>
        </div>
        {/* <div className="section_cards">
          {relatedNews.map((item) => (
            <NewsCard key={item.id} newsItem={item} />
          ))}
        </div> */}
      </section>
    </EditionArticlePageStyling>
  );
};

export default EditionArticlePage;

const EditionArticlePageStyling = styled.div`
  .article_img {
    height: 50vh;
    overflow: hidden;
    display: flex;
    align-items: center;

    img {
      width: 100%;
      background-position: center;
      background-size: cover;
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
