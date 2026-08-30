/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import media from 'constants/MediaQuery';
import Theme from 'constants/Theme';
import { get30Under30 } from '../../utility/PowerlistApi/api';
import { Under30Entry } from '../../utility/PowerlistApi/types';

const ACCENT = Theme.colorPalette.ttcYellow;

const ThirtyUnderThirty: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'first' | 'last'>('all');
  const [selectedEntry, setSelectedEntry] = useState<Under30Entry | null>(null);
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
    if (!selectedEntry) return undefined;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedEntry(null);
    };
    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, [selectedEntry]);

  return (
    <>
      <Head>
        <title>30 Under 30 | TurnTable Charts</title>
        <meta name="description" content="Meet TurnTable Charts' 30 Under 30 class of 2026." />
      </Head>
      <Page>
        <Hero>
          <HeroImage src="/assets/stackedhero.png" alt="TurnTable Charts 30 Under 30" />
          <HeroLogo src="/assets/ttc-new.png" alt="TurnTable Charts" />
        </Hero>

        <Intro>
          <div>
            <h2>Inside TurnTable Charts&apos;<br />30 Under 30 Class of 2026</h2>
            <p>Every year, TurnTable&apos;s 30 Under 30 list shines a light on the young professionals driving the business of Nigerian music forward. The Class of 2026 is a reflection of the industry&apos;s energy and ambition: the marketers, label executives, distributors, brand specialists, managers and more who are quietly shaping the sound and structure of today&apos;s Afrobeats.</p>
            <p>They are the people behind the hits, mastering complex distribution, building new audiences, and creating pathways for artists to reach wider communities. This is a celebration of the work that keeps the culture moving.</p>
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
              <Honoree key={entry.id} type="button" onClick={() => setSelectedEntry(entry)} aria-label={`View ${entry.name}`}>
                <div className="photo">
                  {entry.image ? <img src={entry.image} alt={entry.name} /> : <div className="photo_placeholder">{String(index + 1).padStart(2, '0')}</div>}
                </div>
                <div className="details">
                  <h3>{entry.name}</h3>
                  <p>{entry.age} / {entry.role}</p>
                </div>
              </Honoree>
            ))}
          </Grid>
        </ListSection>
      </Page>
      {selectedEntry && (
        <ModalOverlay role="presentation" onMouseDown={() => setSelectedEntry(null)}>
          <Modal role="dialog" aria-modal="true" aria-label={selectedEntry.name} onMouseDown={(event) => event.stopPropagation()}>
            <ModalClose type="button" onClick={() => setSelectedEntry(null)} aria-label="Close">&times;</ModalClose>
            <div className="modal_photo">
              {selectedEntry.image && <img src={selectedEntry.image} alt={selectedEntry.name} />}
            </div>
            <div className="modal_details">
              <h2>{selectedEntry.name}</h2>
              <p>{selectedEntry.age} / {selectedEntry.role}</p>
            </div>
          </Modal>
        </ModalOverlay>
      )}
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
  height: min(46vw, 620px);
  min-height: 360px;
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
`;

const HeroLogo = styled.img`
  position: absolute;
  width: 190px;
  height: auto;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  filter: brightness(0) invert(1);
`;

const Intro = styled.section`
  display: block; max-width: 1180px; margin: 0 auto; padding: 110px 7vw; color: #050505;
  h2 { font-family: 'Nohemi', sans-serif; font-size: clamp(2.2rem, 4.4vw, 4.4rem); line-height: .98; text-transform: uppercase; margin: 0 0 34px; }
  p { max-width: 720px; color: #000; font-size: .86rem; font-weight: 400; line-height: 1.8; margin: 0 0 18px; }
  ${media.mobileLarge`padding: 70px 24px;`}
`;

const ListSection = styled.section`
  position: relative; overflow: hidden; background: #090909; color: white; padding: 82px max(7vw, 24px) 120px; min-height: 700px;
  &::before, &::after { content: ''; position: absolute; pointer-events: none; background: #101010; }
  &::before { width: 180px; height: 72px; left: 3%; top: 76px; box-shadow: 650px 0 #101010, 870px 360px #101010; }
  &::after { width: 230px; height: 135px; left: -30px; top: 470px; box-shadow: 900px 210px #101010, 340px 420px #101010; }
`;

const ListHeader = styled.div`
  max-width: 1180px; margin: 0 auto 30px; text-align: center;
  h2 { font-family: 'Nohemi', sans-serif; font-size: clamp(3rem, 7vw, 7rem); line-height: .86; text-transform: uppercase; margin: 18px 0 0; }
  h2 span { color: ${ACCENT}; }
  p { color: rgba(255,255,255,.62); font-size: .72rem; line-height: 1.6; max-width: 420px; margin: 24px auto 0; }
  ${media.mobileLarge`h2 { font-size: 16vw; }`}
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

const Honoree = styled.button`
  width: 100%; border: 0; padding: 0; color: inherit; text-align: left; cursor: pointer; background: transparent; font: inherit;
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

const ModalOverlay = styled.div`
  position: fixed; inset: 0; z-index: 1000; display: grid; place-items: center; padding: 24px; background: rgba(0,0,0,.82);
`;

const Modal = styled.div`
  width: min(520px, 100%); position: relative; background: #111; color: white; box-shadow: 0 20px 80px rgba(0,0,0,.5);
  .modal_photo { aspect-ratio: 1 / 1.05; max-height: 62vh; background: #242424; overflow: hidden; }
  .modal_photo img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .modal_details { padding: 22px 24px 26px; }
  h2 { font: 700 clamp(1.4rem, 4vw, 2rem) 'Nohemi'; text-transform: uppercase; margin: 0 0 7px; }
  p { color: ${ACCENT}; font-size: .76rem; text-transform: uppercase; margin: 0; }
`;

const ModalClose = styled.button`
  position: absolute; z-index: 1; top: 12px; right: 12px; width: 34px; height: 34px; border: 1px solid rgba(255,255,255,.7); border-radius: 50%; background: #090909; color: white; cursor: pointer; font-size: 1.5rem; line-height: 1;
`;