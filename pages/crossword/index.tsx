import React from 'react';
import Head from 'next/head';
import { GetStaticProps } from 'next';
import styled from 'styled-components';
import CrosswordGame from 'components/organisms/CrosswordGame';
import { getChartById } from 'utility/ChartsApi/api';
import { ChartCategoryType } from 'utility/ChartsApi/types';
import { generateCrossword } from 'utility/Crossword/generator';
import { CrosswordPageProps } from 'utility/Crossword/types';
import Theme from 'constants/Theme';
import media from 'constants/MediaQuery';

export const getStaticProps: GetStaticProps<CrosswordPageProps> = async () => {
  try {
    const response = await getChartById(1);
    const puzzle = response.data ? generateCrossword(response.data) : null;
    return {
      props:
        {
          puzzle,
          chartCategory: response.data?.category ?? ChartCategoryType.TurnTableTop50,
          sourceError: !puzzle,
        },
      revalidate: 60 * 60,
    };
  } catch {
    return {
      props: {
        puzzle: null,
        chartCategory: ChartCategoryType.TurnTableTop50,
        sourceError: true,
      },
      revalidate: 60 * 10,
    };
  }
};

const CrosswordPage: React.FC<CrosswordPageProps> = ({ puzzle, sourceError }) => (
  <>
    <Head>
      <title>The Chart Crossword | TurnTable Charts</title>
      <meta name="description" content="Play the TurnTable Chart Crossword, generated from this week's songs, artists and producers." />
      <meta property="og:title" content="The Chart Crossword | TurnTable Charts" />
      <meta property="og:description" content="Can you clear this week's music charts?" />
    </Head>
    {puzzle ? (
      <CrosswordGame puzzle={puzzle} />
    ) : (
      <Unavailable>
        <span>Chart crossword</span>
        <h1>New puzzle<br />loading soon.</h1>
        <p>{sourceError ? 'The latest chart could not produce a connected puzzle yet. Please check back shortly.' : 'There are not enough suitable answers in the current chart.'}</p>
      </Unavailable>
    )}
  </>
);

export default CrosswordPage;

const Unavailable = styled.main`
  min-height: 80vh; padding: 180px 7vw 120px; background: ${Theme.colorPalette.ttcBlack};
  span { color: ${Theme.colorPalette.ttcYellow}; font-size: .72rem; font-weight: 800; letter-spacing: .14em; text-transform: uppercase; }
  h1 { max-width: 900px; margin: 20px 0 28px; font: 900 clamp(3.5rem, 9vw, 8rem)/.88 'Nohemi'; text-transform: uppercase; }
  p { max-width: 530px; color: rgba(255,255,255,.62); font: 500 1rem/1.7 'Work Sans'; }
  ${media.mobileLarge`padding: 130px 20px 90px;`}
`;
