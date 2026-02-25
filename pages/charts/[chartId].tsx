/* eslint-disable @next/next/no-img-element */
import Typography from 'components/atoms/typography';
import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { parse, format, getWeek, startOfWeek, endOfWeek, addWeeks, subWeeks } from 'date-fns';
import Theme from 'constants/Theme';
import { getChartById, getChartByIdAndWeekNumber, getChartCategories } from 'utility/ChartsApi/api';
import { ChartsByCategoryResponse } from 'utility/ChartsApi/types';
import { resolveUserTypeToTableData } from 'utility/helpers';
import RankPlusTrend from 'components/atoms/RankPlusTrend';
import SongEntry from 'components/molecules/SongEntry';
import NewEntryIcon from 'assets/icons/newEntry.svg';
import LeftArrow from 'assets/icons/left.svg';
import PlayIcon from 'assets/icons/play.svg';
import CancelIcon from 'assets/icons/cancel.svg';
import { TableContentLayout } from 'components/organisms/TableLayout';
import MyDatePicker from 'components/atoms/datePicker';
import media from 'constants/MediaQuery';
import { headingMixin } from 'constants/mixins';

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
    label: (
      <span className="spantitle" title="Last week">
        Last Wk
      </span>
    ),
    active: true,
  },
  weeksOnChart: {
    key: 'weeksOnChart',
    label: (
      <span className="spantitle" title="Weeks on chart">
        WoC
      </span>
    ),
    active: true,
  },
  peak: {
    key: 'peak',
    label: 'Peak',
    active: true,
  },
  play: {
    key: 'play',
    label: '',
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

const getDateByWeekIndex = (index: string, year: number) => {
  return new Date(
    parse(index, 'I', new Date(year, 5, 1), {
      weekStartsOn: 5,
    }),
  );
};

const SingleChartPage: React.FC<{
  chartData: ChartsByCategoryResponse;
}> = ({ chartData }) => {
  const [value] = React.useState<Date | null>(
    chartData.weekNumber ? getDateByWeekIndex(chartData.weekNumber?.toString(), new Date(chartData.dateCreated).getFullYear()) : new Date(),
  );

  const [changedWeek, setChangedWeek] = React.useState<{ year: number; week: number }>();
  const [changedWeekChart, setChangedWeekChart] = React.useState<ChartsByCategoryResponse>();

  useEffect(() => {
    if (changedWeek) {
      getChartByIdAndWeekNumber(chartData.chartCategoryId, changedWeek.week, changedWeek.year).then(({ data }) => {
        if (data.chartItems) {
          setChangedWeekChart(data);
        }
      });
    }
  }, [changedWeek, chartData.chartCategoryId]);

  const currentChart = changedWeekChart || chartData;

  const handleChange = (newValue: Date | null) => {
    if (newValue) {
      setChangedWeek({ year: new Date(newValue).getFullYear(), week: getWeek(newValue, { weekStartsOn: 5 }) });
    }
  };

  // Current date being displayed in the picker
  const currentDisplayDate = changedWeek
    ? getDateByWeekIndex(changedWeek.week.toString(), changedWeek.year)
    : value!;

  const handlePrevWeek = () => {
    const prev = subWeeks(currentDisplayDate, 1);
    handleChange(prev);
  };

  const canGoNext = currentDisplayDate < (value ?? new Date());
  const handleNextWeek = () => {
    if (!canGoNext) return;
    const next = addWeeks(currentDisplayDate, 1);
    handleChange(next);
  };

  const videosToPlay = currentChart.chartItems.slice(0, 10);
  const videoToPlayIds = videosToPlay.map((video) => {
    if (!video.musicLink.includes('youtube')) return '';
    return video.musicLink.split('v=')[1].split('&')[0];
  });

  const [vidToPlay, setVidToPlay] = React.useState<string | null>(null);
  const [modalOpen, setModalOpen] = React.useState(false);

  const handlePlaySong = (url: string) => {
    setVidToPlay(url);
    setModalOpen(true);
  };

  const tableData = resolveUserTypeToTableData(
    currentChart.chartItems.sort((a, b) => a.rank - b.rank),
    (cur) => ({
      rank: (
        <div className="center">
          <RankPlusTrend song={cur} />
        </div>
      ),
      entry: <SongEntry song={cur} setVid={handlePlaySong} />,
      lastWeek: <div className="center">{cur.lastPosition > 0 ? cur.lastPosition : cur.lastPosition < 0 ? '*' : <NewEntryIcon />}</div>,
      weeksOnChart: <div className="center">{cur.weeksOnChart}</div>,
      peak: <div className="center">{cur.highestPosition}</div>,
      play: (
        <div className="center">
          <button
            className="play_btn"
            onClick={() => {
              const vidID = cur.musicLink.split('v=')[1]?.split('&')[0];
              if (vidID) handlePlaySong(`https://www.youtube.com/embed/${vidID}?playsinline=1&rel=0`);
            }}
          >
            <PlayIcon />
          </button>
        </div>
      ),
    }),
  );

  return (
    <SingleChartPageStyling>
      <Head>
        <title>{`TurnTable Charts | ${currentChart.category}`}</title>
        <meta name="description" content={`TurnTable Charts | ${currentChart.category}`} />
      </Head>
      <div className="page_header">
        <Typography.Heading fontType="RobotoFlex" level={1} weight="extraBold" className='heading' >{currentChart.category}</Typography.Heading>
        {currentChart.weekNumber && (
          <div className="date_wrapper">
            <span className="arrow_btn arrow_left" onClick={handlePrevWeek}>
              <LeftArrow />
            </span>
            <div className="date_container">
              <MyDatePicker
                mostRecentWeek={value}
                value={changedWeek ? getDateByWeekIndex(changedWeek.week.toString(), changedWeek.year) : value}
                handleChange={handleChange}
              />
              <Typography.Text style={{ color: Theme.colorPalette.white }} fontType="WorkSans" level="large" weight="semiBold">
                {changedWeek
                  ? `${format(
                    startOfWeek(getDateByWeekIndex(changedWeek.week.toString(), changedWeek.year), {
                      weekStartsOn: 5,
                    }),
                    'MMM do',
                  )} - ${format(
                    endOfWeek(getDateByWeekIndex(changedWeek.week.toString(), changedWeek.year), {
                      weekStartsOn: 5,
                    }),
                    'MMM do, yyyy',
                  )}`
                  : `${format(startOfWeek(value!, { weekStartsOn: 5 }), 'MMM do')} - ${format(endOfWeek(value!, { weekStartsOn: 5 }), 'MMM do, yyyy')}`}
              </Typography.Text>

            </div>
            <span className={`arrow_btn arrow_right${!canGoNext ? ' disabled' : ''}`} onClick={handleNextWeek}>
              <LeftArrow />
            </span>
          </div>
        )}
      </div>
      {/* Video Modal */}
      {modalOpen && vidToPlay && (
        <div className="video_modal_overlay" onClick={() => setModalOpen(false)}>
          <div className="video_modal_wrapper" onClick={(e) => e.stopPropagation()}>
            <button className="modal_close" onClick={() => setModalOpen(false)}>
              <CancelIcon />
            </button>
            <div className="video_modal">
              <iframe
                src={vidToPlay}
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
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

  .heading {
    padding-top: 6rem;
    ${headingMixin}
  }
  

    .date_wrapper {
      display: inline-flex;
      align-items: center;
      gap: 12px;
      margin-top: 20px;

      .arrow_btn {
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        opacity: 0.85;
        transition: opacity 0.2s ease;

        &:hover {
          opacity: 1;
        }

        &.disabled {
          opacity: 0.25;
          cursor: not-allowed;
          pointer-events: none;
        }

        svg {
          width: 36px;
          height: 36px;
        }
      }

      .arrow_right {
        transform: scaleX(-1);
      }

      .date_container {
        display: inline-flex;
        align-items: center;
        border: 1px solid ${Theme.colorPalette.white};
        border-radius: 60px;
        padding: 10px 12px;

        ${media.tablet`
          p {
            font-size: 14px;
          }
        `}

        .date-text {
         

          /* Hide the text input — keep only the icon button */
          input {
            display: none;
          }

          /* Hide the outline border */
          fieldset {
            display: none;
          }

          svg {
            color: #ffffffff;
          }
        }
      }
    }
  }

  /* ---- Video modal ---- */
  .video_modal_overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.82);
    display: grid;
    place-items: center;
    z-index: 1500;
    backdrop-filter: blur(4px);
  }

  .video_modal_wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 10px;
    width: min(720px, 92vw);

    ${media.mobileLarge`
      width: 100vw;
      gap: 10px;
      padding: 0 12px;
    `}

    .modal_close {
      background: none;
      border: none;
      cursor: pointer;
      padding: 0;
      display: flex;
      opacity: 0.9;
      transition: opacity 0.2s, transform 0.15s;
      &:hover {
        opacity: 1;
        transform: scale(1.08);
      }
      svg {
        width: 36px;
        height: 36px;
        display: block;
      }
    }
  }

  .video_modal {
    width: 100%;
    aspect-ratio: 16 / 9;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 0 60px rgba(0,0,0,0.8);

    ${media.mobileLarge`
      border-radius: 0;
    `}

    iframe {
      width: 100%;
      height: 100%;
      border: none;
    }
  }

  /* ---- Play button in table ---- */
  .play_btn {
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
    display: grid;
    place-items: center;
    opacity: 0.8;
    transition: opacity 0.2s, transform 0.15s;
    &:hover {
      opacity: 1;
      transform: scale(1.15);
    }
    svg {
      display: block;
      width: 28px;
      height: 28px;
    }
  }

  .center {
    text-align: center;
    display: grid;
    place-items: center;
  }

  .page_table {
    padding: 24px 0 60px;
  }
`;

export default SingleChartPage;
