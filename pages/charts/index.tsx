import Theme from "constants/Theme";
import React, { useState } from "react";
import styled from "styled-components";
import { getChartCategories } from "utility/ChartsApi/api";
import { ChartCategory } from "utility/ChartsApi/types";
import ChartCard from "components/molecules/ChartCard";
import media from "constants/MediaQuery";

export async function getStaticProps() {
  const chartCategories = await getChartCategories();
  return {
    props: {
      chartCategories: chartCategories.data,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 3600, // In seconds
  };
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

  const [activeCategory, setActiveCategory] = useState(
    Object.keys(sortedCategories)[0]
  );
  // console.log(sortedCategories);

  return (
    <ChartPageStyling>
      <div className="chart_tabs">
        {Object.keys(sortedCategories).map((header) => (
          <button
            key={header}
            onClick={() => setActiveCategory(header)}
            className={`chart_tab ${activeCategory === header ? "active" : ""}`}
          >
            {header}
          </button>
        ))}
      </div>
      <div className="chart_categories">
        {sortedCategories[activeCategory].map((category) => (
          <ChartCard key={category.id} category={category} />
        ))}
      </div>
    </ChartPageStyling>
  );
};

export default Charts;

const ChartPageStyling = styled.div`
  max-width: 1200px;
  width: 95%;
  margin: 0 auto;

  .chart_tabs {
    display: flex;
    gap: 70px;
    margin: 50px 0;

    ${media.tablet`
      justify-content: space-around;
      gap: 0px;
    `}

    .chart_tab {
      all: unset;
      cursor: pointer;
      font-family: ${Theme.typography.extra};
      font-size: ${Theme.fontSizes.large};
      font-weight: ${Theme.fontWeights.medium};
      position: relative;

      &.active {
        color: ${Theme.colorPalette.ttcYellow};
        &::after {
          content: " ";
          position: absolute;
          height: 3px;
          width: 3px;
          border-radius: 50%;
          background-color: ${Theme.colorPalette.ttcYellow};
          bottom: -8px;
          left: 50%;
          transform: translateX(-50%);
        }
      }
    }
  }

  .chart_categories {
    display: grid;
    gap: 32px;
    margin-bottom: 100px;
    grid-template-columns: repeat(2, minmax(200px, 1fr));

    ${media.tablet`
      grid-template-columns: repeat(1, minmax(200px, 1fr));
    `}
  }
`;
