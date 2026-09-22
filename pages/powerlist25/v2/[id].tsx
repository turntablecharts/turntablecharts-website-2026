/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';
import media from 'constants/MediaQuery';
import Theme from 'constants/Theme';
import { getPowerlist } from '../../../utility/PowerlistApi/api';
import { PowerlistCategory, PowerlistEntry } from '../../../utility/PowerlistApi/types';

const ACCENT = Theme.colorPalette.ttcYellow;

type PowerlistData = {
  categories?: PowerlistCategory[];
  recognitions?: PowerlistEntry[];
};

const PowerlistProfile: React.FC = () => {
  const router = useRouter();
  const profileId = Array.isArray(router.query.id) ? router.query.id[0] : router.query.id;
  const { data, isLoading, isError } = useQuery('powerlist-v2', getPowerlist, {
    staleTime: 1000 * 60 * 60,
  });

  const response = data?.data as PowerlistData | undefined;
  const profile = response?.recognitions?.find((entry) => String(entry.id) === profileId);
  const category = response?.categories?.find((item) => item.id === profile?.powerlistCategoryId);

  if (!router.isReady || isLoading) return <ProfileSkeleton />;

  if (isError || !profile) {
    return (
      <StatePage>
        <p>{isError ? 'We couldn\'t load this profile right now.' : 'This Powerlist profile is not available.'}</p>
        <Link href="/powerlist25/v2" passHref><StateLink>Back to Powerlist 2025</StateLink></Link>
      </StatePage>
    );
  }

  const rank = String(profile.rank).padStart(2, '0');
  const categoryName = category?.name ?? 'Powerlist 2025';

  return (
    <Page>
      <Head>
        <title>{profile.name} | Powerlist 2025</title>
        <meta name="description" content={`${profile.name}, ${profile.office}. TurnTable Charts Powerlist 2025.`} />
      </Head>

      <TopBar>
        <Link href="/powerlist25/v2" passHref>
          <BackLink aria-label="Back to Powerlist 2025"><span aria-hidden="true">&#8592;</span> Powerlist 2025</BackLink>
        </Link>
        <span>{categoryName}</span>
      </TopBar>

      <Story>
        <StoryHeader>
          <span>{rank}</span>
          <p>{profile.name}</p>
          <span>Profile</span>
        </StoryHeader>

        <StoryGrid>
          <Article>
            <MarkdownText>
              <ReactMarkdown>{profile.remarks || ''}</ReactMarkdown>
            </MarkdownText>
          </Article>

          <ProfileIdentity>
            <span>TurnTable Powerlist / {rank}</span>
            <h1>{profile.name}</h1>
            <p>{profile.office}</p>
            <strong>{categoryName}</strong>
          </ProfileIdentity>

          {profile.comments && (
            <QuoteColumn>
              <Quote>
                <QuoteMark aria-hidden="true">“</QuoteMark>
                <ReactMarkdown>{profile.comments}</ReactMarkdown>
                {profile.commentWriter && <cite>{profile.commentWriter}</cite>}
              </Quote>
            </QuoteColumn>
          )}

          <SecondaryImage>
            {profile.imageUrl ? <img src={profile.imageUrl} alt="" /> : <PortraitFallback>{rank}</PortraitFallback>}
            <ImageIndex>{rank}</ImageIndex>
          </SecondaryImage>
        </StoryGrid>
      </Story>
    </Page>
  );
};

const ProfileSkeleton: React.FC = () => (
  <Page aria-busy="true" aria-label="Loading Powerlist profile">
    <TopBar><Skeleton width="150px" /><Skeleton width="110px" /></TopBar>
    <Story><StoryGrid><Article><Skeleton height="280px" /></Article><ProfileIdentity><Skeleton height="130px" /></ProfileIdentity><QuoteColumn><Skeleton height="180px" /></QuoteColumn><SecondaryImage><SkeletonBlock /></SecondaryImage></StoryGrid></Story>
  </Page>
);

export default PowerlistProfile;

const Page = styled.main`
  height: 100svh;
  min-height: 680px;
  padding-top: 70px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: #fff;
  background-image:
    linear-gradient(
      90deg,
      rgba(241, 160, 31, .055) 0 16%,
      transparent 16% 31%,
      rgba(11, 42, 49, .035) 31% 47%,
      transparent 47% 63%,
      rgba(241, 160, 31, .04) 63% 79%,
      transparent 79% 100%
    ),
    linear-gradient(
      0deg,
      rgba(11, 42, 49, .018) 0 50%,
      transparent 50% 100%
    );
  background-size: 100% 100%, 100% 210px;
  color: #090909;
  font-family: 'Work Sans', sans-serif;
  ${media.mobileLarge`height: auto; min-height: 100vh; overflow: visible;`}
`;

const TopBar = styled.nav`
  min-height: 66px;
  flex: 0 0 66px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: 0 max(24px, 3.5vw) 12px;
  font-size: .65rem;
  font-weight: 700;
  text-transform: uppercase;
  span:last-child { text-align: right; }
  ${media.mobileLarge`min-height: 74px; flex-basis: 74px; padding-bottom: 15px;`}
`;

const BackLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 9px;
  color: #090909;
  text-decoration: none;
  &:hover, &:focus-visible { color: ${ACCENT}; }
  span { font-size: 1rem; }
`;

const PortraitFallback = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  background: #d8d5ce;
  color: #090909;
  font: 900 clamp(5rem, 14vw, 12rem) / 1 'Nohemi', sans-serif;
`;

const Story = styled.section`
  flex: 1 1 auto;
  min-height: 0;
  display: flex;
  flex-direction: column;
  padding: 0 max(24px, 3.5vw) 20px;
  background: transparent;
  ${media.mobileLarge`display: block; padding-bottom: 50px;`}
`;

const StoryHeader = styled.header`
  min-height: 42px;
  flex: 0 0 42px;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, auto) minmax(0, 1fr);
  align-items: center;
  font-size: .62rem;
  font-weight: 800;
  text-transform: uppercase;
  p { max-width: 55vw; margin: 0; overflow-wrap: break-word; text-align: center; }
  span:last-child { text-align: right; }
`;

const StoryGrid = styled.div`
  flex: 1 1 auto;
  display: grid;
  grid-template-columns: minmax(0, 1.25fr) minmax(180px, .55fr) minmax(320px, 1fr);
  grid-template-rows: auto minmax(0, 1fr);
  gap: clamp(22px, 3vw, 54px);
  min-height: 0;
  padding-top: 14px;
  align-items: end;
  ${media.smallDesktop`grid-template-columns: minmax(0, 1.2fr) minmax(280px, .8fr); grid-template-rows: auto minmax(0, 1fr);`}
  ${media.mobileLarge`grid-template-columns: 1fr; grid-template-rows: auto; gap: 46px; min-height: 0; padding-top: 22px;`}
`;

const Article = styled.article`
  grid-column: 1;
  grid-row: 1;
  align-self: start;
  min-width: 0;
  ${media.mobileLarge`grid-column: 1; grid-row: auto; order: 3;`}
`;

const ProfileIdentity = styled.section`
  grid-column: 1;
  grid-row: 2;
  align-self: end;
  min-width: 0;
  padding: 20px 0 clamp(26px, 5vh, 54px);
  span, strong { display: block; font-size: .62rem; font-weight: 800; text-transform: uppercase; }
  h1 {
    max-width: 100%;
    margin: 12px 0 14px;
    font-family: 'Nohemi', sans-serif;
    font-size: clamp(1.9rem, 3vw, 3.4rem);
    font-weight: 800;
    line-height: .88;
    overflow-wrap: break-word;
    text-transform: uppercase;
  }
  p { max-width: 28ch; margin: 0 0 12px; font-size: clamp(.9rem, 1.15vw, 1.15rem); font-weight: 600; line-height: 1.15; overflow-wrap: break-word; }
  strong { color: ${ACCENT}; }
  ${media.mobileLarge`grid-column: 1; grid-row: auto; order: 1; padding: 12px 0 0; h1 { font-size: clamp(2.4rem, 12vw, 4rem); }`}
`;

const MarkdownText = styled.div`
  column-count: 2;
  column-gap: 34px;
  font-size: clamp(.72rem, .78vw, .88rem);
  font-weight: 500;
  line-height: 1.28;
  text-align: justify;
  p { margin: 0 0 1em; break-inside: avoid; }
  strong { font-weight: 800; }
  ${media.smallDesktop`column-count: 1;`}
  ${media.mobileLarge`font-size: .86rem; line-height: 1.45;`}
`;

const QuoteColumn = styled.aside`
  grid-column: 2;
  grid-row: 1 / 3;
  align-self: end;
  min-width: 0;
  padding-bottom: clamp(24px, 5vh, 54px);
  ${media.smallDesktop`grid-column: 1; grid-row: 1 / 3; align-self: end;`}
  ${media.mobileLarge`grid-column: 1; grid-row: auto; order: 4; padding-bottom: 0;`}
`;

const Quote = styled.blockquote`
  margin: 0;
  font-size: clamp(.5rem, .85vh, .68rem);
  font-weight: 600;
  line-height: 1.2;
  text-align: right;
  text-transform: uppercase;
  p { margin: 0 0 14px; }
  cite { display: block; color: ${ACCENT}; font-size: .58rem; font-style: normal; font-weight: 800; }
`;

const QuoteMark = styled.span`
  display: block;
  margin-bottom: 9px;
  color: ${ACCENT};
  font: 800 2.8rem / .5 Georgia, serif;
`;

const SecondaryImage = styled.figure`
  position: relative;
  grid-column: 3;
  grid-row: 1 / 3;
  align-self: end;
  width: 100%;
  height: min(48vh, calc(100% - 40px));
  min-height: 0;
  margin: 0 0 34px;
  overflow: visible;
  background: transparent;
  img { width: 100%; height: 100%; display: block; object-fit: contain; object-position: center bottom; }
  ${media.smallDesktop`grid-column: 2; grid-row: 1 / 3; height: min(50vh, calc(100% - 40px));`}
  ${media.mobileLarge`grid-column: 1; grid-row: auto; order: 2; height: auto; aspect-ratio: 1 / 1.05; margin: 0;`}
`;

const ImageIndex = styled.span`
  position: absolute;
  top: 0;
  left: -26px;
  font-size: .55rem;
  font-weight: 800;
  ${media.mobileLarge`left: 8px; top: 8px;`}
`;

const StatePage = styled.main`
  min-height: 80vh;
  display: grid;
  place-content: center;
  gap: 20px;
  padding: 100px 24px;
  background: #fff;
  color: #090909;
  font-family: 'Work Sans', sans-serif;
  text-align: center;
  p { margin: 0; }
`;

const StateLink = styled.a`
  color: #090909;
  font-size: .75rem;
  font-weight: 800;
  text-transform: uppercase;
  &:hover, &:focus-visible { color: ${ACCENT}; }
`;

const Skeleton = styled.span<{ width?: string; height?: string }>`
  display: block;
  width: ${({ width = '100%' }) => width};
  height: ${({ height = '16px' }) => height};
  background: linear-gradient(90deg, #ddd8d0 25%, #ebe7e1 50%, #ddd8d0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.4s linear infinite;
  @keyframes shimmer { to { background-position: -200% 0; } }
`;

const SkeletonBlock = styled(Skeleton)`
  width: 100%;
  height: 100%;
`;
