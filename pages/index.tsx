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
      topNews: newsResponse.data.news,
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
              style={{
                fontSize: Theme.fontSizes.extralarge,
                lineHeight: "60px",
              }}
            >
              TurnTable Charts brings to you the best performing{" "}
              <span className="yellow">artistes</span> and{" "}
              <span className="yellow">songs</span> every week
            </Typography.Heading>
            <Typography.Text
              level="xlarge"
              weight="semiBold"
              fontType="SFProText"
              style={{ letterSpacing: "1px" }}
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
            style={{
              fontSize: Theme.fontSizes.xxlarge,
            }}
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
      </section>
      <JoinUs />
      <section className="featured" style={{ marginTop: "100px" }}>
        <div className="section_title">
          <Typography.Heading
            fontType="Mermaid"
            level={3}
            style={{
              fontSize: Theme.fontSizes.xxlarge,
            }}
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
      </section>
      <section className="photos">
        <div className="section_title">
          <Typography.Heading
            fontType="Mermaid"
            level={3}
            style={{
              fontSize: Theme.fontSizes.xxlarge,
            }}
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
