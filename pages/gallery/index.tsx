import Typography from "components/atoms/typography";
import PhotosCard from "components/molecules/PhotosCard";
import media from "constants/MediaQuery";
import { headingMixin } from "constants/mixins";
import Head from "next/head";
import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { getPhotosByPageNumber } from "utility/PhotosApi/api";
import { PhotoItem } from "utility/PhotosApi/types";

export async function getStaticProps() {
  const photoResponse = await getPhotosByPageNumber(1);
  const all = photoResponse.data.galleries;
  return {
    props: {
      initialVideos: all.filter((item) => item.galleryType === 1),
      initialPhotos: all.filter((item) => item.galleryType === 2),
      totalItems: photoResponse.data.totalItems,
    },
    revalidate: 1800,
  };
}

const GalleryPage: React.FC<{
  initialVideos: PhotoItem[];
  initialPhotos: PhotoItem[];
  totalItems: number;
}> = ({ initialVideos, initialPhotos, totalItems }) => {
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

      <div className="content_wrap">
        {/* ── Featured videos ── */}
        {initialVideos.length > 0 && (
          <div className="video_section">
            {initialVideos.map((video) => (
              <div key={video.id} className="video_wrap">
                <iframe
                  src={video.link}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
                {video.title && (
                  <p className="video_title">{video.title}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ── Photo grid ── */}
        {allPhotos.length > 0 && (
          <div className="gallery_grid">
            {allPhotos.map((photo) => (
              <div key={photo.id} className="grid_item">
                <PhotosCard photoItem={photo} />
              </div>
            ))}
          </div>
        )}
      </div>

      <div ref={sentinelRef} className="sentinel" />

      {isFetching && (
        <div className="loading_indicator">
          <Typography.Text fontType="HostGrotesk" color="white" weight="medium">
            Loading more...
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
  padding: 140px 0 100px;

  ${media.tablet`
    padding: 100px 0 60px;
  `}

  /* ── Page heading ── */
  .page_header {
    text-align: center;
    margin-bottom: 60px;
    padding: 0 24px;

    .main_title {
      ${headingMixin}
      color: white;
      font-size: 100px;
    }

    ${media.mobileLarge`
      margin-bottom: 40px;
      .main_title { font-size: 56px; }
    `}
  }

  /* ── Shared content wrapper ── */
  .content_wrap {
    max-width: 1100px;
    width: 100%;
    margin: 0 auto;
    padding: 0 24px;

    ${media.mobileLarge`
      padding: 0 16px;
    `}
  }

  /* ── Video section ── */
  .video_section {
    display: flex;
    flex-direction: column;
    gap: 48px;
    margin-bottom: 56px;
  }

  .video_wrap {
    width: 100%;

    iframe {
      display: block;
      width: 100%;
      height: 670px;
      border: none;
      border-radius: 4px;
    }

    .video_title {
      margin-top: 14px;
      font-family: 'Work Sans', sans-serif;
      font-size: 0.9rem;
      font-weight: 600;
      color: rgba(255, 255, 255, 0.7);
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    ${media.tablet`
      iframe { height: 420px; }
    `}

    ${media.mobileLarge`
      iframe { height: 200px; border-radius: 2px; }
    `}
  }

  /* ── Photo grid ── */
  .gallery_grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: 398px;
    gap: 12px;

    ${media.tablet`
      grid-template-columns: repeat(2, 1fr);
    `}

    ${media.mobileLarge`
      grid-template-columns: 1fr;
      grid-auto-rows: auto;
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
