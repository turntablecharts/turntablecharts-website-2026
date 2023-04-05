/* eslint-disable @next/next/no-img-element */
import Typography from 'components/atoms/typography';
import media from 'constants/MediaQuery';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { getAllMagazineEditions } from 'utility/MagazinesApi/api';
import { MagazineEditions } from 'utility/MagazinesApi/types';

export async function getStaticProps() {
  const magazineResponse = await getAllMagazineEditions();

  return {
    props: {
      magazineEditions: magazineResponse.data,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 3600, // In seconds
  };
}

const cardSize = [
  // "medium",
  'large',
];

const Magazine: React.FC<{ magazineEditions: MagazineEditions[] }> = ({ magazineEditions }) => {
  return (
    <MagazinePageStyling>
      <Head>
        <title>TurnTable Charts | Magazine</title>
        <meta name="description" content="TurnTable Charts - News This Week" />
      </Head>
      <div className="page_header">
        <Typography.Title>Magazine Editions</Typography.Title>
      </div>
      <div className="page_cards">
        {magazineEditions.reverse().map((edition) => {
          return (
            <div key={edition.id} className={`card ${cardSize[Math.floor(Math.random() * cardSize.length)]}`}>
              <img src={edition.coverImageUrl} alt="image" />
              <div className="middle">
                <Link href={`/magazine/${edition.name}`}>
                  <a>
                    <Typography.Text fontType="Mermaid" style={{ lineHeight: '24px' }} level="xlarge">
                      Explore
                    </Typography.Text>
                  </a>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </MagazinePageStyling>
  );
};

export default Magazine;

const MagazinePageStyling = styled.div`
  max-width: 1200px;
  width: 95%;
  margin: 0 auto;
  .page_header {
    padding: 7vh 0;
    text-align: center;

    h1 {
      font-size: 64px;
    }
    ${media.tablet`
      h1 {
        font-size: 50px;

      }
    `}
  }

  .page_cards {
    display: grid;
    /* grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); */
    grid-template-columns: 1fr 1fr 1fr;
    grid-auto-rows: 100px;
    grid-auto-flow: dense;
    grid-gap: 15px;

    ${media.tablet`
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    `}
  }

  .card {
    /* max-width: 400px; */
    position: relative;
    display: flex;
    height: 100%;
    width: 100%;
    grid-column: auto / span 1;
    &:hover img,
    &:active img {
      opacity: 0.4;
    }

    &:hover .middle,
    &:active .middle {
      opacity: 1;
      p {
        text-decoration: underline;
      }
    }
    img {
      opacity: 1;
      display: block;
      width: 100%;
      height: auto;
      transition: 1s ease;
      backface-visibility: hidden;
      -o-object-fit: cover;
      object-fit: cover;
      object-position: top;
    }
    .middle {
      transition: 1s ease;
      opacity: 0;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%);
      text-align: center;
    }
  }
  .large {
    grid-row: span 5;
  }

  .medium {
    grid-row: span 3;
  }
`;
