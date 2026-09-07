/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import media from 'constants/MediaQuery';
import Theme from 'constants/Theme';
import { get30Under30 } from '../../utility/PowerlistApi/api';
import { Under30Entry } from '../../utility/PowerlistApi/types';

const ACCENT = Theme.colorPalette.ttcYellow;
const HERO_IMAGES = [
  'Frame 1618869463.png',
  'Frame 1618869464.png',
  'Frame 1618869465.png',
  'Frame 1618869466.png',
  'Frame 1618869467.png',
  'Frame 1618869468.png',
  'Frame 1618869469.png',
  'Frame 1618869470.png',
  'Group 687.png',
].map((filename) => `/assets/30under30/${encodeURIComponent(filename)}`);

const ThirtyUnderThirty: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'first' | 'last'>('all');
  const [heroSlide, setHeroSlide] = useState(0);
  const [isHeroPaused, setIsHeroPaused] = useState(false);
  const { data, isLoading, isError } = useQuery('30-under-30', get30Under30, {
    staleTime: 1000 * 60 * 60,
  });

  const entries: Under30Entry[] = (data?.data ?? []).filter((entry) => entry.isActive);
  const visibleEntries = filter === 'all'
    ? entries
    : filter === 'first'
      ? entries.slice(0, 15)
      : entries.slice(15, 30);

  useEffect(() => {
    if (isHeroPaused) return undefined;
    const interval = window.setInterval(() => {
      setHeroSlide((currentSlide) => (currentSlide + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => window.clearInterval(interval);
  }, [isHeroPaused]);

  const moveHero = (direction: number) => {
    setHeroSlide((currentSlide) => (currentSlide + direction + HERO_IMAGES.length) % HERO_IMAGES.length);
  };

  return (
    <>
      <Head>
        <title>30 Under 30 | TurnTable Charts</title>
        <meta name="description" content="Meet TurnTable Charts' 30 Under 30 class of 2026." />
      </Head>
      <Page>
        <Hero
          onMouseEnter={() => setIsHeroPaused(true)}
          onMouseLeave={() => setIsHeroPaused(false)}
          onFocus={() => setIsHeroPaused(true)}
          onBlur={() => setIsHeroPaused(false)}
        >
          <HeroImage
            key={HERO_IMAGES[heroSlide]}
            src={HERO_IMAGES[heroSlide]}
            alt={`TurnTable Charts 30 Under 30, slide ${heroSlide + 1}`}
          />
          <HeroLogo src="/assets/under30logo.svg" alt="TurnTable Charts 30 Under 30" />
          <HeroControl type="button" className="previous" onClick={() => moveHero(-1)} aria-label="Previous hero image">&#8592;</HeroControl>
          <HeroControl type="button" className="next" onClick={() => moveHero(1)} aria-label="Next hero image">&#8594;</HeroControl>
        </Hero>

        <Intro>
          <div>
            <h2>Inside TurnTable Charts&apos;<br />30 Under 30 Class of 2026</h2>
            <p>Every year, TurnTable&apos;s 30 Under 30 list shines a light on the young professionals driving the business of Nigerian music forward. The Class of 2025 is a reflection of the industry&apos;s energy and ambition. It is made up of marketers, label executives, distributors, brand specialists, tour managers and more, who are quietly shaping the sound and structure of today&apos;s Afrobeats.</p>
            <p>They are the people behind the hits. The ones building strategies that move a song from the studio to the streets, and from the streets to the charts. Some are mastering the complex world of distribution, making sure music reaches audiences in Lagos, London, New York and beyond. Others are finding creative ways to tell artiste stories through campaigns, media partnerships and cultural moments that connect deeply with fans.</p>
            <p>This year&apos;s class has a clear understanding of how to build careers, not just viral moments. They use data to guide decisions, read the pulse of youth culture and understand the business mechanics that turn popularity into longevity. Their work is about more than breaking records; it is about building the infrastructure that keeps artists relevant and thriving.</p>
            <p>In a fast moving and competitive market, these executives are proving that influence is not defined by age. They bring agility, fresh thinking and a deep understanding of what drives music consumption today. They are as fluent in the language of digital trends as they are in the details of contracts and tour schedules.</p>
            <p>The Class of 2025 is a sign of where Nigerian music is headed. Outward to new audiences around the world, upward in cultural influence, and inward toward more sustainable systems for artists and teams. They are not just witnessing the growth of the industry. They are the ones making it happen.</p>
          </div>
        </Intro>

        <ListSection id="list">
          <ListHeader>
            <h2>Meet the list<br /><span>makers.</span></h2>
            <p>30 honorees for 2026. The list on these pages follows no particular order.</p>
          </ListHeader>
          <Filters role="tablist" aria-label="Filter honorees">
            {([['all', 'All'], ['first', '01 - 15'], ['last', '16 - 30']] as const).map(([value, label]) => (
              <button key={value} className={filter === value ? 'active' : ''} onClick={() => setFilter(value)} role="tab" aria-selected={filter === value}>{label}</button>
            ))}
          </Filters>
          {isLoading && <State>Loading the class...</State>}
          {isError && <State>We couldn&apos;t load the class right now. Please try again.</State>}
          {!isLoading && !isError && entries.length === 0 && <State>No honorees have been published yet.</State>}
          <Grid>
            {visibleEntries.map((entry, index) => (
              <Link key={entry.id} href={`/30Under30/${entry.id}`} passHref>
                <HonoreeLink aria-label={`View ${entry.name}`}>
                  <div className="photo">
                    {entry.image ? <img src={entry.image} alt={entry.name} /> : <div className="photo_placeholder">{String(index + 1).padStart(2, '0')}</div>}
                  </div>
                  <div className="details">
                    <h3>{entry.name}</h3>
                    <p>{entry.age} / {entry.role}</p>
                  </div>
                </HonoreeLink>
              </Link>
            ))}
          </Grid>
        </ListSection>
      </Page>
    </>
  );
};

export default ThirtyUnderThirty;

const Page = styled.main`
  background: #f4f1eb;
  color: #0c0c0c;
  font-family: 'Work Sans', sans-serif;
`;

const Hero = styled.section`
  height: min(60vw, 800px);
  min-height: 420px;
  position: relative;
  overflow: hidden;
  background: #111;
`;

const HeroImage = styled.img`
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  object-position: center;
  filter: saturate(.8) contrast(1.05);
  animation: heroImageIn .65s ease;
  @keyframes heroImageIn { from { opacity: .5; transform: scale(1.02); } to { opacity: 1; transform: scale(1); } }
`;

const HeroControl = styled.button`
  position: absolute; top: 50%; z-index: 2; width: 44px; height: 44px; border: .59px solid white; border-radius: 11.87px; background: rgba(255,255,255,.18); color: white; cursor: pointer; font-size: 1.1rem; line-height: 1; opacity: .5; transform: translateY(-50%); transition: background .2s ease, opacity .2s ease;
  &:hover, &:focus-visible { background: rgba(255,255,255,.34); opacity: .8; outline: none; }
  &.previous { left: 24px; }
  &.next { right: 24px; }
  ${media.mobileLarge`display: none;`}
`;

const HeroLogo = styled.img`
  position: absolute;
  width: 240px;
  height: auto;
  left: 50%;
  bottom: 34px;
  transform: translateX(-50%);
  ${media.mobileLarge`width: 170px; bottom: 24px;`}
`;

const Intro = styled.section`
  display: block; max-width: 1180px; margin: 0 auto; padding: 110px 7vw; color: #050505;
  h2 { max-width: 1180px; font-family: 'Nohemi', sans-serif; font-weight: 800; font-style: normal; font-size: 64px; line-height: 105%; letter-spacing: 0; text-transform: uppercase; margin: 0 0 34px; }
         p { max-width: 1180px; color: #000; font-family: 'Work Sans', sans-serif; font-size: 16px; font-weight: 500; font-style: normal; line-height: 27px; letter-spacing: -0.02em; text-align: justify; margin: 0 0 33px; }
  p:last-child { margin-bottom: 0; }
  ${media.mobileLarge`padding: 75px 20px; h2 { font-size: 24px; } p { max-width: none; font-size: 14px; line-height: 27px; text-align: justify; }`}
`;

const ListSection = styled.section`
  position: relative; overflow: hidden; background: #090909; color: white; padding: 82px max(7vw, 24px) 120px; min-height: 700px;
  &::before, &::after { content: ''; position: absolute; pointer-events: none; background: #101010; }
  &::before { width: 180px; height: 72px; left: 3%; top: 76px; box-shadow: 650px 0 #101010, 870px 360px #101010; }
  &::after { width: 230px; height: 135px; left: -30px; top: 470px; box-shadow: 900px 210px #101010, 340px 420px #101010; }
`;

const ListHeader = styled.div`
  position: relative; z-index: 1; max-width: 1180px; margin: 0 auto 30px; text-align: center;
  h2 { color: white; font-family: 'Nohemi', sans-serif; font-weight: 800; font-style: normal; font-size: 96px; line-height: 92%; letter-spacing: 0; text-align: center; text-transform: uppercase; margin: 18px 0 0; }
  h2 span { color: ${ACCENT}; }
  p { max-width: 420px; margin: 24px auto 0; color: rgba(255, 255, 255, 1); font-family: 'Work Sans', sans-serif; font-weight: 500; font-style: normal; font-size: 20px; line-height: 25px; letter-spacing: -0.02em; }
  ${media.mobileLarge`h2 { font-size: 36px; } p { font-size: 16px; line-height: 25px; text-align: center; }`}
`;

const Filters = styled.div`
  position: relative; z-index: 1; max-width: 1180px; margin: 0 auto 42px; display: flex; justify-content: center; gap: 10px;
  button { border: 1px solid rgba(255,255,255,.65); background: transparent; color: white; border-radius: 30px; padding: 10px 25px; cursor: pointer; font: 700 .68rem 'Work Sans'; }
  button.active, button:hover { background: ${ACCENT}; border-color: ${ACCENT}; color: #000; }
`;

const Grid = styled.div`
  position: relative; z-index: 1; max-width: 1180px; margin: 0 auto; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 42px 20px;
  ${media.tablet`grid-template-columns: repeat(2, 1fr);`}
  ${media.mobileLarge`grid-template-columns: 1fr; max-width: 430px;`}
`;

const HonoreeLink = styled.a`
  display: block; width: 100%; border: 0; padding: 0; color: inherit; text-align: left; cursor: pointer; background: transparent; font: inherit; text-decoration: none;
  .photo { aspect-ratio: 1 / 1.05; overflow: hidden; background: #242424; }
  .photo img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .4s ease; }
  &:hover .photo img, &:focus-visible .photo img { transform: scale(1.04); }
  &:focus-visible { outline: 2px solid ${ACCENT}; outline-offset: 6px; }
  .photo_placeholder { height: 100%; display: grid; place-items: center; color: ${ACCENT}; font: 5rem 'Nohemi'; background: linear-gradient(135deg, #252525, #111); }
  .details { padding: 16px 5px 0; position: relative; }
  h3 { color: white; font: 700 1.05rem 'Nohemi'; text-transform: uppercase; margin: 7px 0 3px; }
  &:hover h3, &:focus-visible h3 { color: ${Theme.colorPalette.ttcYellow}; text-decoration: underline; text-underline-offset: 3px; }
  p { color: rgba(255,255,255,.55); font-size: .66rem; text-transform: uppercase; margin: 0; }
`;

const State = styled.p`
  max-width: 1180px; margin: 60px auto; color: rgba(255,255,255,.65); text-align: center;
`;
