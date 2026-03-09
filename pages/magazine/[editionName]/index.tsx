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
  const editions = await getAllMagazineEditions();
  const paths = editions.data.map((edition) => ({
    params: { editionName: edition.name.toString() },
  }));
  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const editionName = context.params?.editionName;
  const response = await getSingleMagazineEditionByName(editionName as string);
  if (response.data) {
    return { props: { editionArticles: response.data }, revalidate: 3600 };
  }
  return { notFound: true, revalidate: 3600 };
};

const EditionName: React.FC<{ editionArticles: MagazineEditionArticles }> = ({
  editionArticles,
}) => {
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
            {/* Cover image — left */}
            <Link href={`/magazine/${editionName}/${cover.id}`}>
              <a className="cover_img">
                <object data={cover.headerImage} type="image/png">
                  <img src="/assets/ttcBgWhite.png" alt="cover" />
                </object>
              </a>
            </Link>

            {/* Text index — right */}
            <div className="text_index">
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
            {/* Cover repeated — left */}
            <Link href={`/magazine/${editionName}/${cover.id}`}>
              <a className="cover_img cover_img--medium">
                <object data={cover.headerImage} type="image/png">
                  <img src="/assets/ttcBgWhite.png" alt="cover" />
                </object>
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
                      <object data={article.headerImage} type="image/png">
                        <img src="/assets/ttcBgWhite.png" alt="fallback" />
                      </object>
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
     SECTION 1: Cover + text index
  ══════════════════════════════════════ */
  .section_top {
    display: grid;
    grid-template-columns: 55% 1fr;
    gap: 48px;
    padding: 48px 0 48px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);

    ${media.tablet`
      grid-template-columns: 1fr;
      gap: 32px;
    `}
  }

  /* Cover image shared styles */
  .cover_img {
    display: block;
    overflow: hidden;
    text-decoration: none;
    cursor: pointer;

    object, img {
      width: 100%;
      height: auto;
      display: block;
      transition: transform 0.5s ease;
    }

    &:hover object,
    &:hover img {
      transform: scale(1.03);
    }

    /* Medium variant for section 2 — same natural height */
    &.cover_img--medium {
      object, img { height: auto; }
    }
  }

  /* Text article index */
  .text_index {
    display: flex;
    flex-direction: column;
    gap: 0;
    justify-content: flex-start;
    overflow-y: auto;
    max-height: 560px;
  }

  .text_item {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 16px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.07);
    text-decoration: none;
    cursor: pointer;
    transition: opacity 0.2s ease;

    &:first-child { border-top: 1px solid rgba(255, 255, 255, 0.07); }
    &:hover { opacity: 0.7; }
  }

  .text_item-title {
    font-family: "Anton", sans-serif;
    font-size: clamp(0.95rem, 1.2vw, 1.1rem);
    font-weight: 400;
    color: white;
    text-transform: uppercase;
    line-height: 1.2;
  }

  .text_item-writer {
    font-family: "Work Sans", sans-serif;
    font-size: 0.78rem;
    color: rgba(255, 255, 255, 0.45);
    line-height: 1.4;
  }

  /* ══════════════════════════════════════
     SECTION 2: Medium cover + thumb grid
  ══════════════════════════════════════ */
  .section_bottom {
    display: grid;
    grid-template-columns: 55% 1fr;
    gap: 48px;
    padding: 48px 0;

    ${media.tablet`
      grid-template-columns: 1fr;
      gap: 32px;
    `}
  }

  /* Thumbnail grid */
  .thumb_grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    align-content: start;

    ${media.mobileLarge` gap: 14px; `}
  }

  .thumb_item {
    display: flex;
    flex-direction: column;
    gap: 10px;
    text-decoration: none;
    cursor: pointer;
  }

  .thumb_item-img {
    overflow: hidden;
    width: 100%;

    object, img {
      width: 100%;
      height: 180px;
      object-fit: cover;
      object-position: top;
      display: block;
      transition: transform 0.4s ease;
    }

    .thumb_item:hover & {
      object, img { transform: scale(1.05); }
    }

    ${media.mobileLarge` object, img { height: 130px; } `}
  }

  .thumb_item-title {
    font-family: "Work Sans", sans-serif;
    font-size: 0.85rem;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.85);
    line-height: 1.4;
    margin: 0;
  }
`;
