/* eslint-disable @next/next/no-img-element */
import { headingMixin } from "constants/mixins";
import media from "constants/MediaQuery";
import { format } from "date-fns";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import styled, { keyframes } from "styled-components";
import {
  getAllMagazineEditions,
  getSingleMagazineEditionByName,
} from "utility/MagazinesApi/api";
import {
  MagazineEditionArticles,
  EditionArticleSummary,
} from "utility/MagazinesApi/types";

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: "blocking" };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const editionName = context.params?.editionName;
  const [articlesRes, editionsRes] = await Promise.all([
    getSingleMagazineEditionByName(editionName as string),
    getAllMagazineEditions(),
  ]);
  if (articlesRes.data) {
    const matchedEdition = editionsRes.data.find((e) => e.name === editionName);
    return {
      props: {
        editionArticles: articlesRes.data,
        coverImageUrl: matchedEdition?.coverImageUrl ?? null,
      },
      revalidate: 3600,
    };
  }
  return { notFound: true, revalidate: 3600 };
};

const EditionName: React.FC<{
  editionArticles: MagazineEditionArticles;
  coverImageUrl: string | null;
}> = ({ editionArticles, coverImageUrl }) => {
  const router = useRouter();
  const editionName = router.query.editionName as string;

  const articles = [...editionArticles.magazineData].sort(
    (a, b) =>
      new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime()
  );

  const cover = articles[0]; // magazine cover article
  const rest = articles.slice(1);

  return (
    <EditionStyling>
      <Head>
        <title>{editionArticles.name} | TurnTable Charts</title>
        <meta
          name="description"
          content={`TurnTable Charts Magazine — ${editionArticles.name}`}
        />
      </Head>

      <div className="edition_body">
        {/* ══════════════════════════════════════
            SECTION 1: Large cover + text article list
        ══════════════════════════════════════ */}
        {cover && (
          <div className="section_top">
            {/* Magazine cover — left */}
            <Link href={`/magazine/${editionName}/${cover.id}`}>
              <a className="cover_img">
                <img
                  src={coverImageUrl || cover.headerImage}
                  alt={editionArticles.name}
                  onError={(e) => { (e.target as HTMLImageElement).src = '/assets/ttcBgWhite.png'; }}
                />
              </a>
            </Link>

            {/* Credits index — right */}
            <div className="text_index">
              <h2 className="text_index-heading">{editionArticles.name.replace(/_/g, ' ')}</h2>
              {articles.map((article) => (
                <Link
                  key={article.id}
                  href={`/magazine/${editionName}/${article.id}`}
                >
                  <a className="text_item">
                    <span className="text_item-title">{article.title}</span>
                    {article.writer && (
                      <span className="text_item-writer">{article.writer}</span>
                    )}
                  </a>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════
            SECTION 2: Medium cover (left) + thumbnail grid (right)
        ══════════════════════════════════════ */}
        {cover && rest.length > 0 && (
          <div className="section_bottom">
            {/* Cover story in-article image — left */}
            <Link href={`/magazine/${editionName}/${cover.id}`}>
              <a className="cover_img cover_img--medium">
                <img
                  src={cover.headerImage}
                  alt={cover.title}
                  onError={(e) => { (e.target as HTMLImageElement).src = '/assets/ttcBgWhite.png'; }}
                />
              </a>
            </Link>

            {/* Thumbnail grid — right */}
            <div className="thumb_grid">
              {rest.map((article) => (
                <Link
                  key={article.id}
                  href={`/magazine/${editionName}/${article.id}`}
                >
                  <a className="thumb_item">
                    <div className="thumb_item-img">
                      <img
                        src={article.headerImage}
                        alt={article.title}
                        onError={(e) => { (e.target as HTMLImageElement).src = '/assets/ttcBgWhite.png'; }}
                      />
                    </div>
                    <h3 className="thumb_item-title">{article.title}</h3>
                  </a>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </EditionStyling>
  );
};

export default EditionName;

/* ─── Animation ─── */
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const EditionStyling = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #0d0d0d;
  color: white;
  padding-top: 80px;
  padding-bottom: 120px;

  .edition_body {
    width: 80vw;
    margin: 0 auto;
    animation: ${fadeIn} 0.35s ease both;

    ${media.smallDesktop` width: 88vw; `}
    ${media.tablet` width: 92vw; `}
    ${media.mobileLarge` width: 100%; padding: 0 20px; `}
  }

  /* ══════════════════════════════════════
     SECTION 1: Cover + credits index
  ══════════════════════════════════════ */
  .section_top {
    display: grid;
    grid-template-columns: 58% 1fr;
    gap: 48px;
    padding: 48px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);

    ${media.tablet`
      grid-template-columns: 1fr;
      gap: 28px;
    `}
  }

  /* Cover image */
  .cover_img {
    display: block;
    overflow: hidden;
    text-decoration: none;
    cursor: pointer;

    img {
      width: 100%;
      height: auto;
      display: block;
      transition: transform 0.5s ease;
      pointer-events: none;
    }

    &:hover img { transform: scale(1.02); }
  }

  /* Credits list — right of section_top */
  .text_index {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .text_index-heading {
    font-family: 'Host Grotesk', sans-serif;
    font-size: 1rem;
    font-weight: 700;
    color: white;
    margin: 0 0 16px;
    padding-bottom: 16px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.12);
    text-transform: none;
    letter-spacing: 0;

    ${media.mobileLarge` display: none; `}
  }

  .text_item {
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding: 18px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.07);
    text-decoration: none;
    cursor: pointer;
    transition: opacity 0.2s ease;

    &:hover { opacity: 0.65; }

    ${media.mobileLarge`
      padding: 20px 0;
      gap: 8px;
    `}
  }

  .text_item-title {
    font-family: 'Host Grotesk', sans-serif;
    font-size: 0.92rem;
    font-weight: 700;
    color: white;
    line-height: 1.3;

    ${media.mobileLarge`
      font-size: 1.05rem;
    `}
  }

  .text_item-writer {
    font-family: "Work Sans", sans-serif;
    font-size: 0.8rem;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.55);
    line-height: 1.55;

    ${media.mobileLarge`
      font-size: 0.875rem;
    `}
  }

  /* ══════════════════════════════════════
     SECTION 2: Cover story image + thumb grid
  ══════════════════════════════════════ */
  .section_bottom {
    display: grid;
    grid-template-columns: 58% 1fr;
    gap: 48px;
    padding: 48px 0;

    ${media.tablet`
      grid-template-columns: 1fr;
      gap: 28px;
    `}
  }

  /* Article list — single column */
  .thumb_grid {
    display: flex;
    flex-direction: column;
    gap: 0;
    align-content: start;
  }

  .thumb_item {
    display: flex;
    flex-direction: column;
    gap: 12px;
    text-decoration: none;
    cursor: pointer;
    padding: 20px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    transition: opacity 0.2s ease;

    &:first-child { padding-top: 0; }
    &:hover { opacity: 0.8; }
  }

  .thumb_item-img {
    overflow: hidden;
    width: 100%;

    img {
      width: 100%;
      height: auto;
      object-fit: cover;
      object-position: center;
      display: block;
      transition: transform 0.4s ease;
      pointer-events: none;
    }

    .thumb_item:hover & img { transform: scale(1.02); }
  }

  .thumb_item-title {
    font-family: 'Host Grotesk', sans-serif;
    font-size: 0.95rem;
    font-weight: 600;
    color: white;
    line-height: 1.4;
    margin: 0;
  }
`;
