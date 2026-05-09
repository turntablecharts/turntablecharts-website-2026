/* eslint-disable @next/next/no-img-element */
import Typography from 'components/atoms/typography';
import Theme from 'constants/Theme';
import media from 'constants/MediaQuery';
import Head from 'next/head';
import styled, { keyframes } from 'styled-components';
import { baseHeading, headingMixin, heroHeadingMixin } from 'constants/mixins';
import CTAButton from 'components/atoms/ctaButton';
import WantUpdates from 'components/molecules/WantUpdates';
import Link from 'next/link';
import PhotosCard from 'components/molecules/PhotosCard';
import MobileSongCard from 'components/molecules/MobileSongCard';
import JoinUs from 'components/molecules/JoinUs';
import { getChartById } from 'utility/ChartsApi/api';
import { ChartItem } from 'utility/ChartsApi/types';
import { getNewsByPageNumber } from 'utility/NewsApi/api';
import { NewsSummary } from 'utility/NewsApi/types';
import { getPhotosByPageNumber } from 'utility/PhotosApi/api';
import { PhotoItem } from 'utility/PhotosApi/types';
import NewsCard from 'components/molecules/NewsCard';
import HeroWav from 'assets/icons/heroWav.svg';
import TTCIconDisc from 'assets/icons/disc.svg';
import Marquee from 'components/molecules/Marquee';
import RectangleGrad from 'assets/RectangleGrad.png';
import { getAllMagazineEditions } from 'utility/MagazinesApi/api';
import { MagazineEditions } from 'utility/MagazinesApi/types';
import MagazineSlider from 'components/molecules/MagazineSlider';
import SongCard from 'components/molecules/SongCard';
import { SITE_CONFIG } from 'constants/SiteConfig';


export async function getStaticProps() {
  const chartResponse = await getChartById(1);

  const newsResponse = await getNewsByPageNumber(1);

  const photoResponse = await getPhotosByPageNumber(1);

  const magazinesResponse = await getAllMagazineEditions();

  // Sort magazines by ID descending to get the latest ones
  const sortedMagazines = magazinesResponse.data.sort((a, b) => b.id - a.id);

  return {
    props: {
      topChart: chartResponse.data.chartItems.slice(0, 10),
      topNews: newsResponse.data.news.slice(0, 10),
      topPhoto: photoResponse.data.galleries.filter((item) => item.galleryType === 2),
      topMagazines: sortedMagazines, // Get all magazines
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 3600, // In seconds
  };
}



const Home: React.FC<{
  topChart: ChartItem[];
  topNews: NewsSummary[];
  topPhoto: PhotoItem[];
  topMagazines: MagazineEditions[];
}> = ({ topChart, topNews, topPhoto, topMagazines }) => {
  return (
    <IndexStyling>
      <Head>
        <title>TurnTable Charts - Music Charts, Insights & Analytics</title>
        <meta name="description" content="TurnTable Charts - Music Charts, Insights & Analytics" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>

      <HeroStyling $bgImage={SITE_CONFIG.homepage.heroImage}>
        <div className="hero_container">
          <div className="hero_top">
            <TTCIconDisc className="disc_image" />
            <Typography.Text fontType='OpenSans' weight="semiBold" className='subheading2'>Nigeria&apos;s No. 1 Music Charting Platform</Typography.Text>
          </div>
          <div className="hero_middle">
            <Typography.Heading fontType="Nohemi" level={1} weight="black" className="heading">
              Nigeria&apos;s Official
            </Typography.Heading>
            <Typography.Heading fontType="Nohemi" level={1} weight="black" className="heading">
              Music Chart
            </Typography.Heading>

          </div>

          <Typography.Text weight="semiBold" className="subheading" fontType="OpenSans">
            TurnTable Charts brings to you the best performing songs, artistes, albums and producers
            <br />
            tracked across radio and streaming platforms in Nigeria every week.
          </Typography.Text>
          <CTAButton label="Explore the Charts" to="/charts" />
        </div>

        <div className="hero_wave">
          <HeroWav preserveAspectRatio="none" />
        </div>
      </HeroStyling>

      <section className="charts">
        <div className="section_title">
          {/* <Typography.Heading fontType="Anton" level={3} className="section_title-header">
            This Week&apos;s Top10
          </Typography.Heading> */}
          <Typography.Heading fontType="Nohemi" level={1} weight="black" className='heading' >
            Official Nigeria Top 100
          </Typography.Heading>
          <Typography.Text weight="semiBold" className="subheading" fontType="OpenSans">
            The top performing songs across radio and streaming platforms in Nigeria this week.
          </Typography.Text>
        </div>
        <div className="section_cards">
          {topChart.length > 0 && (
            <SongCard songItem={topChart[0]} variant="large" />
          )}
          <div className="compact_list">
            {topChart.map((item) => (
              <SongCard key={item.id} songItem={item} variant="compact" />
            ))}
          </div>
        </div>
        {/* Mobile-only grid — completely separate from the desktop grid */}
        <div className="section_cards_mobile">
          {topChart.map((item) => (
            <MobileSongCard key={`m-${item.id}`} songItem={item} />
          ))}
        </div>
        <span className="mobile_action">
          <CTAButton label="Explore the Charts" to="/charts" />

        </span>

      </section>
      <Marquee variant='yellow' chartType='flagship' />
      <section className="featured">
        <div className="section_title">
          <Typography.Heading fontType="Nohemi" level={1} weight="black" className="heading">
            Featured News
          </Typography.Heading>
        </div>
        <div className="news_cards">
          <NewsCard
            newsItem={topNews[0]}
            variant="large"
            accentColor={(() => {
              const NEWS_ACCENT_COLORS = [
                Theme.colorPalette.ttcBlue,
                Theme.colorPalette.ttcOrange,
                Theme.colorPalette.ttcGreen,
                Theme.colorPalette.ttcDarkGreen,
                Theme.colorPalette.ttcRed,
              ];
              return NEWS_ACCENT_COLORS[topNews[0].id % NEWS_ACCENT_COLORS.length];
            })()}
          />
          <div className="compact_news_cards">
            {topNews.slice(1, 5).map((item) => (
              <NewsCard key={item.id} newsItem={item} variant="compact" />
            ))}
          </div>
        </div>
        <span className="mobile_action">
          <CTAButton label="Read More News" to="/news" />

        </span>
      </section>
      <section className="featured">
        <div className="section_title">
          {/* <Typography.Heading fontType="Anton" level={3} className="section_title-header">
            This Week&apos;s Top10
          </Typography.Heading> */}
          <Typography.Heading fontType="Nohemi" level={1} weight="black" className='heading' >
            Industry Digest
          </Typography.Heading>
          <Typography.Text weight="semiBold" className="subheading" fontType="OpenSans">
            TurnTable Chart&apos;s quarterly issue delivering robust data, insights, and context on
            <br />
            the albums, songs, artistes, and labels shaping Nigerian music.
          </Typography.Text>
        </div>
        <div className="digest_content">
          <img src={RectangleGrad.src} alt="Industry Digest" />
          <div className="green_fill">
            <Typography.Text className='p_text' fontType='WorkSans' weight='medium' level="small">
              Insights, data, and stories highlighting the
              <br />albums, songs, artistes, and labels shaping
              <br /> Nigerian music today
            </Typography.Text>
          </div>
        </div>
        {/* <span className="mobile_action">
          <CTAButton label="Download the Report" to="/" />
        </span> */}
      </section>
      <Marquee variant='green' chartType='genre' />
      <section className="featured">
        <div className="section_title">
          <Typography.Heading fontType="Nohemi" level={1} weight="black" className='heading' >
            TURNTABLE MAGAZINE
          </Typography.Heading>
          <Typography.Text weight="semiBold" className="subheading" fontType="OpenSans">
            TurnTable Magazine is an annual documentation of the unique expressions of Nigerian music
            <br />
            shaped by the charts and the people behind them.
          </Typography.Text>
        </div>
        <div className='magazine_slider'>
          <MagazineSlider magazines={topMagazines} />
        </div>
        <span className="mobile_action">
          <CTAButton label="Explore TurnTable Magazine" to="/magazine" />
        </span>
      </section>
      <section className="photos">

        <div className="photo_cards">
          {topPhoto.slice(0, 8).map((item) => (
            <div key={item.id} className="grid_item">
              <PhotosCard photoItem={item} />
            </div>
          ))}
        </div>

      </section>

    </IndexStyling>
  );
};

export default Home;

const IndexStyling = styled.div`
  overflow-x: hidden;
  max-width: 100vw;
  
  section {
    max-width: 1200px;
    width: 95%;
    margin: 0 auto;
    margin-bottom: 100px;
    padding: 3rem;

    ${media.tablet`
      padding: 2rem 1.5rem;
      width: 100%;
      margin-bottom: 60px;
    `}
    
    ${media.mobileLarge`
      padding: 1.5rem 1rem;
      width: 100%;
      margin-bottom: 50px;
    `}

    &.charts {
      ${media.mobileLarge`
        margin-top: 70px;
      `}
      ${media.tabletMin`
      margin-top: 40px;
    `}
    }

    &.photos {
      max-width: 100%;
      width: 100%;
      padding: 3rem 0;
      
      ${media.mobileLarge`
        padding: 1.5rem 0;
      `}
    }

    .section_title {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-bottom: 20px;
      gap: 10px;
      padding: 2rem 0;
      text-align: center;
      .heading {
  ${headingMixin}
      font-size: 70px;
    
    ${media.smallDesktop`
      font-size: 2rem;
      line-height: 1.2;
    `}
    
    ${media.tablet`
      font-size: 2.6rem;
      line-height: 1.2;
    `} 
    
    
  }
    .subheading {
    font-size: ${Theme.fontSizes.large};
    letter-spacing: -2.5%;
    text-align: center;
    
    ${media.tablet`
      font-size: 0.875rem;
    letter-spacing: -2.5%;
    `}
    
    ${media.mobileLarge`
      font-size: 12px;
      line-height: 1.6;
    letter-spacing: -2.5%;
      margin-top: 3px;
      
      br {
        display: none;
      }
    `}
    ${media.mobile`
      font-size: 12px;
      line-height: 1.6;
    letter-spacing: -2.5%;
      margin-top: 3px;
      
      br {
        display: none;
      }
    `}
  }

  .section_title-header {
    ${baseHeading}
     
  }
    }

    .section_cards {
      display: grid;
      gap: 8px;
      grid-template-columns: auto 1fr;
      align-items: start;
      margin-bottom: 40px;

      /* Tablet: hide large hero card, show compact list as 2-col grid */
      ${media.smallDesktop`
        grid-template-columns: 1fr;

        .large { display: none; }

        .compact_list {
          height: auto;
          max-height: none;
          overflow: visible;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 4px;
        }
      `}

      ${media.mobileLarge`
        display: none;
      `}
    }

    .compact_list {
      height: 657px;
      display: flex;
      flex-direction: column;
      overflow: hidden;

      > * {
        flex: 1;
      }

      /* Desktop: rank 1 already shown in large card, hide it here */
      > *:first-child {
        display: none;
      }

      /* Tablet: large card hidden, so show rank 1 in the list */
      ${media.smallDesktop`
        > *:first-child { display: flex; }
      `}
    }

    .section_cards_mobile {
      display: none;

      ${media.mobileLarge`
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 8px;
        margin-bottom: 32px;
      `}
    }
    .news_cards {
      display: flex;
      flex-direction: column;
      gap: 20px;

      .compact_news_cards {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 20px;

        ${media.tablet`
          grid-template-columns: repeat(2, 1fr);
          gap: 15px;
        `}

        ${media.mobileLarge`
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        `}
      }

      ${media.tablet`
        gap: 15px;
      `}

      ${media.mobileLarge`
        gap: 12px;
      `}
    }

    .digest_content {
      position: relative;
      width: 100%;
      margin: 40px 0;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 600px;
      overflow: hidden;
      
      ${media.tablet`
        height: 400px;
        margin: 30px 0;
      `}
      
      ${media.mobileLarge`
        height: 500px;
        margin: 20px 0;
        flex-direction: column;
      `}

      img {
        width: 75%;
        height: 100%;
        display: block;
        object-fit: cover;
        
        ${media.tablet`
          width: 70%;
          height: 400px;
        `}
        
        ${media.mobileLarge`
          width: 100%;
          height: 100%;
        `}
      }

      .green_fill {
        background-color: ${Theme.colorPalette.ttcGreen};
        padding: 30px 10px;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: center;
        
        ${media.mobileLarge`
          width: 100%;
          height: auto;
          padding: 20px 15px;
          justify-content: center;
        `}
        
        .p_text {
          color: white;
          text-align: start;
          
          ${media.mobileLarge`
            font-size: 12px;
            text-align: center;
            
            br {
              display: none;
            }
          `}
        }
      }
    }


    .photo_cards {
      display: grid;
      grid-template-columns: repeat(4, 360px);
      grid-auto-rows: 398px;
      gap: 12px;
      width: 100%;
      padding: 0;
      justify-content: center;

      ${media.tablet`
        grid-template-columns: repeat(2, 360px);
        grid-auto-rows: 398px;
      `}

      ${media.mobileLarge`
        grid-template-columns: 360px;
        grid-auto-rows: auto;
        justify-content: center;
      `}
    }

    .mobile_action {
      display: flex;
      justify-content: center;
      margin: 56px 0 20px;
      }
    }
  }
`;


const spin = keyframes`
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
`;

const HeroStyling = styled.div<{ $bgImage: string }>`
  width: 100%;
  min-height: 60vh;
  display: flex;
  align-items: center;
  height: 100vh;
  background-image: url(${props => props.$bgImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  
  ${media.tablet`
    height: 70vh;
    `}
  
  ${media.mobileLarge`
    height: 90vh;
  `}

  .hero_container {
    width: 100%;
    max-width: 90%;
    max-height: 427px;
    opacity: 1;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 20px;

    ${media.smallDesktop`
      max-width: 85%;
      gap: 16px;
    `}

    ${media.tablet`
      max-width: 90%;
      max-height: 427px;
      gap: 14px;
      padding: 20px;
    `}

    ${media.mobileLarge`
      max-width: 95%;
      max-height: none;
      gap: 24px;
      padding: 15px;
      height: 80%;
      justify-content: center;
    `}
  }
  
  .hero_top {
    display: flex;
    align-items: center;
    gap: 10px;
    border-radius: 50px;
    border: 1px solid ${Theme.colorPalette.white};
    padding: 5px;

    .disc_image{
      width: 37px;
      height: 37px;
      animation: ${spin} 6s linear infinite;
    }
    ${media.mobileLarge`
      padding: 3px;
      gap: 6px;
      width: 80%;
      justify-content: space-evenly;
      svg {
        width: 20px;
        height: 20px;
      }
        .subheading2{
          font-size: 12px;
        }
    `}
  }
  
  .hero_middle {
    text-align: center;
   
    width: auto;
    ${media.mobileLarge`
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 5px;
      justify-content: center;
    `}
  }
  .hero_middle .heading {
    ${heroHeadingMixin}
  }
  .hero_wave {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 60px;
    width: 100%;
    max-width: 100vw;
    overflow: hidden;
  
    
    svg {
      width: 100%;
      height: 60px;
      display: block;
      z-index: 2000;
      object-fit: fill;

    }
    
    ${media.mobileLarge`
      height: 50px;
      
      svg {
        height: 50px;
        width: 1440px;
        min-width: 100%;
        object-fit: none;
        object-position: left;
      }
    `}
  }
  .heading {
    ${headingMixin}
  }
  
  .subheading {
    font-size: ${Theme.fontSizes.large};
    letter-spacing: 1px;
    text-align: center;
    
    ${media.tablet`
      font-size: 0.875rem;
      letter-spacing: 0.5px;
    `}
    
    ${media.mobileLarge`
      font-size: 12px;
      line-height: 1.6;
      letter-spacing: 0.3px;
      margin-top: 3px;
      
      br {
        display: none;
      }
    `}
    ${media.mobile`
      font-size: 12px;
      line-height: 1.6;
      letter-spacing: 0.3px;
      margin-top: 3px;
      
      br {
        display: none;
      }
    `}
  }
   
  .hero_right {
    /* flex: 1; */
    img {
      width: 400px;
    }
  }
 

  ${media.smallDesktop`
    .hero_left {
      flex: 3;
    }
    .hero_right {
      /* flex: 2; */
      img {
        width: 250px;
      }
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
