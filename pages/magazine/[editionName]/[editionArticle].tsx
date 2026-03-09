/* eslint-disable @next/next/no-img-element */
import media from "constants/MediaQuery";
import { format } from "date-fns";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import React from "react";
import styled from "styled-components";
import { getSingleMagazineArticleById } from "utility/MagazinesApi/api";
import { MagazineArticleItem } from "utility/MagazinesApi/types";
import { useRouter } from "next/router";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const articleId = context.params?.editionArticle;
  const article = await getSingleMagazineArticleById(articleId as string);

  if (article.data) {
    return { props: { selectedArticle: article.data } };
  }
  return { notFound: true };
};

const EditionArticlePage: React.FC<{
  selectedArticle: MagazineArticleItem;
}> = ({ selectedArticle }) => {
  const router = useRouter();
  const editionName = router.query.editionName as string;

  const formattedDate = format(
    new Date(selectedArticle.dateCreated),
    "MMMM d, yyyy"
  ).toUpperCase();

  return (
    <ArticleStyling>
      <Head>
        <title>{selectedArticle.title} | TurnTable Charts</title>
        <meta name="description" content={selectedArticle.description} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@TurntableCharts" />
        <meta
          property="og:title"
          content={selectedArticle.title}
        />
        <meta
          property="og:description"
          content={selectedArticle.description}
        />
        <meta property="og:image" content={selectedArticle.headerImage} />
      </Head>

      <article className="article_wrapper">
        {/* Meta row: BY … | DATE */}
        <div className="article_meta">
          <span className="article_meta-by">
            BY <span className="article_meta-brand">TURNTABLE CHARTS</span>
          </span>
          <span className="article_meta-date">{formattedDate}</span>
        </div>

        {/* Headline */}
        <h1 className="article_headline">{selectedArticle.title}</h1>

        {/* Hero image */}
        <div className="article_hero">
          <img
            src={selectedArticle.headerImage}
            alt={selectedArticle.title}
          />
        </div>

        {/* Body */}
        <div className="article_body">
          {selectedArticle.description && (
            <p className="article_lead">{selectedArticle.description}</p>
          )}
          {/\/?[a-z][\s\S]*>/i.test(selectedArticle.content) ? (
            <div dangerouslySetInnerHTML={{ __html: selectedArticle.content }} />
          ) : (
            <ReactMarkdown>{selectedArticle.content}</ReactMarkdown>
          )}
        </div>

        {/* Back link */}
        {editionName && (
          <Link href={`/magazine/${editionName}`}>
            <a className="back_link">← Back to {editionName.replace(/_/g, " ")}</a>
          </Link>
        )}
      </article>
    </ArticleStyling>
  );
};

export default EditionArticlePage;

/* ─── Styles ── */
const ArticleStyling = styled.div`
  width: 100%;
  background-color: #0d0d0d;
  padding-top: 80px;
  padding-bottom: 120px;
  color: white;

  /* ── Article wrapper — matches nav width ── */
  .article_wrapper {
    width: 80vw;
    margin: 0 auto;
    padding: 40px 0 64px;

    ${media.smallDesktop` width: 88vw; `}
    ${media.tablet` width: 92vw; `}
    ${media.mobileLarge` width: 100%; padding: 24px 20px 48px; `}
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
    color: rgba(255, 255, 255, 0.45);
  }

  .article_meta-brand {
    color: #f1a01f;
    font-weight: 700;
  }

  /* Headline */
  .article_headline {
    font-family: "Anton", sans-serif;
    font-size: clamp(2rem, 4vw, 3.2rem);
    font-weight: 400;
    line-height: 1.1;
    color: white;
    text-transform: uppercase;
    margin-bottom: 32px;
  }

  /* Hero image */
  .article_hero {
    width: 100%;
    margin-bottom: 36px;

    img {
      width: 100%;
      height: auto;
      display: block;
    }
  }

  /* Body */
  .article_body {
    width: 100%;
    font-family: "Work Sans", sans-serif;
    font-size: 1rem;
    line-height: 1.8;
    color: rgba(255, 255, 255, 0.85);

    p { margin-bottom: 1.4em; }

    h1, h2, h3 {
      font-family: "Anton", sans-serif;
      font-weight: 400;
      text-transform: uppercase;
      color: white;
      margin: 1.6em 0 0.6em;
    }
    h1 { font-size: 2rem; }
    h2 { font-size: 1.5rem; }
    h3 { font-size: 1.2rem; }

    blockquote {
      border-left: 3px solid #f1a01f;
      margin-left: 0;
      padding: 8px 24px;
      font-style: italic;
      color: rgba(255,255,255,0.6);
      background: rgba(255,255,255,0.04);
    }

    img {
      width: 100%;
      margin: 28px 0;
      display: block;
    }
  }

  .article_lead {
    font-size: 1.1rem;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 2em;
    line-height: 1.7;
  }

  /* Back link */
  .back_link {
    display: inline-block;
    margin-top: 48px;
    font-family: "Work Sans", sans-serif;
    font-size: 0.85rem;
    font-weight: 600;
    color: rgba(255,255,255,0.4);
    text-decoration: none;
    letter-spacing: 0.5px;

    &:hover { color: white; }
  }
`;
