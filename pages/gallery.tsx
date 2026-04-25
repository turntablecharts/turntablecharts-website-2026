import Typography from "components/atoms/typography";
import PhotosCard from "components/molecules/PhotosCard";
import media from "constants/MediaQuery";
import Theme from "constants/Theme";
import Head from "next/head";
import React from "react";
import styled from "styled-components";
import { getPhotosByPageNumber } from "utility/PhotosApi/api";
import { PhotoItem } from "utility/PhotosApi/types";

export async function getStaticProps() {
  try {
    const photoResponse = await getPhotosByPageNumber(1);
    return {
      props: {
        photos: photoResponse.data.filter((item) => !item.isDeleted),
      },
      revalidate: 3600,
    };
  } catch (error) {
    return {
      props: {
        photos: [],
      },
      revalidate: 3600,
    };
  }
}

const Gallery: React.FC<{ photos: PhotoItem[] }> = ({ photos }) => {
  return (
    <GalleryStyling>
      <Head>
        <title>Gallery | TurnTable Charts</title>
        <meta name="description" content="View the latest photos and captures from TurnTable Charts." />
      </Head>

      <div className="container">
        <header className="page_header">
          <Typography.Heading fontType="Nohemi" level={1} weight="black" className="heading">
            GALLERY
          </Typography.Heading>
          <Typography.Text fontType="WorkSans" weight="medium" className="subheading">
            Capturing the moments shaping Nigerian music
          </Typography.Text>
        </header>

        <div className="photo_grid">
          {photos.length > 0 ? (
            photos.map((photo, index) => (
              <div key={photo.id} className="photo_item">
                <PhotosCard photoItem={photo} featured={index % 5 === 0} />
              </div>
            ))
          ) : (
            <div className="no_photos">
               <Typography.Text>No photos available at the moment.</Typography.Text>
            </div>
          )}
        </div>
      </div>
    </GalleryStyling>
  );
};

export default Gallery;

const GalleryStyling = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: ${Theme.colorPalette.black};
  padding-top: 120px;
  padding-bottom: 100px;

  .container {
    max-width: 1300px;
    width: 90%;
    margin: 0 auto;
  }

  .page_header {
    text-align: center;
    margin-bottom: 80px;

    .heading {
      color: ${Theme.colorPalette.white};
      font-size: 5rem;
      margin-bottom: 1rem;
      letter-spacing: -2px;

      ${media.tablet`
        font-size: 3.5rem;
      `}
      ${media.mobileLarge`
        font-size: 2.5rem;
      `}
    }

    .subheading {
      color: ${Theme.colorPalette.textGrey};
      font-size: 1.1rem;
      text-transform: uppercase;
      letter-spacing: 2px;
    }
  }

  .photo_grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;

    ${media.tablet`
      grid-template-columns: repeat(2, 1fr);
    `}

    ${media.mobileLarge`
      grid-template-columns: 1fr;
    `}
  }

  .photo_item {
    aspect-ratio: 1 / 1;
    overflow: hidden;
    
    &:nth-child(5n + 1) {
       grid-column: span 2;
       grid-row: span 2;

       ${media.mobileLarge`
        grid-column: span 1;
        grid-row: span 1;
       `}
    }
  }

  .no_photos {
    grid-column: 1 / -1;
    text-align: center;
    padding: 60px;
    color: ${Theme.colorPalette.textGrey};
  }
`;
