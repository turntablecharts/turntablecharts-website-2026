/* eslint-disable @next/next/no-img-element */
import React from "react";
import styled from "styled-components";
import Typography from "components/atoms/typography";
import { PhotoItem } from "utility/PhotosApi/types";
import Theme from "constants/Theme";
import media from "constants/MediaQuery";

const PhotosCard = ({ photoItem, featured = false }: { photoItem: PhotoItem; featured?: boolean }) => {
  return (
    <PhotosCardStyling className={''}>
      <div className="photo_img">
        <img
          src="/assets/ttcBgWhite.png"
          alt={photoItem.title || "Photo"}
        />
        {featured && (
          <div className="photo_overlay">
            <Typography.Text fontType="Anton" weight="normal" level="large" className="overlay_title">
              {photoItem.title || "TURNTABLE MAGAZINE VOL. 001"}
            </Typography.Text>
            <Typography.Text fontType="WorkSans" weight="medium" level="small" className="overlay_date">
              [ {new Date(photoItem.dateCreated).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }).toUpperCase()} ]
            </Typography.Text>
          </div>
        )}
      </div>
    </PhotosCardStyling>
  );
};

export default PhotosCard;

const PhotosCardStyling = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
  opacity: 0.8;
  }

  .photo_img {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #000;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    .photo_overlay {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 30px 20px;
      background: linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.4) 70%, transparent 100%);
      display: flex;
      flex-direction: column;
      gap: 8px;
      z-index: 10;

      .overlay_title {
        color: white;
        font-size: 1.2rem;
        line-height: 1.2;
        text-transform: uppercase;
        letter-spacing: 0.5px;

        ${media.mobileLarge`
          font-size: 1rem;
        `}
      }

      .overlay_date {
        color: white;
        font-size: 0.85rem;
        opacity: 0.9;

        ${media.mobileLarge`
          font-size: 0.75rem;
        `}
      }
    }
  }

  &.featured {
    .photo_img {
      img {
        filter: brightness(0.85);
      }
    }
  }

  ${media.mobileLarge`
    &:hover {
      transform: scale(1.01);
    }
  `}
`;
