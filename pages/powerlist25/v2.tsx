/* eslint-disable @next/next/no-img-element */
import React, { ChangeEvent, useMemo, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import media from 'constants/MediaQuery';
import Theme from 'constants/Theme';
import { getPowerlist } from '../../utility/PowerlistApi/api';
import { PowerlistCategory, PowerlistEntry } from '../../utility/PowerlistApi/types';
import { AfricanGlobalHonoreesV2 } from './african';

const ACCENT = Theme.colorPalette.ttcYellow;

type FilterValue = 'all' | string;

const PowerlistAlternative: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<FilterValue>('all');
  const { data, isLoading, isError } = useQuery('powerlist-v2', getPowerlist, {
    staleTime: 1000 * 60 * 60,
  });

  const response = data?.data as { categories?: PowerlistCategory[]; recognitions?: PowerlistEntry[] } | undefined;
  const categories = response?.categories ?? [];
  const visibleEntries = useMemo(
    () => {
      const entries = response?.recognitions ?? [];
      return activeCategory === 'all'
        ? entries
        : entries.filter((entry) => String(entry.powerlistCategoryId) === activeCategory);
    },
    [activeCategory, response?.recognitions]
  );

  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setActiveCategory(event.target.value);
  };

  return (
    <>
      <Head>
        <title>Powerlist 2025 | TurnTable Charts</title>
        <meta name="description" content="TurnTable Charts Powerlist 2025." />
      </Head>

      <Page>
        <Header>
          <Title>Powerlist 2025</Title>
          <FilterRow>
            <label htmlFor="powerlist-category">Filter by category</label>
            <Select id="powerlist-category" value={activeCategory} onChange={handleCategoryChange}>
              <option value="all">All categories</option>
              {categories.map((category) => (
                <option key={category.id} value={String(category.id)}>{category.name}</option>
              ))}
              <option value="african-global">African &amp; Global</option>
            </Select>
          </FilterRow>
        </Header>

        <ListSection>
          {activeCategory === 'african-global' ? (
            <AfricanGlobalHonoreesV2 />
          ) : (
            <>
              <ListMeta>{isLoading ? '\u00a0' : `${visibleEntries.length} honorees`}</ListMeta>
              {isError && <State>We couldn&apos;t load the Powerlist right now. Please try again.</State>}
              {!isLoading && !isError && visibleEntries.length === 0 && <State>No honorees found in this category.</State>}
              <Entries aria-busy={isLoading} aria-label={isLoading ? 'Loading Powerlist honorees' : undefined}>
                {isLoading
                  ? Array.from({ length: 6 }, (_, index) => (
                    <EntrySkeleton key={index} aria-hidden="true">
                      <span className="rank" />
                      <span className="category" />
                      <div className="copy">
                        <span className="name" />
                        <span className="office" />
                      </div>
                    </EntrySkeleton>
                  ))
                  : visibleEntries.map((entry) => (
                    <Link key={entry.id} href={`/powerlist25/v2/${entry.id}`} passHref>
                      <Entry aria-label={`Read about ${entry.name}`}>
                        <EntryPhoto>
                          {entry.imageUrl ? <img src={entry.imageUrl} alt={entry.name} /> : <span>{String(entry.rank).padStart(2, '0')}</span>}
                        </EntryPhoto>
                        <EntryPanel>
                          <Rank>{String(entry.rank).padStart(2, '0')}</Rank>
                          <EntryMain>
                            <Name>{entry.name}</Name>
                            <Office>{entry.office}</Office>
                          </EntryMain>
                          <Category>
                            {categories.find((category) => category.id === entry.powerlistCategoryId)?.name ?? 'Powerlist'}
                          </Category>
                        </EntryPanel>
                      </Entry>
                    </Link>
                  ))}
              </Entries>
            </>
          )}
        </ListSection>
      </Page>
    </>
  );
};

export default PowerlistAlternative;

const Page = styled.main`
  min-height: 100vh;
  padding: 82px max(24px, 7vw) 140px;
  background: #0b0b0b;
  color: #fff;
  font-family: 'Work Sans', sans-serif;
  background-image: linear-gradient(rgba(0, 0, 0, .78), rgba(0, 0, 0, .78)), repeating-linear-gradient(90deg, #0b0b0b 0 220px, #111 220px 390px, #0b0b0b 390px 560px);
`;

const Header = styled.header`
  max-width: 1180px;
  margin: 0 auto;
  padding: 50px 0 46px;
  text-align: center;
  ${media.mobileLarge`padding: 38px 0 32px;`}
`;

const Title = styled.h1`
  margin: 0;
  font-family: 'Nohemi', sans-serif;
  font-size: clamp(3.5rem, 9vw, 8rem);
  font-weight: 900;
  line-height: .88;
  letter-spacing: 0;
  text-transform: uppercase;
  ${media.mobileLarge`font-size: 3.2rem;`}
`;

const FilterRow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 16px;
  text-align: left;
  label {
    color: rgba(255,255,255,.65);
    font-size: .72rem;
    font-weight: 700;
    letter-spacing: .08em;
    text-transform: uppercase;
  }
  ${media.mobileLarge`flex-direction: column; gap: 8px; text-align: center;`}
`;

const Select = styled.select`
  min-width: 210px;
  padding: 12px 38px 12px 15px;
  border: 1px solid rgba(255,255,255,.75);
  border-radius: 4px;
  outline: none;
  background: #0b0b0b;
  color: #fff;
  font: 600 .8rem 'Work Sans', sans-serif;
  cursor: pointer;
  &:focus { border-color: ${ACCENT}; box-shadow: 0 0 0 2px rgba(241,160,31,.2); }
  option { background: #0b0b0b; color: #fff; }
`;

const ListSection = styled.section`
  max-width: 1180px;
  margin: 0 auto;
  padding-top: 38px;
`;

const ListMeta = styled.p`
  margin: 0 0 14px;
  color: rgba(255,255,255,.45);
  font-size: .72rem;
  letter-spacing: .08em;
  text-transform: uppercase;
`;

const Entries = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
  ${media.tablet`grid-template-columns: repeat(2, minmax(0, 1fr));`}
  ${media.mobileLarge`grid-template-columns: 1fr; gap: 12px;`}
`;

const EntrySkeleton = styled.div`
  position: relative;
  aspect-ratio: 4 / 5;
  overflow: hidden;
  border-radius: 4px;
  background: #181818;
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(100deg, transparent 25%, rgba(255,255,255,.08) 45%, transparent 65%);
    background-size: 220% 100%;
    animation: powerlistShimmer 1.5s ease-in-out infinite;
  }
  span { position: absolute; display: block; border-radius: 2px; background: #2b2b2b; }
  .rank { top: 20px; left: 20px; width: 58px; height: 52px; }
  .category { top: 22px; right: 20px; width: 92px; height: 10px; }
  .copy { position: absolute; right: 20px; bottom: 22px; left: 20px; height: 58px; }
  .name { top: 0; left: 0; width: 72%; height: 20px; }
  .office { bottom: 0; left: 0; width: 48%; height: 12px; }
  @keyframes powerlistShimmer {
    from { background-position: 200% 0; }
    to { background-position: -200% 0; }
  }
  @media (prefers-reduced-motion: reduce) {
    &::before { animation: none; }
  }
`;

const Entry = styled.a`
  position: relative;
  display: block;
  aspect-ratio: 4 / 5;
  min-height: 0;
  overflow: hidden;
  border-radius: 4px;
  background: #222;
  color: #fff;
  text-decoration: none;
  scroll-snap-align: start;
  &:hover img { transform: scale(1.04); }
  &:focus-visible { outline: 3px solid ${ACCENT}; outline-offset: 4px; }
`;

const EntryPhoto = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
  background: #202020;
  img { width: 100%; height: 100%; display: block; object-fit: cover; object-position: center; transition: transform .45s ease; }
  span { display: grid; width: 100%; height: 100%; place-items: center; color: ${ACCENT}; font: 900 5rem 'Nohemi', sans-serif; }
`;

const EntryPanel = styled.div`
  position: absolute;
  inset: 0;
  display: block;
  padding: 20px;
  background: linear-gradient(180deg, rgba(0,0,0,.48) 0%, rgba(0,0,0,.34) 34%, rgba(0,0,0,.94) 100%);
  ${media.mobileLarge`padding: 18px;`}
`;

const Rank = styled.span`
  position: absolute;
  top: 18px;
  left: 20px;
  color: ${ACCENT};
  font-family: 'Nohemi', sans-serif;
  font-size: clamp(2rem, 4vw, 4rem);
  font-weight: 900;
  line-height: 1;
`;

const EntryMain = styled.div`
  position: absolute;
  right: 20px;
  bottom: 20px;
  left: 20px;
  min-width: 0;
`;

const Name = styled.h2`
  margin: 0 0 5px;
  color: #fff;
  font-family: 'Nohemi', sans-serif;
  font-size: clamp(1.1rem, 2vw, 1.7rem);
  font-weight: 700;
  line-height: 1.05;
  text-transform: uppercase;
`;

const Office = styled.p`
  margin: 0;
  color: rgba(255,255,255,.82);
  font-size: .85rem;
  line-height: 1.4;
`;

const Category = styled.span`
  position: absolute;
  top: 21px;
  right: 20px;
  color: ${ACCENT};
  font-size: .68rem;
  font-weight: 700;
  letter-spacing: .08em;
  text-align: right;
  text-transform: uppercase;
  ${media.mobileLarge`top: 19px; right: 18px; font-size: .62rem;`}
`;

const State = styled.p`
  padding: 60px 0;
  color: rgba(255,255,255,.65);
  text-align: center;
`;
