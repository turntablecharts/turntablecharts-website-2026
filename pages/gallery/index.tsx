import Typography from "components/atoms/typography";
import PhotosCard from "components/molecules/PhotosCard";
import media from "constants/MediaQuery";
import { headingMixin } from "constants/mixins";
import Theme from "constants/Theme";
import Head from "next/head";
import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { getPhotosByPageNumber } from "utility/PhotosApi/api";
import { PhotoItem } from "utility/PhotosApi/types";

export async function getStaticProps() {
  const photoResponse = await getPhotosByPageNumber(1);
  return {
    props: {
      initialPhotos: photoResponse.data.galleries.filter((item) => item.galleryType === 2),
      totalItems: photoResponse.data.totalItems,
    },
    revalidate: 3600,
  };
}

const GalleryPage: React.FC<{ initialPhotos: PhotoItem[]; totalItems: number }> = ({ initialPhotos, totalItems }) => {
  const [allPhotos, setAllPhotos] = useState<PhotoItem[]>(initialPhotos);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const [hasMore, setHasMore] = useState(initialPhotos.length < totalItems);

  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const loadMore = useCallback(async () => {
    if (isFetching || !hasMore) return;
    setIsFetching(true);
    try {
      const nextPage = currentPage + 1;
      const res = await getPhotosByPageNumber(nextPage);
      const newPhotos = res.data.galleries.filter((item) => item.galleryType === 2);
      
      if (newPhotos.length === 0) {
        setHasMore(false);
      } else {
        setAllPhotos((prev) => [...prev, ...newPhotos]);
        setCurrentPage(nextPage);
      }
    } catch (err) {
      setHasMore(false);
    } finally {
      setIsFetching(false);
    }
  }, [isFetching, hasMore, currentPage]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { rootMargin: "400px" }
    );
    if (sentinelRef.current) observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [loadMore]);

  return (
    <GalleryStyling>
      <Head>
        <title>Gallery | TurnTable Charts</title>
        <meta name="description" content="TurnTable Charts Official Photo Gallery" />
      </Head>

      <div className="page_header">
        <Typography.Heading level={1} className="main_title">
          TURNTABLE GALLERY
        </Typography.Heading>
      </div>

      <div className="gallery_grid">
        {allPhotos.map((photo) => (
          <div key={photo.id} className="grid_item">
            <PhotosCard photoItem={photo} />
          </div>
        ))}
      </div>

      <div ref={sentinelRef} className="sentinel" />

      {isFetching && (
        <div className="loading_indicator">
          <Typography.Text fontType="HostGrotesk" color="white" weight="medium">
            Loading more art...
          </Typography.Text>
        </div>
      )}
    </GalleryStyling>
  );
};

export default GalleryPage;

const GalleryStyling = styled.div`
  min-height: 100vh;
  background-color: #000;
  padding: 140px 60px 100px;
  
  ${media.tablet`
    padding: 100px 24px 60px;
  `}

  .page_header {
    text-align: center;
    margin-bottom: 80px;
    
    .main_title {
      ${headingMixin}
      color: white;
      font-size: clamp(3rem, 10vw, 8rem);
    }
    
    ${media.mobileLarge`
      margin-bottom: 40px;
    `}
  }

  .gallery_grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: 450px;
    gap: 12px;
    
    /* Variable item sizing for a more dynamic "original pictures" feel */
    .grid_item:nth-child(5n + 1) {
      grid-column: span 2;
      grid-row: span 1;
    }
    
    .grid_item:nth-child(7n + 2) {
      grid-column: span 1;
      grid-row: span 2;
    }

    ${media.tablet`
      grid-template-columns: repeat(2, 1fr);
      grid-auto-rows: 350px;
      
      .grid_item:nth-child(n) {
        grid-column: span 1 !important;
        grid-row: span 1 !important;
      }
    `}

    ${media.mobileLarge`
       grid-template-columns: 1fr;
       grid-auto-rows: 400px;
    `}
  }

  .sentinel {
    height: 40px;
    width: 100%;
  }

  .loading_indicator {
    padding: 40px;
    text-align: center;
  }
`;
