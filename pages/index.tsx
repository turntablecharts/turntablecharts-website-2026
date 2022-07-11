/* eslint-disable @next/next/no-img-element */
import Typography from "components/atoms/typography";
import Theme from "constants/Theme";
import media from "constants/MediaQuery";
import Head from "next/head";
import styled from "styled-components";
import CTAButton from "components/atoms/ctaButton";
import WantUpdates from "components/molecules/WantUpdates";
import Link from "next/link";
import PhotosCard from "components/molecules/PhotosCard";
import SongCard from "components/molecules/SongCard";
import JoinUs from "components/molecules/JoinUs";
import { getChartById } from "utility/ChartsApi/api";
import { ChartItem } from "utility/ChartsApi/types";
import { getNewsByPageNumber } from "utility/NewsApi/api";
import { NewsSummary } from "utility/NewsApi/types";
import { getPhotosByPageNumber } from "utility/PhotosApi/api";
import { PhotoItem } from "utility/PhotosApi/types";
import NewsCard from "components/molecules/NewsCard";

export async function getStaticProps() {
  const chartResponse = await getChartById(1);

  const newsResponse = await getNewsByPageNumber(1);

  const photoResponse = await getPhotosByPageNumber(1);

  return {
    props: {
      topChart: chartResponse.data.chartItems.slice(0, 10),
      topNews: newsResponse.data.news.slice(0, 10),
      topPhoto: photoResponse.data.filter((item) => !item.isDeleted),
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 7200, // In seconds
  };
}

const Home: React.FC<{
  topChart: ChartItem[];
  topNews: NewsSummary[];
  topPhoto: PhotoItem[];
}> = ({ topChart, topNews, topPhoto }) => {
  return (
    <IndexStyling>
      <Head>
        <title>TurnTable Charts - Music Charts, Insights & Analytics</title>
        <meta
          name="description"
          content="TurnTable Charts - Music Charts, Insights & Analytics"
        />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>

      <HeroStyling>
        <div className="hero_left">
          <div className="hero_left-text">
            <Typography.Heading
              fontType="Mermaid"
              level={1}
              className="heading"
            >
              TurnTable Charts brings to you the best performing{" "}
              <span className="yellow">artistes</span> and{" "}
              <span className="yellow">songs</span> every week
            </Typography.Heading>
            <Typography.Text
              weight="semiBold"
              className="subheading"
              fontType="SFProText"
            >
              Thousands of songs tracked weekly across radio and streaming
              platforms in Nigeria, just for you.
            </Typography.Text>
          </div>
          <div className="hero_left-cta">
            <CTAButton label="Explore the Charts" to="/charts" />
          </div>
        </div>
        <div className="hero_right">
          {/* <CardStack /> */}
          <img
            style={{ width: "400px" }}
            src="/assets/stackedhero.png"
            alt="hero"
          />
          {/* <Image className="hero_right-img" /> */}
        </div>
      </HeroStyling>
      <section className="charts">
        <div className="section_title">
          <Typography.Heading
            fontType="Mermaid"
            level={3}
            className="section_title-header"
          >
            This Week&apos;s Top10
          </Typography.Heading>
          <Link href="/charts">
            <a className="yellow">
              <Typography.Text
                fontType="SFProText"
                weight="medium"
                level="large"
              >
                Full Chart
              </Typography.Text>
            </a>
          </Link>
        </div>
        <div className="section_cards">
          {topChart.map((item) => (
            <SongCard key={item.id} songItem={item} />
          ))}
        </div>
        <span className="mobile_action">
          <Link href="/charts/1">
            <a className="yellow">
              <Typography.Text
                fontType="SFProText"
                weight="medium"
                level="medium"
              >
                See Full Chart
              </Typography.Text>
            </a>
          </Link>
        </span>
      </section>
      <JoinUs />
      <section className="featured" style={{ marginTop: "100px" }}>
        <div className="section_title">
          <Typography.Heading
            fontType="Mermaid"
            level={3}
            className="section_title-header"
          >
            Featured News Article
          </Typography.Heading>
          <Link href="/news">
            <a className="yellow">
              <Typography.Text
                fontType="SFProText"
                weight="medium"
                level="large"
              >
                See All
              </Typography.Text>
            </a>
          </Link>
        </div>
        <div className="section_cards">
          {topNews.map((item) => (
            <NewsCard key={item.id} newsItem={item} />
          ))}
        </div>
        <span className="mobile_action">
          <Link href="/news">
            <a className="yellow">
              <Typography.Text
                fontType="SFProText"
                weight="medium"
                level="medium"
              >
                See All
              </Typography.Text>
            </a>
          </Link>
        </span>
      </section>
      <section className="photos">
        <div className="section_title">
          <Typography.Heading
            fontType="Mermaid"
            level={3}
            className="section_title-header"
          >
            Photos
          </Typography.Heading>
          {/* <Link href="/photos">
            <a className="yellow">
              <Typography.Text
                fontType="SFProText"
                weight="medium"
                level="large"
              >
                See All
              </Typography.Text>
            </a>
          </Link> */}
        </div>
        <div className="section_cards">
          {topPhoto.map((item) => (
            <PhotosCard key={item.id} photoItem={item} />
          ))}
        </div>
      </section>
      <WantUpdates />
    </IndexStyling>
  );
};

export default Home;

const IndexStyling = styled.div`
  section {
    max-width: 1200px;
    width: 95%;
    margin: 0 auto;
    margin-bottom: 100px;

    &.charts {
      ${media.mobileLarge`
        margin-top: 70px;
      `}
    }

    .section_title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;

      &-header {
        font-size: ${Theme.fontSizes.xxlarge};

        ${media.mobileLarge`
        font-size: 1.25rem;
      `}
      }
    }

    .section_cards {
      display: grid;
      gap: 20px;
      row-gap: 40px;
      grid-template-columns: repeat(5, minmax(180px, 1fr));

      ${media.smallDesktop`
      grid-template-columns: repeat(4, minmax(180px, 1fr));
    `}
      ${media.tablet`
      grid-template-columns: repeat(3, minmax(180px, 1fr));
    `}
      ${media.mobileLarge`
      grid-template-columns: repeat(2, minmax(180px, 1fr));
    `}
    }

    .mobile_action {
      display: flex;
      justify-content: center;
      margin: 30px 0px;
      a {
        display: none;
        padding: 12px 16px;
        border-radius: 20px;
        border: 1px solid ${Theme.colorPalette.ttcYellow};

        ${media.mobileLarge`
          display: inline-block;
          justify-content: center;
        `}
      }
    }
  }
`;

const HeroStyling = styled.div`
  max-width: 1200px;
  width: 95%;
  margin: 0 auto;
  min-height: 60vh;
  display: flex;
  align-items: center;
  gap: 150px;

  ${media.mobileLarge`
  min-height: 40vh;

        `}

  .hero_left {
    flex: 1;
    &-cta {
      margin-top: 55px;
      button {
        all: unset;
        padding: 24px 48px;
        background-color: ${Theme.colorPalette.ttcYellow};
        color: ${Theme.colorPalette.black};
        border-radius: 36px;
        display: flex;
        align-items: center;
        gap: 10px;
        cursor: pointer;
      }
    }

    .heading {
      font-size: ${Theme.fontSizes.extralarge};
      line-height: 60px;
      ${media.mobileLarge`
      font-size: 24px;
      line-height: 28px;

        `}
    }
    .subheading {
      font-size: ${Theme.fontSizes.xlarge};
      letter-spacing: 1px;
      ${media.mobileLarge`
      font-size: 16px;
      margin-top: 10px;

        `}
    }
  }

  .hero_right {
    flex: 1;
  }

  ${media.smallDesktop`
    .hero_left {
      flex: 3;
    }
    .hero_right {
      flex: 2;
    }
  `}
  ${media.tablet`
    .hero_left {
      flex: 1;
    }
    .hero_right {
      display: none;
    }
  `}
`;
