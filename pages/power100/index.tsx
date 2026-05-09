/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Head from 'next/head';
import { useQuery } from 'react-query';
import media from 'constants/MediaQuery';
import { getPowerlistCategories, getPowerlist } from 'utility/PowerlistApi/api';
import { PowerlistCategory, PowerlistEntry } from 'utility/PowerlistApi/types';

const GOLD = '#C9A84C';
const GOLD_DIM = 'rgba(201,168,76,0.15)';

const Power100: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { data: catData } = useQuery('powerlist-categories', getPowerlistCategories, {
    staleTime: 1000 * 60 * 60,
  });
  const { data: listData } = useQuery('powerlist-entries', getPowerlist, {
    staleTime: 1000 * 60 * 60,
  });

  const raw = listData?.data;
  const rawCat = catData?.data;

  const categories: PowerlistCategory[] = Array.isArray(rawCat)
    ? rawCat
    : Array.isArray(rawCat?.data)
    ? (rawCat as any).data
    : [];

  const allEntries: PowerlistEntry[] = Array.isArray(raw)
    ? raw
    : Array.isArray(raw?.data)
    ? (raw as any).data
    : [];

  const entries: PowerlistEntry[] = activeCategory
    ? allEntries.filter((e) => e.category === categories.find((c) => c.id === activeCategory)?.name)
    : allEntries;

  const handleCategory = (id: number | null) => {
    setActiveCategory(id);
    setMobileMenuOpen(false);
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
          <span className="mob_title">
            {activeCategory ? categories.find((c) => c.id === activeCategory)?.name ?? 'TURNTABLE POWERLIST' : 'TURNTABLE POWERLIST'}
          </span>
        </MobileBar>

        {/* ── Mobile category drawer ── */}
        <MobileDrawer className={mobileMenuOpen ? 'open' : ''}>
          <button className="drawer_close" onClick={() => setMobileMenuOpen(false)} aria-label="Close">✕</button>
          {categoryNav}
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
          {/* Hero */}
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

          {/* Entries */}
          <div className="entries">
            {entries.map((entry) => (
              <div key={entry.id} className="entry">
                <div className="entry_photo">
                  <img
                    src={entry.imageUri}
                    alt={entry.name}
                    onError={(e) => { (e.target as HTMLImageElement).src = '/assets/images/placeholder.png'; }}
                  />
                </div>
                <div className="entry_info">
                  <span className="entry_rank">{String(entry.rank).padStart(2, '0')}</span>
                  <div className="entry_divider" />
                  <span className="entry_name">{entry.name}</span>
                  <span className="entry_title">{entry.title}{entry.company ? `, ${entry.company}` : ''}</span>
                  {entry.category && (
                    <span className="entry_tag">{entry.category.toUpperCase()}</span>
                  )}
                  {entry.bio && <p className="entry_bio">{entry.bio}</p>}
                </div>
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
  background-color: #0a0a0a;
  color: #fff;
  padding-top: 70px; /* below navbar */

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
    flex-direction: column;
    position: fixed;
    top: 0;
    left: 0;
    width: 82vw;
    max-width: 340px;
    height: 100vh;
    background: #000;
    z-index: 500;
    padding: 48px 28px 40px;
    overflow-y: auto;
    transform: translateX(-100%);
    transition: transform 0.3s ease;

    &.open {
      transform: translateX(0);
    }
  `}

  .drawer_close {
    all: unset;
    cursor: pointer;
    position: fixed;
    top: 16px;
    right: 16px;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: #222;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    color: #fff;
    z-index: 501;
  }

  .cat_nav {
    display: flex;
    flex-direction: column;
    gap: 0;
    margin-top: 8px;
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
  position: fixed;
  top: 70px;
  left: 0;
  height: calc(100vh - 70px);
  overflow-y: auto;
  padding: 40px 32px;
  border-right: 1px solid rgba(255,255,255,0.06);
  background: #0a0a0a;
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
  margin-left: ${SIDEBAR_W};
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
    background: radial-gradient(ellipse at 60% 30%, rgba(201,168,76,0.06) 0%, transparent 60%), #0a0a0a;
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

  /* ── Entry cards ── */
  .entries {
    display: flex;
    flex-direction: column;
  }

  .entry {
    display: grid;
    grid-template-columns: 55% 1fr;
    min-height: 500px;
    border-bottom: 1px solid rgba(255,255,255,0.06);

    ${media.tablet`
      grid-template-columns: 1fr 1fr;
    `}

    ${media.mobileLarge`
      grid-template-columns: 1fr;
      min-height: auto;
    `}
  }

  .entry_photo {
    overflow: hidden;
    max-height: 700px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: top center;
      display: block;
      filter: grayscale(20%);
    }

    ${media.mobileLarge`
      max-height: 420px;
    `}
  }

  .entry_info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 48px 52px;
    background: #0a0a0a;

    ${media.tablet`
      padding: 32px 28px;
    `}

    ${media.mobileLarge`
      padding: 28px 20px 36px;
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
    border: 1px solid rgba(255,255,255,0.35);
    border-radius: 100px;
    font-family: 'Work Sans', sans-serif;
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    color: rgba(255,255,255,0.75);
    margin-bottom: 24px;
    align-self: flex-start;
  }

  .entry_bio {
    font-family: 'Work Sans', sans-serif;
    font-size: 0.88rem;
    line-height: 1.8;
    color: rgba(255,255,255,0.6);
    margin: 0;

    ${media.mobileLarge`
      display: none;
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
