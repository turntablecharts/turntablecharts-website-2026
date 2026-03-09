/* eslint-disable @next/next/no-img-element */
import { headingMixin } from "constants/mixins";
import media from "constants/MediaQuery";
import Head from "next/head";
import Link from "next/link";
import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { getAllMagazineEditions } from "utility/MagazinesApi/api";
import { MagazineEditions } from "utility/MagazinesApi/types";
import ListViewIcon from "assets/icons/list.svg";

export async function getStaticProps() {
  const magazineResponse = await getAllMagazineEditions();
  return {
    props: { magazineEditions: magazineResponse.data },
    revalidate: 3600,
  };
}

type ViewMode = "list" | "shelf";

/* Extract a readable date label from an edition name string.
   Examples:
     INDUSTRY_DIGEST_FEB_MARCH_2023  →  Feb – Mar 2023
     TURNTABLE_JUNE_2025             →  June 2025
     POWER_LIST_2024                 →  2024
*/
const MONTH_MAP: Record<string, string> = {
  JAN: "Jan", JANUARY: "January",
  FEB: "Feb", FEBRUARY: "February",
  MAR: "Mar", MARCH: "March",
  APR: "Apr", APRIL: "April",
  MAY: "May",
  JUN: "Jun", JUNE: "June",
  JUL: "Jul", JULY: "July",
  AUG: "Aug", AUGUST: "August",
  SEP: "Sep", SEPTEMBER: "September",
  OCT: "Oct", OCTOBER: "October",
  NOV: "Nov", NOVEMBER: "November",
  DEC: "Dec", DECEMBER: "December",
};

function formatEditionDate(name: string): string {
  const parts = name.toUpperCase().split("_");
  const months: string[] = [];
  let year = "";

  for (const part of parts) {
    if (MONTH_MAP[part]) months.push(MONTH_MAP[part]);
    if (/^\d{4}$/.test(part)) year = part;
  }

  if (months.length === 0 && !year) {
    // Fallback: humanise the raw name
    return name.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  }

  const monthStr = months.length > 1
    ? `${months[0]} – ${months[months.length - 1]}`
    : months[0] ?? "";

  return [monthStr, year].filter(Boolean).join(" ");
}

const Magazine: React.FC<{ magazineEditions: MagazineEditions[] }> = ({
  magazineEditions,
}) => {
  const [mode, setMode] = useState<ViewMode>("list");
  const editions = [...magazineEditions].sort((a, b) => b.id - a.id);

  return (
    <MagazineStyling>
      <Head>
        <title>TurnTable Charts | Magazine Editions</title>
        <meta
          name="description"
          content="TurnTable Charts - Magazine Editions"
        />
      </Head>

      {/* ── Header ── */}
      <div className="page_header">
        <h1 className="page_title">Magazine Editions</h1>
        <p className="page_subtitle">
          We will make your business so irresistible, its success is inevitable.
        </p>

        {/* Toggle pill */}
        <div className="toggle_pill" role="group" aria-label="View mode">
          <button
            id="toggle-list"
            className={`toggle_btn ${mode === "list" ? "active" : ""}`}
            onClick={() => setMode("list")}
          >
            <ListViewIcon className="toggle_icon" aria-hidden="true" />
            List
          </button>
          <button
            id="toggle-shelf"
            className={`toggle_btn ${mode === "shelf" ? "active" : ""}`}
            onClick={() => setMode("shelf")}
          >
            {/* shelf/grid icon */}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="3" y="3" width="7" height="7" rx="1" fill="currentColor" />
              <rect x="14" y="3" width="7" height="7" rx="1" fill="currentColor" />
              <rect x="3" y="14" width="7" height="7" rx="1" fill="currentColor" />
              <rect x="14" y="14" width="7" height="7" rx="1" fill="currentColor" />
            </svg>
            Shelf
          </button>
        </div>
      </div>

      <hr className="section_divider" />

      {/* ── List mode ── */}
      {mode === "list" && (
        <div className="list_view">
          {editions.map((edition) => (
            <div key={edition.id} className="list_row">
              {/* Date — left */}
              <span className="list_date">
                {formatEditionDate(edition.name)}
              </span>

              {/* Cover — center */}
              <div className="list_cover">
                <img src={edition.coverImageUrl} alt={edition.name} />
              </div>

              {/* Content — right */}
              <div className="list_content">
                <h2 className="list_title">{edition.name}</h2>
                <p className="list_desc">
                  Discover the stories shaping the music industry — curated
                  exclusively by TurnTable Charts.
                </p>
                <Link href={`/magazine/${edition.name}`}>
                  <a className="list_cta">Read Magazine</a>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Shelf mode ── */}
      {mode === "shelf" && (
        <div className="shelf_view">
          {editions.map((edition) => (
            <Link key={edition.id} href={`/magazine/${edition.name}`}>
              <a className="shelf_card">
                <div className="shelf_cover">
                  <img src={edition.coverImageUrl} alt={edition.name} />
                  {/* Hover overlay */}
                  <div className="shelf_overlay">
                    <span className="shelf_overlay-btn">Read Magazine</span>
                  </div>
                </div>
                <p className="shelf_title">{edition.name}</p>
              </a>
            </Link>
          ))}
        </div>
      )}
    </MagazineStyling>
  );
};

export default Magazine;

/* ─── Animations ─────────────────────────────────────────────── */
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
`;

/* ─── Styles ──────────────────────────────────────────────────── */
const MagazineStyling = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #0d0d0d;
  padding-top: 80px;
  padding-bottom: 120px;
  color: white;

  /* ── Header ── */
  .page_header {
    width: 80vw;
    margin: 0 auto;
    padding: 60px 0 40px;
    text-align: center;

    ${media.smallDesktop` width: 88vw; `}
    ${media.tablet` width: 92vw; `}
    ${media.mobileLarge` width: 100%; padding: 40px 20px 32px; `}
  }

  .page_title {
    ${headingMixin}
    color: white;
    margin-bottom: 16px;
  }

  .page_subtitle {
    font-family: "Work Sans", sans-serif;
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.6);
    margin-bottom: 32px;
  }

  /* ── Toggle pill ── */
  .toggle_pill {
    display: inline-flex;
    border: 1px solid rgba(255, 255, 255, 0.25);
    border-radius: 999px;
    padding: 4px;
    gap: 2px;
  }

  .toggle_btn {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 8px 20px;
    border-radius: 999px;
    border: none;
    background: transparent;
    color: rgba(255, 255, 255, 0.55);
    font-family: "Work Sans", sans-serif;
    font-size: 0.85rem;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.2s ease, color 0.2s ease;

    .toggle_icon {
      width: 16px;
      height: 16px;
      flex-shrink: 0;
    }

    &.active {
      background: white;
      color: #0d0d0d;
    }

    &:not(.active):hover {
      color: white;
    }
  }

  /* ── Divider ── */
  .section_divider {
    border: none;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    width: 80vw;
    margin: 0 auto 48px;

    ${media.smallDesktop` width: 88vw; `}
    ${media.tablet` width: 92vw; `}
    ${media.mobileLarge` width: calc(100% - 40px); `}
  }

  /* ════════════════════════════════════════
     LIST MODE
  ════════════════════════════════════════ */
  .list_view {
    width: 80vw;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 0;
    animation: ${fadeIn} 0.35s ease both;

    ${media.smallDesktop` width: 88vw; `}
    ${media.tablet` width: 92vw; `}
    ${media.mobileLarge` width: 100%; padding: 0 20px; `}
  }

  .list_row {
    display: grid;
    grid-template-columns: 140px 400px 1fr;
    align-items: start; /* top-align all columns */
    gap: 40px;
    padding: 40px 0;

    ${media.tablet`
      grid-template-columns: 220px 1fr;
      gap: 28px;
    `}
    ${media.mobileLarge`
      grid-template-columns: 1fr;
      gap: 16px;
      padding: 32px 0;
    `}
  }

  /* Date label — fixed-width column, text wraps */
  .list_date {
    font-family: "Work Sans", sans-serif;
    font-size: 0.75rem;
    font-weight: 600;
    color: #ffffff;
    text-transform: uppercase;
    letter-spacing: 1px;
    line-height: 1.6;
    word-break: break-word;
    overflow-wrap: break-word;
    width: 140px;

    /* Hidden on tablet (2-col), visible on desktop and mobile */
    ${media.tablet` display: none; `}
    ${media.mobileLarge` display: block; width: 100%; `}
  }

  /* Cover image — list mode */
  .list_cover {
    width: 400px;
    height: 500px;
    overflow: hidden;
    flex-shrink: 0;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: top;
      display: block;
    }

    ${media.tablet`
      width: 220px;
      height: 300px;
    `}
    ${media.mobileLarge`
      width: 100%;
      height: auto;
      aspect-ratio: 3 / 4;
    `}
  }

  /* Text content — right, full height with button at bottom */
  .list_content {
    display: flex;
    flex-direction: column;
    height: 500px;
    padding: 4px 0;

    ${media.tablet`
      height: 300px;
    `}
    ${media.mobileLarge`
      height: auto;
      gap: 12px;
    `}
  }

  .list_title {
    font-family: "Anton", sans-serif;
    font-size: clamp(1.4rem, 2.5vw, 2.2rem);
    font-weight: 400;
    color: white;
    text-transform: uppercase;
    line-height: 1.1;
    margin: 0;

    ${media.mobileLarge`
      font-size: 1.8rem;
    `}
  }

  .list_desc {
    font-family: "Work Sans", sans-serif;
    font-size: 0.95rem;
    line-height: 1.65;
    color: rgba(255, 255, 255, 0.65);
    max-width: 480px;
    margin: 12px 0 0;
  }

  /* CTA button — pushed to bottom of content column */
  .list_cta {
    display: inline-block;
    margin-top: auto; /* push to bottom */
    padding: 14px 32px;
    border-radius: 999px;
    border: 2px solid #f1a01f;
    background: transparent;
    color: white;
    font-family: "Work Sans", sans-serif;
    font-size: 0.9rem;
    font-weight: 600;
    text-decoration: none;
    text-align: center;
    transition: background 0.25s ease, color 0.25s ease;
    width: fit-content;

    &:hover {
      background: #f1a01f;
      color: #0d0d0d;
    }

    ${media.mobileLarge`
      width: 100%;
      display: block;
      margin-top: 8px;
    `}
  }

  /* ════════════════════════════════════════
     SHELF MODE
  ════════════════════════════════════════ */
  .shelf_view {
    width: 80vw;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
    animation: ${fadeIn} 0.35s ease both;

    ${media.smallDesktop` width: 88vw; `}
    ${media.tablet`
      width: 92vw;
      grid-template-columns: repeat(2, 1fr);
    `}
    ${media.mobileLarge`
      width: 100%;
      padding: 0 20px;
      grid-template-columns: 1fr;
      gap: 32px;
    `}
  }

  .shelf_card {
    display: flex;
    flex-direction: column;
    gap: 12px;
    text-decoration: none;
    cursor: pointer;
    padding-bottom: 16px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.12);
    transition: border-color 0.25s ease;

    &:hover {
      border-bottom-color: transparent;
    }
  }

  .shelf_cover {
    position: relative;
    width: 100%;
    height: 400px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: top;
      display: block;
      transition: transform 0.5s ease, opacity 0.4s ease;
    }

    ${media.mobileLarge`
      height: 260px;
    `}
  }

  /* Hover overlay */
  .shelf_overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.55);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .shelf_overlay-btn {
    padding: 12px 28px;
    border-radius: 999px;
    border: 2px solid #f1a01f;
    color: white;
    font-family: "Work Sans", sans-serif;
    font-size: 0.85rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .shelf_card:hover {
    .shelf_cover img {
      transform: scale(1.04);
      opacity: 0.85;
    }
    .shelf_overlay {
      opacity: 1;
    }
  }

  .shelf_title {
    font-family: "Work Sans", sans-serif;
    font-size: 0.9rem;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.85);
    line-height: 1.4;
    margin: 0;
  }
`;
