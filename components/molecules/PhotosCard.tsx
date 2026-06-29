/* eslint-disable @next/next/no-img-element */
import React from "react";
import styled from "styled-components";
import Typography from "components/atoms/typography";
import { PhotoItem } from "utility/PhotosApi/types";
import media from "constants/MediaQuery";

const PhotosCard = ({ photoItem }: { photoItem: PhotoItem }) => {
  return (
    <PhotosCardStyling>
      <div className="photo_img">
        <img
          src={photoItem.link || "/assets/ttc-new.png"}
          alt={photoItem.title || "Photo"}
          onError={(e) => { (e.target as HTMLImageElement).src = '/assets/ttc-new.png'; }}
        />
        <div className="photo_overlay">
          <Typography.Heading fontType="Nohemi" weight="black" level={4} className="overlay_title">
            {photoItem.title || "TURNTABLE GALLERY"}
          </Typography.Heading>
        </div>
      </div>

    </PhotosCardStyling>
  );
};

export default PhotosCard;

const PhotosCardStyling = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  cursor: pointer;
  background-color: #000;
  display: flex;
  flex-direction: column;

  .photo_img {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    flex: 1;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      transition: transform 0.6s cubic-bezier(0.33, 1, 0.68, 1), filter 0.6s ease;
    }

    .photo_overlay {
      position: absolute;
      inset: 0;
      padding: 30px 20px;
      background: rgba(0, 0, 0, 0.4);
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      gap: 4px;
      z-index: 10;
      opacity: 0;
      transition: opacity 0.4s ease, transform 0.4s ease;
      transform: translateY(10px);
    }
  }

  &:hover {
    .photo_img img {
      transform: scale(1.1);
      filter: brightness(0.7);
    }
    .photo_overlay {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .overlay_title {
    color: white;
    font-size: 1.1rem;
    line-height: 1.2;
    text-transform: uppercase;
    letter-spacing: 0.02em;
  }

  /* Caption — hidden on desktop, shown on mobile */
  .photo_caption {
    display: none;

    ${media.mobileLarge`
      display: block;
      padding: 10px 4px 4px;

      .caption_title {
        font-family: 'Work Sans', sans-serif;
        font-size: 0.85rem;
        font-weight: 600;
        color: white;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        line-height: 1.3;
        text-align: left;
        display: block;
      }
    `}
  }

  /* Mobile: fixed image size, auto-height card */
  ${media.mobileLarge`
    height: auto;

    .photo_img {
      height: 398px;
      flex: none;
    }
  `}
`;
