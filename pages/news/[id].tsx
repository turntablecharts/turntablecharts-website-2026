/* eslint-disable @next/next/no-img-element */
import NewsCard from "components/molecules/NewsCard";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import ReactMarkdown from "react-markdown";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { getNewsByPageNumber, getSingleNewsById } from "utility/NewsApi/api";
import { NewsItem, NewsSummary } from "utility/NewsApi/types";
import media from "constants/MediaQuery";
import { headingMixin } from "constants/mixins";
import Link from "next/link";
import ArrowOutline from "assets/icons/ArrowOutline.svg";

export const getStaticProps: GetStaticProps = async (context) => {
  const newsId = context.params?.id;
  const [news, newsResponse] = await Promise.all([
    getSingleNewsById(newsId as string),
    getNewsByPageNumber(1),
  ]);

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
  new Date(dateString).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).toUpperCase();

const toSlug = (text: string) =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const SingleArticlePage: React.FC<{
  selectedNews: NewsItem;
  relatedNews: NewsSummary[];
}> = ({ selectedNews, relatedNews }) => {
  const wordCount = selectedNews.newsContent?.split(/\s+/).filter(Boolean).length ?? 0;
  const readTime = Math.max(1, Math.round(wordCount / 200));

  // Extract headings from markdown for TOC
  const headings = (selectedNews.newsContent ?? "")
    .split("\n")
    .filter((line) => /^#{1,3} /.test(line))
    .map((line) => {
      const text = line.replace(/^#+\s*/, "");
      return { text, id: toSlug(text) };
    });

  const [activeId, setActiveId] = useState<string>(headings[0]?.id ?? "");
  const [copied, setCopied] = useState(false);
  const headingRefs = useRef<{ [id: string]: HTMLElement }>({});

  // Active TOC tracking
  useEffect(() => {
    if (headings.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "0px 0px -60% 0px" }
    );
    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [headings.length]);

  const articleUrl =
    typeof window !== "undefined"
      ? window.location.href
      : `https://www.turntablecharts.com/news/${selectedNews.id}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(articleUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://www.turntablecharts.com/news/${selectedNews.id}`)}`;
  const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(`https://www.turntablecharts.com/news/${selectedNews.id}`)}&text=${encodeURIComponent(selectedNews.title)}`;

  // Custom ReactMarkdown renderers — add IDs to headings
  const mdComponents: any = {
    h1: ({ children }: any) => { const id = toSlug(String(children)); return <h1 id={id}>{children}</h1>; },
    h2: ({ children }: any) => { const id = toSlug(String(children)); return <h2 id={id}>{children}</h2>; },
    h3: ({ children }: any) => { const id = toSlug(String(children)); return <h3 id={id}>{children}</h3>; },
  };

  return (
    <ArticleStyling>
      <Head>
        <title>{selectedNews.title} | TurnTable Charts</title>
        <meta name="description" content={selectedNews.description} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@TurntableCharts" />
        <meta property="og:url" content={`https://www.turntablecharts.com/news/${selectedNews.id}`} />
        <meta property="og:title" content={selectedNews.title} />
        <meta property="og:description" content={selectedNews.description} />
        <meta property="og:image" content={selectedNews.headerImageUri} />
      </Head>

      {/* ── Hero image — full bleed, before everything ── */}
      <div className="article_hero">
        <img src={selectedNews.headerImageUri} alt={selectedNews.title} />
      </div>

      {/* ── Article ── */}
      <article className="article_wrapper">
        {/* Meta row */}
        <div className="article_meta">
          <span className="article_meta-left">
            BY <span className="article_meta-brand">TURNTABLE CHARTS</span>
            <span className="article_meta-dot">•</span>
            {readTime} MIN READ
          </span>
          <span className="article_meta-date">{formatDate(selectedNews.dateCreated)}</span>
        </div>

        {/* Mobile-only stacked meta */}
        <div className="article_meta_mobile">
          <span className="article_meta_mobile-brand">BY <span>TURNTABLE CHARTS</span></span>
          <span className="article_meta_mobile-date">{formatDate(selectedNews.dateCreated)}</span>
          <span className="article_meta_mobile-read">{readTime} MIN READ</span>
        </div>

        {/* Headline */}
        <h1 className="article_headline">{selectedNews.title}</h1>

        {/* Two-column layout */}
        <div className="article_layout">
          {/* ── Sidebar ── */}
          <aside className="article_sidebar">
            {headings.length > 0 && (
              <div className="sidebar_section">
                <p className="sidebar_label">ON THIS PAGE</p>
                <nav className="toc_list">
                  {headings.map(({ text, id }) => (
                    <a
                      key={id}
                      href={`#${id}`}
                      className={`toc_item ${activeId === id ? "toc_item--active" : ""}`}
                    >
                      {text}
                    </a>
                  ))}
                </nav>
              </div>
            )}

            <div className="sidebar_section sidebar_share">
              <p className="sidebar_label">SHARE THIS ARTICLE</p>
              <div className="share_buttons">
                {/* Copy link */}
                <button className="share_btn" onClick={handleCopyLink} title={copied ? "Copied!" : "Copy link"}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                  </svg>
                </button>
                {/* LinkedIn */}
                <a className="share_btn" href={linkedInUrl} target="_blank" rel="noopener noreferrer" title="Share on LinkedIn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
                {/* Twitter / X */}
                <a className="share_btn" href={twitterUrl} target="_blank" rel="noopener noreferrer" title="Share on X">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>
              {copied && <span className="copy_feedback">Link copied!</span>}
            </div>
          </aside>

          {/* ── Body ── */}
          <div className="article_body">
            <ReactMarkdown components={mdComponents}>
              {selectedNews.newsContent}
            </ReactMarkdown>

            {/* Share — mobile only, after body */}
            <div className="share_mobile">
              <p className="sidebar_label">SHARE THIS ARTICLE</p>
              <div className="share_buttons">
                <button className="share_btn" onClick={handleCopyLink} title={copied ? "Copied!" : "Copy link"}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                  </svg>
                </button>
                <a className="share_btn" href={linkedInUrl} target="_blank" rel="noopener noreferrer" title="Share on LinkedIn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
                <a className="share_btn" href={twitterUrl} target="_blank" rel="noopener noreferrer" title="Share on X">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>
              {copied && <span className="copy_feedback">Link copied!</span>}
            </div>
          </div>
        </div>
      </article>

      {/* ── Latest articles ── */}
      {relatedNews.length > 0 && (
        <section className="latest_articles">
          <div className="latest_articles-header">
            <h2 className="latest_articles-title">LATEST ARTICLES</h2>
            <Link href="/news">
              <a className="latest_articles-arrow" title="View all news">
                <ArrowOutline />
              </a>
            </Link>
          </div>
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

/* ─── Styles ─────────────────────────────────────────────────── */
const ArticleStyling = styled.main`
  width: 100%;
  background-color: white;
  padding-top: 80px;
  padding-bottom: 120px;

  /* ── Hero image — same width as article content ── */
  .article_hero {
    width: 80vw;
    margin: 0 auto;
    overflow: hidden;
    background-color: white;

    img {
      width: 100%;
      height: 630px;
      object-fit: contain;
      display: block;
    }

    ${media.smallDesktop` width: 88vw; `}
    ${media.tablet` width: 92vw; img { height: 420px; } `}
    ${media.mobileLarge`
      width: 100%;
      padding: 0 20px;
      box-sizing: border-box;
      img { height: 290px; }
    `}
  }

  /* ── Article wrapper ── */
  .article_wrapper {
    width: 80vw;
    margin: 0 auto;
    padding: 40px 0 64px;

    ${media.smallDesktop` width: 88vw; `}
    ${media.tablet` width: 92vw; `}
    ${media.mobileLarge` width: 100%; padding: 24px 20px 48px; `}
  }

  /* ── Meta row — desktop ── */
  .article_meta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    flex-wrap: wrap;
    gap: 8px;

    ${media.mobileLarge` display: none; `}
  }

  .article_meta-left,
  .article_meta-date {
    font-family: "Work Sans", sans-serif;
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: #8e8e8e;
  }

  .article_meta-brand {
    color: #F1A01F;
    font-weight: 700;
  }

  .article_meta-dot {
    margin: 0 6px;
    color: #8e8e8e;
  }

  /* ── Meta — mobile stacked ── */
  .article_meta_mobile {
    display: none;

    ${media.mobileLarge`
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-bottom: 20px;
    `}
  }

  .article_meta_mobile-brand {
    font-family: "Work Sans", sans-serif;
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: #111;

    span { color: #F1A01F; font-weight: 700; }
  }

  .article_meta_mobile-date,
  .article_meta_mobile-read {
    font-family: "Work Sans", sans-serif;
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: #111;
  }

  /* ── Headline ── */
  .article_headline {
    font-family: 'Host Grotesk', sans-serif;
    font-size: clamp(1.8rem, 3.5vw, 3rem);
    font-weight: 800;
    line-height: 1.1;
    color: #000;
    margin: 0 0 40px;
    letter-spacing: -0.02em;

    ${media.mobileLarge` margin: 0 0 16px; `}
  }

  /* ── Two-column layout ── */
  .article_layout {
    display: grid;
    grid-template-columns: 200px 1fr;
    gap: 64px;
    align-items: start;

    ${media.tablet`
      grid-template-columns: 1fr;
      gap: 32px;
    `}

    ${media.mobileLarge` gap: 0; `}
  }

  /* ── Sidebar ── */
  .article_sidebar {
    position: sticky;
    top: 100px;
    display: flex;
    flex-direction: column;
    gap: 36px;

    ${media.tablet`
      position: static;
      flex-direction: row;
      flex-wrap: wrap;
      gap: 24px;
      padding-bottom: 24px;
      border-bottom: 1px solid #eee;
    `}

    ${media.mobileLarge`
      padding-bottom: 0;
      border-bottom: none;
      gap: 0;
    `}
  }

  .sidebar_section {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .sidebar_label {
    font-family: "Work Sans", sans-serif;
    font-size: 0.65rem;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #aaa;
    margin: 0;
  }

  /* TOC */
  .toc_list {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .toc_item {
    font-family: "Work Sans", sans-serif;
    font-size: 0.82rem;
    font-weight: 500;
    color: #555;
    text-decoration: none;
    line-height: 1.5;
    padding: 3px 0;
    transition: color 0.2s ease;
    border-left: 2px solid transparent;
    padding-left: 8px;

    &:hover { color: #111; }

    &.toc_item--active {
      color: #F1A01F;
      border-left-color: #F1A01F;
    }
  }

  /* Share buttons */
  .share_buttons {
    display: flex;
    gap: 8px;
    align-items: center;
  }

  .share_btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 1px solid #ddd;
    background: white;
    color: #333;
    cursor: pointer;
    text-decoration: none;
    transition: border-color 0.2s ease, color 0.2s ease, background 0.2s ease;

    &:hover {
      border-color: #111;
      color: #111;
      background: #f5f5f5;
    }

    svg { display: block; flex-shrink: 0; }
  }

  /* Hide sidebar share on mobile */
  .sidebar_share {
    ${media.mobileLarge` display: none; `}
  }

  /* Mobile-only share block — after body */
  .share_mobile {
    display: none;

    ${media.mobileLarge`
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-top: 40px;
    `}

    .share_btn {
      color: #333;
      border-color: #ddd;
    }
  }

  .copy_feedback {
    font-family: "Work Sans", sans-serif;
    font-size: 0.7rem;
    color: #0F8F49;
    font-weight: 600;
    margin-top: 4px;
  }

  /* ── Body copy ── */
  .article_body {
    font-family: "Work Sans", sans-serif;
    font-size: 1rem;
    line-height: 1.85;
    color: #222;
    min-width: 0;

    p { margin-bottom: 1.5em; }

    h1, h2, h3 {
      font-family: 'Host Grotesk', sans-serif;
      font-weight: 700;
      margin: 2em 0 0.6em;
      color: #000;
      scroll-margin-top: 100px;
    }

    h1 { font-size: 1.9rem; }
    h2 { font-size: 1.5rem; }
    h3 { font-size: 1.2rem; }

    blockquote {
      border-left: 3px solid #F1A01F;
      margin-left: 0;
      padding: 8px 24px;
      font-style: italic;
      color: #555;
      background: #fafafa;
    }

    img {
      width: 100%;
      margin: 32px 0;
      display: block;
      border-radius: 2px;
    }

    a {
      color: #F1A01F;
      text-decoration: underline;
    }

    strong { font-weight: 700; }
  }

  /* ── Latest articles ── */
  .latest_articles {
    width: 80vw;
    margin: 0 auto;
    border-top: 1px solid #e0e0e0;
    padding-top: 40px;

    ${media.smallDesktop` width: 88vw; `}
    ${media.tablet` width: 92vw; `}
    ${media.mobileLarge` width: 100%; padding: 24px 20px 48px; `}
  }

  .latest_articles-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 32px;
  }

  .latest_articles-title {
    ${headingMixin}
   
    font-weight: 700;
    color: #000;
    text-align: left;
    margin: 0;
    font-size: clamp(1.5rem, 3vw, 2.5rem);
  }

  .latest_articles-arrow {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    flex-shrink: 0;
    text-decoration: none;
    transition: transform 0.3s ease;

    svg {
      width: 100%;
      height: 100%;
      rect { stroke: #111; }
      path { stroke: #111; }
    }

    &:hover { transform: translateX(4px); }
  }

  .latest_articles-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;

    ${media.tablet` grid-template-columns: repeat(2, 1fr); `}
    ${media.mobileLarge` grid-template-columns: repeat(2, 1fr); gap: 16px; `}
  }

  .latest_card {
    overflow: hidden;

    &:nth-child(4) {
      display: none;
      ${media.tablet` display: block; `}
    }

    ${media.mobileLarge`
      .compact .news_card-img { height: 160px; }
    `}

    .news_card-title h3 { color: black !important; }
    .news_card-date p { color: rgba(0, 0, 0, 0.5) !important; }
  }
`;
