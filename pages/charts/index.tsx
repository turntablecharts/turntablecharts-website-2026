import Theme from 'constants/Theme';
import React, { useState } from 'react';
import styled from 'styled-components';
import { getChartCategories } from 'utility/ChartsApi/api';
import { ChartCategory } from 'utility/ChartsApi/types';
import media from 'constants/MediaQuery';
import ChartCard from 'components/molecules/ChartCard';
import Typography from 'components/atoms/typography';
import { headingMixin } from 'constants/mixins';

const TTC_COLORS = [
  Theme.colorPalette.ttcBlue,
  Theme.colorPalette.ttcOrange,
  Theme.colorPalette.ttcGreen,
  Theme.colorPalette.ttcDarkGreen,
  Theme.colorPalette.ttcBlack,
];

const TV_SONGS_KEYWORDS = ['tv song', 'tv songs', 'television song'];

const isTVSongs = (name: string) =>
  TV_SONGS_KEYWORDS.some((k) => name.toLowerCase().includes(k));

const TV_SONGS_DESCRIPTION =
  'A defunct aggregated weekly airplay that combines plays & impressions from TV Stations in Nigeria. It was discontinued in December 2022, with the last chart dated week of Dec 2 — 8, 2022. Ayra Starr\'s "Rush" was the last No. 1 song on the chart.';

export async function getStaticProps() {
  try {
    const chartCategories = await getChartCategories();

    // Move TV Songs to last, patch its description
    const patched: ChartCategory[] = chartCategories.data.map((cat) =>
      isTVSongs(cat.name) ? { ...cat, description: TV_SONGS_DESCRIPTION } : cat
    );
    const tvSongs = patched.filter((c) => isTVSongs(c.name));
    const rest = patched.filter((c) => !isTVSongs(c.name));
    const ordered = [...rest, ...tvSongs];

    return {
      props: {
        chartCategories: ordered,
      },
      revalidate: 1800,
    };
  } catch (e) {
    return {
      props: {
        chartCategories: [],
      },
      revalidate: 1800,
    };
  }
}

const Charts: React.FC<{
  chartCategories: ChartCategory[];
}> = ({ chartCategories }) => {
  let sortedCategories: { [key: string]: ChartCategory[] } = {};

  chartCategories.forEach((category) => {
    if (!sortedCategories[category.heading]) {
      sortedCategories[category.heading] = [category];
    } else {
      sortedCategories = {
        ...sortedCategories,
        [category.heading]: [...sortedCategories[category.heading], category],
      };
    }
  });

  const [activeCategory, setActiveCategory] = useState(Object.keys(sortedCategories)[0]);

  return (
    <ChartPageStyling>
      <Typography.Heading fontType="Nohemi" level={1} weight="black" className='heading' >
        Official Charts
      </Typography.Heading>
      <div className="chart_tabs">
        {Object.keys(sortedCategories)
          .filter((header) => header && header.trim() !== '')
          .map((header) => (
            <button key={header} onClick={() => setActiveCategory(header)} className={`chart_tab ${activeCategory === header ? 'active' : ''}`}>
              {header}
            </button>
          ))}
      </div>
      <div className="chart_categories">
        {sortedCategories[activeCategory]?.map((category, index) => (
          <ChartCard key={category.id} category={category} cardColor={TTC_COLORS[index % TTC_COLORS.length]} />
        ))}
      </div>
    </ChartPageStyling>
  );
};

export default Charts;

const ChartPageStyling = styled.div`
  max-width: 1400px;
  width: 95%;
  margin: 0 auto;
  padding-top: 6rem;
   ${media.tablet`
      padding-top: 6rem;
    `}

  .heading {
   ${headingMixin}
    ${media.tablet`
      font-size: 3rem;
    `}  
    ${media.mobileLarge`
      font-size: 2.6rem;
    `}
  }

  .chart_tabs {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 70px;
    margin: 10px 0 20px 0;
    color: white;
    padding: 1rem 0;

    ${media.tablet`
      gap: 20px;
      margin: 20px 0;
    `}
    ${media.mobileLarge`
      gap: 24px;
      justify-content: center;
      align-items: center;
      padding: 1rem 0;
      margin: 10px 0 30px;
    
    `}

    .chart_tab {
      all: unset;
      cursor: pointer;
      font-family: ${Theme.typography.heading};
      font-size: ${Theme.fontSizes.large};
      font-weight: ${Theme.fontWeights.medium};
      position: relative;

      ${media.mobileLarge`
        font-size: ${Theme.fontSizes.medium};
      `}

      &.active {
        &::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: -8px;
          width: calc(100% + 18px);
          height: 2px;
          background: #F1920C;
          box-shadow: -1px 0px 6.5px 0px #F1920C;
          backdrop-filter: blur(4px);
          border-radius: 2px;
        }
      }
    }
  }

  .chart_categories {
    display: grid;
    gap: 22px;
    margin-bottom: 100px;
    grid-template-columns: repeat(2, minmax(0, 600px));
    justify-content: center;
    align-items: start;

    /* First card spans full width */
    > *:first-child {
      grid-column: 1 / -1;
    }

    ${media.mobileLarge`
      grid-template-columns: minmax(0, 600px);
      justify-content: center;

      > *:first-child {
        grid-column: auto;
      }
    `}
  }
`;
