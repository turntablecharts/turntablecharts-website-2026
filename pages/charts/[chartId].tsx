/* eslint-disable @next/next/no-img-element */
import Typography from 'components/atoms/typography';
import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { parse, format, getWeek, startOfWeek, endOfWeek } from 'date-fns';
import Theme from 'constants/Theme';
import { getChartById, getChartByIdAndWeekNumber, getChartCategories } from 'utility/ChartsApi/api';
import { ChartsByCategoryResponse } from 'utility/ChartsApi/types';
import { resolveUserTypeToTableData } from 'utility/helpers';
import RankPlusTrend from 'components/atoms/RankPlusTrend';
import SongEntry from 'components/molecules/SongEntry';
import NewEntryIcon from 'assets/icons/newEntry.svg';
import { TableContentLayout } from 'components/organisms/TableLayout';
import MyDatePicker from 'components/atoms/datePicker';

const CHART_HEADER = {
  rank: {
    key: 'rank',
    label: 'Rank',
    active: true,
  },
  entry: {
    key: 'entry',
    label: 'Entry',
    active: true,
  },
  lastWeek: {
    key: 'lastWeek',
    label: 'Last Week',
    active: true,
  },
  peak: {
    key: 'peak',
    label: 'Peak',
    active: true,
  },
};

export const getStaticProps: GetStaticProps = async (context) => {
  const chartId = context.params?.chartId;

  try {
    const response = await getChartById(chartId as string);

    if (response.data) {
      return {
        props: {
          chartData: response.data,
        },
        revalidate: 3600,
      };
    }
  } catch (e) {
    return {
      props: {
        chartData: [],
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
  try {
    const chartCategories = await getChartCategories();
    const paths = chartCategories.data.slice(10).map((chart) => ({
      params: { chartId: chart.id.toString() },
    }));

    return {
      paths: paths,
      fallback: 'blocking',
    };
  } catch (e) {
    return {
      paths: [''],
      fallback: 'blocking',
    };
  }
};

const getDateByWeekIndex = (index: string) => {
  return new Date(
    parse(index, 'I', new Date(), {
      weekStartsOn: 5,
    })
  );
};

const SingleChartPage: React.FC<{
  chartData: ChartsByCategoryResponse;
}> = ({ chartData }) => {
  const [value] = React.useState<Date | null>(chartData.weekNumber ? getDateByWeekIndex(chartData.weekNumber?.toString()) : new Date());

  const [changedWeek, setChangedWeek] = React.useState<number>();
  const [changedWeekChart, setChangedWeekChart] = React.useState<ChartsByCategoryResponse>();

  useEffect(() => {
    if (changedWeek) {
      getChartByIdAndWeekNumber(chartData.chartCategoryId, changedWeek).then(({ data }) => {
        if (data.chartItems) {
          // console.log(data);
          setChangedWeekChart(data);
        }
      });
    }
  }, [changedWeek, chartData.chartCategoryId]);

  const currentChart = changedWeekChart || chartData;

  const tableData = resolveUserTypeToTableData(
    currentChart.chartItems.sort((a, b) => a.rank - b.rank),
    (cur) => ({
      rank: <RankPlusTrend song={cur} />,
      entry: <SongEntry song={cur} />,
      lastWeek: cur.lastPosition > 0 ? cur.lastPosition : cur.lastPosition < 0 ? '*' : <NewEntryIcon />,
      peak: cur.highestPosition,
    })
  );

  const handleChange = (newValue: Date | null) => {
    if (newValue) {
      // setChangedWeek(newValue);
      // console.log("cal wk normal", getWeek(newValue));
      // console.log("cal wk on friday", getWeek(newValue, { weekStartsOn: 5 }));
      setChangedWeek(getWeek(newValue, { weekStartsOn: 5 }));
    }
  };

  const videosToPlay = currentChart.chartItems.slice(0, 10);
  const videoToPlayIds = videosToPlay.map((video) => {
    if (!video.musicLink.includes('youtube')) return '';
    return video.musicLink.split('v=')[1].split('&')[0];
  });

  return (
    <SingleChartPageStyling>
      <Head>
        <title>{`TurnTable Charts | ${currentChart.category}`}</title>
        <meta name="description" content={`TurnTable Charts | ${currentChart.category}`} />
      </Head>
      <div className="page_header">
        <Typography.Title>{currentChart.category}</Typography.Title>
        {currentChart.weekNumber && (
          <div className="date_container">
            <Typography.Text style={{ color: Theme.colorPalette.white }} fontType="Montserrat" level="large" weight="semiBold">
              {changedWeek
                ? `${format(
                    startOfWeek(getDateByWeekIndex(changedWeek.toString()), {
                      weekStartsOn: 5,
                    }),
                    'PPP'
                  )} - ${format(
                    endOfWeek(getDateByWeekIndex(changedWeek.toString()), {
                      weekStartsOn: 5,
                    }),
                    'PPP'
                  )}`
                : `${format(startOfWeek(value!, { weekStartsOn: 5 }), 'PPP')} - ${format(endOfWeek(value!, { weekStartsOn: 5 }), 'PPP')}`}
            </Typography.Text>
            <MyDatePicker mostRecentWeek={value} value={changedWeek ? getDateByWeekIndex(changedWeek.toString()) : value} handleChange={handleChange} />
          </div>
        )}
      </div>
      {currentChart.headerVideoUrl! && (
        <div className="page_iframe">
          <iframe width="690" height="390" src={`${currentChart.headerVideoUrl!}?playlist=${videoToPlayIds.join()}&autoplay=1&mute=1&loop=1`}></iframe>
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

    .date_container {
      display: inline-flex;
      align-items: center;
      border: 1px solid ${Theme.colorPalette.ttcYellow};
      border-radius: 60px;
      margin-top: 20px;
      padding: 10px 5px 10px 15px;

      .date-text {
        input {
          margin-top: 0px;
          width: 1px;
          height: 1px;
          visibility: hidden;
          pointer-events: none;
        }
        svg {
          color: #f1a01f;
          // border: 1px solid #f1a01f;
        }
      }
    }
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
