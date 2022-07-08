import Typography from "components/atoms/typography";
import SongEntry from "components/molecules/SongEntry";
import { TableContentLayout } from "components/organisms/TableLayout";
import Theme from "constants/Theme";
import { format, subDays } from "date-fns";
import React, { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { getTop50ChartWithPrevInfoByCategpry } from "utility/ChartsApi/api";
import {
  ChartCategoryType,
  Top50ChartsWithPrevInfoResponse,
} from "utility/ChartsApi/types";
import { resolveUserTypeToTableData } from "utility/helpers";
import NewEntryIcon from "assets/icons/newEntry.svg";
import Head from "next/head";
import RankPlusTrend from "components/atoms/RankPlusTrend";

const CHART_HEADER = {
  rank: {
    key: "rank",
    label: "Rank",
    active: true,
  },
  entry: {
    key: "entry",
    label: "Entry",
    active: true,
  },
  lastWeek: {
    key: "lastWeek",
    label: "Last Week",
    active: true,
  },
  peak: {
    key: "peak",
    label: "Peak",
    active: true,
  },
};

export async function getStaticProps() {
  const chartResponse = await getTop50ChartWithPrevInfoByCategpry(
    ChartCategoryType.TurnTableTop50
  );
  return {
    props: {
      chartInfo: chartResponse.data,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 7200, // In seconds
  };
}

const Charts: React.FC<{
  chartInfo: Top50ChartsWithPrevInfoResponse;
}> = ({ chartInfo }) => {
  const [activeChartMenu, setActiveChartMenu] = useState<ChartCategoryType>(
    chartInfo.result.category
  );

  const [isQueryEnabled, setIsQueryEnabled] = useState<boolean>(false);

  const { data } = useQuery(
    ["top50Charts", activeChartMenu],
    () =>
      getTop50ChartWithPrevInfoByCategpry(activeChartMenu).then(
        (res) => res.data
      ),
    {
      enabled: isQueryEnabled,
      staleTime: 60 * 60 * 1000,
      cacheTime: 60 * 60 * 1000,
    }
  );

  const activeChartInfo = data || chartInfo;

  const charts = Object.values(ChartCategoryType);
  const tableData = resolveUserTypeToTableData(
    activeChartInfo.result.chartItems.sort((a, b) => a.rank - b.rank),
    (cur) => ({
      rank: <RankPlusTrend song={cur} />,
      entry: <SongEntry song={cur} />,
      lastWeek:
        cur.lastPosition > 0 ? (
          cur.lastPosition
        ) : cur.lastPosition < 0 ? (
          "*"
        ) : (
          <NewEntryIcon />
        ),
      peak: cur.highestPosition,
    })
  );

  const splittedYoutubeUrl = activeChartInfo.result.headerVideoUrl!.split("/");
  const videoId = splittedYoutubeUrl[splittedYoutubeUrl.length - 1];

  return (
    <ChartPageStyling>
      <Head>
        <title>{`TurnTable Charts | ${activeChartMenu}`}</title>
        <meta
          name="description"
          content={`TurnTable Charts | ${activeChartMenu}`}
        />
      </Head>
      <div className="charts_menu">
        {charts.map((chart) => (
          <button
            key={chart}
            className={`menu ${chart === activeChartMenu ? "active" : ""}`}
            onClick={() => {
              setIsQueryEnabled(true);
              setActiveChartMenu(chart);
            }}
          >
            <Typography.Text
              fontType="Montserrat"
              level="large"
              weight="semiBold"
            >
              {chart}
            </Typography.Text>
          </button>
        ))}
      </div>
      <div className="page_header">
        <Typography.Title>{activeChartInfo.result.category}</Typography.Title>
        <Typography.Text
          style={{ color: Theme.colorPalette.ttcYellow, marginTop: "16px" }}
          fontType="Montserrat"
          level="large"
          weight="semiBold"
        >
          {`${format(
            subDays(new Date(activeChartInfo.result.dateCreated), 6),
            "PPP"
          )} - ${format(new Date(activeChartInfo.result.dateCreated), "PPP")}`}
        </Typography.Text>
      </div>
      {activeChartInfo.result.headerVideoUrl! && (
        <div className="page_iframe">
          <iframe
            width="690"
            height="390"
            src={`${activeChartInfo.result
              .headerVideoUrl!}?playlist=${videoId}&controls=0&loop=1`}
          ></iframe>
        </div>
      )}
      <div className="page_table">
        <TableContentLayout columns={CHART_HEADER} data={tableData} />
      </div>
    </ChartPageStyling>
  );
};

export default Charts;

const ChartPageStyling = styled.div`
  max-width: 1200px;
  width: 95%;
  margin: 0 auto;

  .charts_menu {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 50px;
    margin-top: 5px;

    .menu {
      padding: 7px 15px;
      border: 2px solid transparent;
      outline: none;
      color: ${Theme.colorPalette.textGrey};
      background: none;
      cursor: pointer;

      &:hover {
        color: ${Theme.colorPalette.ttcYellow};
      }

      &.active {
        color: ${Theme.colorPalette.ttcYellow};
        border-bottom: 2px solid ${Theme.colorPalette.ttcYellow};
      }
    }
  }
  .page_header {
    padding: 7vh 0;
    text-align: center;
  }

  .page_iframe {
    display: grid;
    place-items: center;

    iframe {
      border: 1px solid transparent;
      max-width: 690px;
      width: 90%;
      aspect-tatio: 16/9;
      /* border-bottom: 3px solid ${Theme.colorPalette.ttcYellow}; */
    }
  }
`;
