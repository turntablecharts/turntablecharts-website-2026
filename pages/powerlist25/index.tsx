/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Head from 'next/head';
import { useQuery } from 'react-query';
import ReactMarkdown from 'react-markdown';
import media from 'constants/MediaQuery';
import { getPowerlist, getPowerlistByCategory } from '../../utility/PowerlistApi/api';
import { PowerlistCategory, PowerlistEntry } from '../../utility/PowerlistApi/types';

const GOLD = '#C5B57A';
const GOLD_DIM = 'rgba(197,181,122,0.15)';

const Power100: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Base call (no categoryId) returns all entries with correct unique ranks + categories
  const { data: baseData, isLoading: baseLoading, isError: baseError } = useQuery(
    'powerlist-base',
    getPowerlist,
    { staleTime: 1000 * 60 * 60 }
  );

  const categories: PowerlistCategory[] = (baseData?.data as any)?.categories ?? [];
  const allEntries: PowerlistEntry[] = (baseData?.data as any)?.recognitions ?? [];

  // Only fetch by category when one is actively selected
  const { data: catData, isLoading: catLoading, isError: catError } = useQuery(
    ['powerlist-category', activeCategory],
    () => getPowerlistByCategory(activeCategory!),
    { staleTime: 1000 * 60 * 60, enabled: activeCategory !== null }
  );

  const isLoading = baseLoading || (activeCategory !== null && catLoading);
  const isError = baseError || (activeCategory !== null && catError);

  const entries: PowerlistEntry[] = activeCategory
    ? (catData?.data as any)?.recognitions ?? []
    : allEntries;

  const handleCategory = (id: number | null) => {
    setActiveCategory(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const categoryNav = (
    <nav className="cat_nav">
      <button
        className={`cat_item ${activeCategory === null ? 'active' : ''}`}
        onClick={() => handleCategory(null)}
      >
        ALL
      </button>
      {categories.map((cat) => (
        <button
          key={cat.id}
          className={`cat_item ${activeCategory === cat.id ? 'active' : ''}`}
          onClick={() => handleCategory(cat.id)}
        >
          {cat.name}
        </button>
      ))}
    </nav>
  );

  return (
    <>
      <Head>
        <title>Power List 2025 | TurnTable Charts</title>
        <meta name="description" content="TurnTable Power List 2025 — The most influential figures in Nigerian music." />
      </Head>

      <PageWrap>
        {/* ── Mobile top bar ── */}
        <MobileBar>
          <button
            className="mob_hamburger"
            onClick={() => setMobileMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
          </button>
          <span className="mob_title">TURNTABLE POWERLIST</span>
        </MobileBar>

        {/* ── Mobile category drawer ── */}
        <MobileDrawer className={mobileMenuOpen ? 'open' : ''}>
          <div className="drawer_panel">
            {categoryNav}
          </div>
          <button className="drawer_close" onClick={() => setMobileMenuOpen(false)} aria-label="Close">✕</button>
        </MobileDrawer>
        {mobileMenuOpen && <DrawerOverlay onClick={() => setMobileMenuOpen(false)} />}

        {/* ── Desktop sidebar ── */}
        <Sidebar>
          <div className="sidebar_logo">
            <img src="/assets/powerlist-logo.png" alt="Power List 2025" className="sidebar_hero_img" />
          </div>
          {categoryNav}
        </Sidebar>

        {/* ── Main content ── */}
        <Main>
          {/* Hero — shown only when no category is selected */}
          {!activeCategory && (
            <div className="hero">
              <div className="hero_ttc_logo">
                <img src="/assets/ttc-logo.png" alt="TurnTable Charts" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
              </div>
              <div className="hero_image">
                <img src="/assets/powerlist-logo.png" alt="Power List 2025" />
              </div>
              <div className="hero_intro">
                <p>
                  The concert industry is still growing. The streaming business continues to boom. But as investors pour
                  billions into artificial intelligence, rights holders are seizing a historic opportunity to drive the
                  value of music to new heights. The ranking of this year&apos;s top 40 reflects the force these leaders are
                  showing as they forge strategic partnerships with new technology juggernauts to revolutionize the way
                  fans interact with the artists and songs they love.
                </p>
                <p>
                  With great power, of course, comes great responsibility — and the stakes are high. Here&apos;s to the
                  success of this year&apos;s honorees as they work to safeguard creators&apos; rights and shepherd music into a
                  fruitful new era.
                </p>
              </div>
            </div>
          )}

          {/* Category heading — shown when a category is active */}
          {activeCategory && (
            <div className="cat_heading">
              <h2 className="cat_heading_text">
                {categories.find((c) => c.id === activeCategory)?.name ?? ''}
              </h2>
            </div>
          )}

          {/* Entries */}
          <div className="entries">
            {isLoading && (
              <div className="entries_state">Loading…</div>
            )}
            {isError && (
              <div className="entries_state">Failed to load entries. Please try again.</div>
            )}
            {!isLoading && !isError && entries.length === 0 && (
              <div className="entries_state">No entries found.</div>
            )}
            {entries.map((entry) => (
              <div key={entry.id} className="entry">
                <div className="entry_photo">
                  <img
                    src={entry.imageUrl}
                    alt={entry.name}
                    onError={(e) => { (e.target as HTMLImageElement).src = '/assets/ttcBgWhite.png'; }}
                  />
                </div>
                <div className="entry_info">
                  <span className="entry_rank">{String(entry.rank).padStart(2, '0')}</span>
                  <div className="entry_divider" />
                  <span className="entry_name">{entry.name}</span>
                  <span className="entry_title">{entry.office}</span>
                  {entry.powerlistCategoryId && (
                    <span className="entry_tag">
                      {categories.find((c) => c.id === entry.powerlistCategoryId)?.name?.toUpperCase() ?? ''}
                    </span>
                  )}
                </div>
                {entry.remarks && (
                  <div className="entry_bio">
                    <ReactMarkdown>{entry.remarks}</ReactMarkdown>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Main>
      </PageWrap>
    </>
  );
};

export default Power100;

/* ─────────────────────── Styles ─────────────────────── */

const SIDEBAR_W = '300px';

const PageWrap = styled.div`
  display: flex;
  min-height: 100vh;
  background-image: url('/assets/powerBG.png');
  background-size: cover;
  background-position: center top;
  background-attachment: fixed;
  color: #fff;
  padding-top: 70px;

  ${media.mobileLarge`
    flex-direction: column;
    padding-top: 70px;
  `}
`;

/* ── Mobile top bar ── */
const MobileBar = styled.div`
  display: none;

  ${media.mobileLarge`
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 14px 20px;
    background: #0a0a0a;
    border-bottom: 1px solid rgba(255,255,255,0.08);
    position: sticky;
    top: 70px;
    z-index: 200;
  `}

  .mob_hamburger {
    all: unset;
    cursor: pointer;
    display: flex !important;
    flex-direction: column;
    justify-content: center;
    gap: 6px;
    width: 28px;
    height: 28px;

    span {
      display: block !important;
      width: 22px;
      height: 2px;
      background: #fff;
      border-radius: 2px;
      flex-shrink: 0;
    }
  }

  .mob_title {
    font-family: 'Anton', sans-serif;
    font-size: 1.1rem;
    letter-spacing: 0.06em;
    color: #fff;
    text-transform: uppercase;
  }
`;

/* ── Mobile drawer ── */
const MobileDrawer = styled.div`
  display: none;

  ${media.mobileLarge`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 500;
    pointer-events: none;
    transform: translateX(-100%);
    transition: transform 0.3s ease;

    &.open {
      transform: translateX(0);
      pointer-events: all;
    }
  `}

  .drawer_panel {
    width: 82vw;
    max-width: 340px;
    height: 100vh;
    background: #000;
    overflow-y: auto;
    padding: 80px 28px 40px;
    flex-shrink: 0;
  }

  .drawer_close {
    all: unset;
    cursor: pointer;
    margin-top: 90px;
    margin-left: 12px;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: #222;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    color: #fff;
    flex-shrink: 0;
  }

  .cat_nav {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .cat_item {
    all: unset;
    cursor: pointer;
    font-family: 'Anton', sans-serif;
    font-size: 1.15rem;
    letter-spacing: 0.03em;
    text-transform: uppercase;
    color: #fff;
    padding: 16px 0;
    border-bottom: 1px solid rgba(255,255,255,0.07);
    transition: color 0.2s ease;
    display: block;

    &:last-child { border-bottom: none; }
    &:hover { color: ${GOLD}; }
    &.active { color: ${GOLD}; }
  }
`;

const DrawerOverlay = styled.div`
  display: none;
  ${media.mobileLarge`
    display: block;
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.6);
    z-index: 499;
  `}
`;

/* ── Mobile-only horizontal category strip ── */
const MobileCategoryStrip = styled.div`
  display: none;

  ${media.mobileLarge`
    display: flex;
    align-items: center;
    overflow-x: auto;
    scrollbar-width: none;
    &::-webkit-scrollbar { display: none; }
    border-bottom: 1px solid rgba(255,255,255,0.08);
    background: #0f0f0f;
    padding: 0 16px;
    position: sticky;
    top: 0;
    z-index: 100;
  `}

  .mcat_item {
    all: unset;
    cursor: pointer;
    font-family: 'Anton', sans-serif;
    font-size: 0.72rem;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.5);
    padding: 13px 14px;
    white-space: nowrap;
    flex-shrink: 0;
    position: relative;
    transition: color 0.2s ease;

    &:hover { color: #fff; }

    &.active {
      color: ${GOLD};

      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 2px;
        background: ${GOLD};
        border-radius: 2px 2px 0 0;
      }
    }
  }
`;

/* ── Desktop sidebar ── */
const Sidebar = styled.aside`
  width: ${SIDEBAR_W};
  flex-shrink: 0;
  position: sticky;
  top: 70px;
  align-self: flex-start;
  height: calc(100vh - 70px);
  overflow-y: auto;
  padding: 40px 32px;
  border-right: 1px solid rgba(255,255,255,0.15);
  background: transparent;
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }

  ${media.mobileLarge`
    display: none;
  `}

  .sidebar_logo {
    margin-bottom: 32px;
  }

  .sidebar_hero_img {
    width: 100%;
    height: auto;
    display: block;
  }

  /* shared nav styles */
  .cat_nav {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .cat_item {
    all: unset;
    cursor: pointer;
    font-family: 'Anton', sans-serif;
    font-size: 0.82rem;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: #fff;
    padding: 11px 0;
    border-bottom: 1px solid rgba(255,255,255,0.05);
    transition: color 0.2s ease;

    &:last-child { border-bottom: none; }

    &:hover { color: ${GOLD}; }

    &.active {
      color: ${GOLD};
    }
  }
`;

/* ── Main content ── */
const Main = styled.main`
  flex: 1;
  min-height: 100vh;

  ${media.mobileLarge`
    margin-left: 0;
  `}

  /* ── Hero ── */
  .hero {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 60px 80px 80px;
    background: transparent;
    border-bottom: 1px solid rgba(255,255,255,0.06);

    ${media.tablet`
      padding: 50px 40px 60px;
    `}

    ${media.mobileLarge`
      padding: 40px 20px 50px;
    `}
  }

  .hero_ttc_logo {
    margin-bottom: 20px;
    img {
      height: 36px;
      width: auto;
      display: block;
      margin: 0 auto;
    }
  }

  .hero_image {
    width: 100%;
    max-width: 780px;
    margin: 0 auto 48px;
    img {
      width: 100%;
      height: auto;
      display: block;
    }

    ${media.mobileLarge`
      max-width: 100%;
      margin-bottom: 32px;
    `}
  }

  .hero_intro {
    max-width: 680px;
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 20px;

    p {
      font-family: 'Work Sans', sans-serif;
      font-size: 1rem;
      line-height: 1.75;
      color: rgba(255,255,255,0.7);
      margin: 0;

      ${media.mobileLarge`
        font-size: 0.9rem;
      `}
    }
  }

  /* ── Category heading (replaces hero when a category is active) ── */
  .cat_heading {
    padding: 60px 80px 20px;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 2px;
      background: white;
    }

    ${media.tablet` padding: 40px 40px 28px; `}
    ${media.mobileLarge` padding: 28px 20px 20px; `}
  }

  .cat_heading_text {
    font-family: 'Anton', sans-serif;
    font-size: clamp(2.5rem, 5vw, 4.5rem);
    font-weight: 400;
    color: white;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    margin: 0;
  }

  /* ── Entry cards ── */
  .entries {
    display: flex;
    flex-direction: column;
    margin-top: 20px;
  }

  .entries_state {
    padding: 80px 40px;
    text-align: center;
    font-family: 'Work Sans', sans-serif;
    font-size: 0.9rem;
    color: rgba(255,255,255,0.4);
    letter-spacing: 0.05em;
  }

  .entry {
    display: grid;
    grid-template-columns: 530px 1fr;
    margin-bottom: 12px;

    ${media.tablet`
      grid-template-columns: 1fr 1fr;
    `}

    ${media.mobileLarge`
      grid-template-columns: 1fr;
      margin-bottom: 8px;
    `}
  }

  .entry_photo {
    width: 530px;
    height: 730px;
    flex-shrink: 0;
    overflow: hidden;
    margin-left: 52px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: top center;
      display: block;
    }

    ${media.tablet`
      width: 100%;
      height: 480px;
      margin-left: 0;
    `}

    ${media.mobileLarge`
      width: 100%;
      height: 360px;
      margin-left: 0;
    `}
  }

  .entry_info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 48px 52px 48px 52px;
    margin-left: 52px;
    background: transparent;

    ${media.tablet`
      padding: 32px 28px;
      margin-left: 0;
    `}

    ${media.mobileLarge`
      padding: 28px 20px 36px;
      margin-left: 0;
    `}
  }

  .entry_rank {
    font-family: 'Nohemi', sans-serif;
    font-size: clamp(4rem, 8vw, 8rem);
    font-weight: 900;
    color: ${GOLD};
    line-height: 1;
    letter-spacing: -3px;

    ${media.mobileLarge`
      font-size: 5rem;
    `}
  }

  .entry_divider {
    width: 80px;
    height: 3px;
    background: ${GOLD};
    margin: 16px 0 20px;
    opacity: 0.8;
  }

  .entry_name {
    font-family: 'Nohemi', sans-serif;
    font-size: clamp(1.4rem, 2.5vw, 2rem);
    font-weight: 800;
    color: ${GOLD};
    line-height: 1.15;
    margin-bottom: 6px;
  }

  .entry_title {
    font-family: 'Work Sans', sans-serif;
    font-size: 0.95rem;
    color: rgba(255,255,255,0.5);
    margin-bottom: 20px;
  }

  .entry_tag {
    display: inline-block;
    padding: 6px 16px;
    border: 1px solid ${GOLD};
    border-radius: 100px;
    font-family: 'Work Sans', sans-serif;
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    color: ${GOLD};
    align-self: flex-start;
  }

  .entry_bio {
    grid-column: 1 / -1;
    font-family: 'Work Sans', sans-serif;
    font-size: 0.88rem;
    line-height: 1.85;
    color: rgba(255,255,255,0.65);
    margin: 0;
    padding: 28px 52px 40px;

    p { margin-bottom: 1.2em; &:last-child { margin-bottom: 0; } }

    h1, h2, h3 {
      font-family: 'Nohemi', sans-serif;
      font-weight: 700;
      color: #fff;
      margin: 1.6em 0 0.5em;
    }
    h1 { font-size: 1.5rem; }
    h2 { font-size: 1.2rem; }
    h3 { font-size: 1rem; }

    strong { font-weight: 700; color: rgba(255,255,255,0.9); }
    em { font-style: italic; color: rgba(255,255,255,0.75); }

    blockquote {
      border-left: 3px solid ${GOLD};
      margin-left: 0;
      padding: 6px 20px;
      font-style: italic;
      color: rgba(255,255,255,0.5);
    }

    a { color: ${GOLD}; text-decoration: underline; }

    ul, ol { padding-left: 1.4em; margin-bottom: 1.2em; }
    li { margin-bottom: 0.4em; }

    ${media.tablet`
      padding: 24px 28px 36px;
    `}

    ${media.mobileLarge`
      padding: 16px 20px 28px;
      font-size: 0.82rem;
    `}
  }

  /* ── Shared cat_nav styles for mobile drawer ── */
  .cat_nav {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .cat_item {
    all: unset;
    cursor: pointer;
    font-family: 'Nohemi', sans-serif;
    font-size: 0.85rem;
    font-weight: 700;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.55);
    padding: 13px 0;
    border-bottom: 1px solid rgba(255,255,255,0.07);
    transition: color 0.2s ease;

    &:last-child { border-bottom: none; }
    &:hover { color: #fff; }
    &.active { color: ${GOLD}; }
  }
`;
