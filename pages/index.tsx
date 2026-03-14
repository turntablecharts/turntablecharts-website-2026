/* eslint-disable @next/next/no-img-element */
import Typography from 'components/atoms/typography';
import Theme from 'constants/Theme';
import media from 'constants/MediaQuery';
import Head from 'next/head';
import styled from 'styled-components';
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
      topPhoto: photoResponse.data.filter((item) => !item.isDeleted),
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

      <HeroStyling>
        <div className="hero_container">
          <div className="hero_top">
            <TTCIconDisc className="disc_image" />
            <Typography.Text fontType='OpenSans' weight="semiBold" className='subheading'>Nigeria’s No.1 charting platform</Typography.Text>
          </div>
          <div className="hero_middle">
            <Typography.Heading fontType="RobotoFlex" level={1} weight="extraBold" className="heading">
              Nigeria&apos;s Official
            </Typography.Heading>
            <Typography.Heading fontType="RobotoFlex" level={1} weight="extraBold" className="heading">
              Music Chart
            </Typography.Heading>

          </div>

          <Typography.Text weight="semiBold" className="subheading" fontType="OpenSans">
            The top performing producers acrosss all streaming platforms
            <br />
            and airplay this week.
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
          <Typography.Heading fontType="RobotoFlex" level={1} weight="extraBold" className='heading' >
            Official Nigeria Top 100
          </Typography.Heading>
          <Typography.Text weight="semiBold" className="subheading" fontType="OpenSans">
            The top performing producers acrosss all streaming platforms
            <br />
            and airplay this week.
          </Typography.Text>
        </div>
        <div className="section_cards">
          <SongCard key={topChart[0].id} songItem={topChart[0]} variant="large" />
          <div className="compact_scroll">
            {topChart.slice(1).map((item) => (
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
      <Marquee variant='yellow' />
      <section className="featured">
        <div className="section_title">
          <Typography.Heading fontType="Anton" level={3} className="section_title-header">
            Featured News Articles
          </Typography.Heading>

        </div>
        <div className="news_cards">
          {topNews.slice(0, 5).map((item, index) => (
            <NewsCard key={item.id} newsItem={item} variant={index === 0 ? 'large' : 'compact'} darkBg />
          ))}
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
          <Typography.Heading fontType="RobotoFlex" level={1} weight="extraBold" className='heading' >
            Industry Digest Weekly
          </Typography.Heading>
          <Typography.Text weight="semiBold" className="subheading" fontType="OpenSans">
            Thousands of songs tracked weekly across radio and
            <br />
            streaming platforms in Nigeria, just for you.
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
        <span className="mobile_action">

          <CTAButton label="Read More" to="/magazine" />
        </span>
      </section>
      <Marquee variant='green' />
      <section className="featured">
        <div className="section_title">
          <Typography.Heading fontType="RobotoFlex" level={1} weight="extraBold" className='heading' >
            MAGAZINE EDITIONS
          </Typography.Heading>
          <Typography.Text weight="semiBold" className="subheading" fontType="OpenSans">
            Thousands of songs tracked weekly across radio and
            <br />
            streaming platforms in Nigeria, just for you.
          </Typography.Text>
        </div>
        <div className='magazine_slider'>
          <MagazineSlider magazines={topMagazines} />
        </div>
        <span className="mobile_action">

          <CTAButton label="Explore Magazines" to="/magazine" />
        </span>
      </section>
      {/* <section className="photos">
        <div className="photo_cards">
          {topPhoto.slice(0, 8).map((item, index) => (
            <PhotosCard key={item.id} photoItem={item} featured={index === 1} />
          ))}
        </div>
      </section> */}

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
    font-family: 'Roboto Flex', sans-serif;
    font-size: 70px;
    font-weight: 850;
    text-transform: uppercase;
    line-height: 0.9;
    text-align: center;
    width: 100%;
    letter-spacing: -2.5px;
    
    ${media.smallDesktop`
      font-size: 2rem;
      line-height: 1.2;
    `}
    
    ${media.tablet`
      font-size: 2.6rem;
      line-height: 1.2;
    `}
    
    ${media.mobileLarge`
      font-size: 2.3rem;
      line-height: 1.3;
    `}
    
    ${media.mobile`
      font-size: 2rem;
      line-height: 1.3;
    `}
  }

  .section_title-header {
    font-size: 70px;
    font-weight: 400;
    text-transform: uppercase;
    line-height: 0.9;
    text-align: center;
    width: 100%;

    
    ${media.smallDesktop`
      font-size: 2rem;
      line-height: 1.2;
    `}
    
    ${media.tablet`
      font-size: 2.6rem;
      line-height: 1.2;
    `}
    
    ${media.mobileLarge`
      font-size: 2.3rem;
      line-height: 1.3;
    `}
    
    ${media.mobile`
      font-size: 2rem;
      line-height: 1.3;
    `}
  }
    }
 .heading {
    font-family: 'Roboto Flex', sans-serif;
    font-size: 5rem;
    font-weight: 850;
    text-transform: uppercase;
    line-height: 0.9;
    text-align: center;
    width: 100%;
    letter-spacing: -2.5px;
    
    ${media.smallDesktop`
      font-size: 4rem;
      line-height: 1.2;
    `}
    
    ${media.tablet`
      font-size: 2.6rem;
      line-height: 1.2;
    `}
    
    ${media.mobileLarge`
      font-size: 3rem;
      line-height: 1.3;
    `}
    
    ${media.mobile`
      font-size: 3rem;
      line-height: 1.3;
    `}
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
      letter-spacing: 0.3px;
      margin-top: 3px;
    `}
        ${media.mobile`
      font-size: 10px;
      letter-spacing: 0.3px;
      margin-top: 3px;
    `}
  }

    .section_cards {
      display: grid;
      gap: 8px;
      grid-template-columns: 1.2fr 1fr;
      grid-template-rows: 1fr;
      align-items: stretch;
      margin-bottom: 40px;

      /* Large card fills the full height of the grid row */
      > *:first-child {
        grid-row: 1;
        grid-column: 1;
        height: 100%;
        max-height: 600px;
      }

      /* Scrollable compact list — sits in column 2 */
      .compact_scroll {
        grid-column: 2;
        grid-row: 1;
        overflow-y: auto;
       
        /* Show ~5 compact items (each ~83px tall incl. padding) before scrolling */
        height: 580px;
        display: flex;
        flex-direction: column;
     
        scroll-behavior: smooth;
       

        /* Thin styled scrollbar */
        scrollbar-width: thin;
        scrollbar-color: rgba(255,255,255,0.2) transparent;

        &::-webkit-scrollbar {
          width: 4px;
        }
        &::-webkit-scrollbar-track {
          background: transparent;
        }
        &::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.2);
          border-radius: 4px;
        }
      }

      ${media.smallDesktop`
        gap: 8px;
      `}
      ${media.tablet`
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: auto;
        gap: 8px;
        align-items: start;

        > *:first-child {
          grid-row: auto;
          grid-column: 1;
          min-height: unset;
        }

        .compact_scroll {
          grid-column: 2;
          grid-row: 1;
          /* On tablet each card is a square ~280px; show ~2 rows */
          max-height: 480px;
          overflow-y: auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
          align-content: start;
        }
      `}
      ${media.mobileLarge`
        display: none !important;
      `}
    }

    .section_cards_mobile {
      display: none;

      ${media.mobileLarge`
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 8px;
        align-items: start;
        margin-bottom: 24px;
      `}
    }
    .news_cards {
      display: grid;
      gap: 20px;
      grid-template-columns: repeat(4, 1fr);
      grid-auto-rows: auto;

      > *:first-child {
        grid-column: 1 / -1;
      }

      ${media.smallDesktop`
        gap: 15px;
        grid-template-columns: repeat(4, 1fr);
      `}
      ${media.tablet`
        grid-template-columns: repeat(2, 1fr);
        gap: 15px;
        
        > *:first-child {
          grid-column: 1 / -1;
        }
      `}
      ${media.mobileLarge`
        grid-template-columns: 1fr;
        
        > *:first-child {
          grid-column: auto;
        }
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
        height: 300px;
        margin: 20px 0;
        flex-direction: column;
      `}

      img {
        width: 75%;
        height: 600px;
        display: block;
        object-fit: cover;
        
        ${media.tablet`
          width: 70%;
          height: 400px;
        `}
        
        ${media.mobileLarge`
          width: 100%;
          height: 200px;
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
      grid-template-columns: repeat(auto-fit, 350px);
      grid-auto-rows: 400px;
      gap: 8px;
      width: 100%;
      padding: 0;
      justify-content: center;

      ${media.tablet`
        grid-template-columns: repeat(auto-fit, 350px);
        grid-auto-rows: 400px;
        gap: 8px;
        padding: 0 1rem;
      `}

      ${media.mobileLarge`
        display: flex;
        overflow-x: auto;
        scroll-snap-type: x mandatory;
        gap: 0;
        padding: 0;
        -webkit-overflow-scrolling: touch;
        scrollbar-width: none;
        
        &::-webkit-scrollbar {
          display: none;
        }
        
        > * {
          flex: 0 0 100%;
          width: 100%;
          height: 400px;
          scroll-snap-align: start;
        }
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

const HeroStyling = styled.div`
  width: 100%;
  min-height: 60vh;
  display: flex;
  align-items: center;
  height: 100vh;
  background-image: url('/assets/HeroBG.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  
  ${media.tablet`
    min-height: 50vh;
    height: 70vh;
  `}
  
  ${media.mobileLarge`
    min-height: 60vh;
    height: 80vh;
  `}

  .hero_container {
    width: 859px;
    max-width: 90%;
    height: auto;
    transform: rotate(0deg);
    opacity: 1;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 1rem;
    
    ${media.smallDesktop`
      max-width: 85%;
      gap: 28px;
    `}
    
    ${media.tablet`
      max-width: 90%;
      gap: 24px;
      padding: 20px;
    `}
    
    ${media.mobileLarge`
      max-width: 95%;
      gap: 20px;
      padding: 15px;
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
    }
    ${media.mobileLarge`
      padding: 3px;
      gap: 6px;
      
      svg {
        width: 20px;
        height: 20px;
      }
    `}
  }
  
  .hero_middle {
    text-align: center;
   
    width: auto;
    ${media.mobileLarge`
      width: 100%;
    `}
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
    font-family: 'Roboto Flex', sans-serif;
    font-size: 5rem;
    font-weight: 850;
    text-transform: uppercase;
    line-height: 0.9;
    text-align: center;
    width: 100%;
    letter-spacing: -2.5px;
    
    ${media.smallDesktop`
      font-size: 4rem;
      line-height: 1.2;
    `}
    
    ${media.tablet`
      font-size: 2.6rem;
      line-height: 1.2;
    `}
    
    ${media.mobileLarge`
      font-size: 3rem;
      line-height: 1.3;
    `}
    
    ${media.mobile`
      font-size: 3rem;
      line-height: 1.3;
    `}
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
      letter-spacing: 0.3px;
      margin-top: 3px;
    `}
        ${media.mobile`
      font-size: 10px;
      letter-spacing: 0.3px;
      margin-top: 3px;
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
