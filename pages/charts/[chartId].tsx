/* eslint-disable @next/next/no-img-element */
import Typography from "components/atoms/typography";
import { GetStaticProps, GetStaticPaths } from "next";
import Head from "next/head";
import React from "react";
import styled from "styled-components";
import { format, subDays } from "date-fns";
import Theme from "constants/Theme";
import { getChartById, getChartCategories } from "utility/ChartsApi/api";
import { ChartsByCategoryResponse } from "utility/ChartsApi/types";
import { resolveUserTypeToTableData } from "utility/helpers";
import RankPlusTrend from "components/atoms/RankPlusTrend";
import SongEntry from "components/molecules/SongEntry";
import NewEntryIcon from "assets/icons/newEntry.svg";
import { TableContentLayout } from "components/organisms/TableLayout";

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

export const getStaticProps: GetStaticProps = async (context) => {
  const chartId = context.params?.chartId;

  const response = await getChartById(chartId as string);

  if (response.data) {
    return {
      props: {
        chartData: response.data,
      },
      revalidate: 3600,
    };
  }

  return {
    notFound: true,
    revalidate: 3600,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const chartCategories = await getChartCategories();

  const paths = chartCategories.data.map((chart) => ({
    params: { chartId: chart.id.toString() },
  }));

  return {
    paths: paths,
    fallback: "blocking",
  };
};

const SingleChartPage: React.FC<{
  chartData: ChartsByCategoryResponse;
}> = ({ chartData }) => {
  const tableData = resolveUserTypeToTableData(
    chartData.chartItems.sort((a, b) => a.rank - b.rank),
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

  const videosToPlay = chartData.chartItems.slice(0, 10);
  const videoToPlayIds = videosToPlay.map(
    (video) => video.musicLink.split("v=")[1].split("&")[0]
  );

  return (
    <SingleChartPageStyling>
      <Head>
        <title>{`TurnTable Charts | ${chartData.category}`}</title>
        <meta
          name="description"
          content={`TurnTable Charts | ${chartData.category}`}
        />
      </Head>
      <div className="page_header">
        <Typography.Title>{chartData.category}</Typography.Title>
        <Typography.Text
          style={{ color: Theme.colorPalette.ttcYellow, marginTop: "16px" }}
          fontType="Montserrat"
          level="large"
          weight="semiBold"
        >
          {`${format(
            subDays(new Date(chartData.dateCreated), 6),
            "PPP"
          )} - ${format(new Date(chartData.dateCreated), "PPP")}`}
        </Typography.Text>
      </div>
      {chartData.headerVideoUrl! && (
        <div className="page_iframe">
          <iframe
            width="690"
            height="390"
            src={`${chartData.headerVideoUrl!}?playlist=${videoToPlayIds.join()}&autoplay=1&mute=1&loop=1`}
          ></iframe>
        </div>
      )}
      <div className="page_table">
        <TableContentLayout columns={CHART_HEADER} data={tableData} />
      </div>
    </SingleChartPageStyling>
  );
};

const SingleChartPageStyling = styled.div`
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

export default SingleChartPage;
