/* eslint-disable @next/next/no-img-element */
import React from "react";
import styled from "styled-components";
import Typography from "components/atoms/typography";
import { PhotoItem } from "utility/PhotosApi/types";
import Theme from "constants/Theme";
import media from "constants/MediaQuery";

const PhotosCard: React.FC<{ photoItem: PhotoItem }> = ({ photoItem }) => {
  return (
    <PhotosCardStyling>
      <div className="photo_img">
        <object data={photoItem.headerImage} type="image/png">
          <img src="/assets/ttcBgWhite.png" alt="fallback" />
        </object>
      </div>
      <div className="photo_title">
        <Typography.Text
          fontType="Mermaid"
          className="photo_title-text"
          style={{
            marginTop: "20px",
          }}
        >
          {photoItem.title}
        </Typography.Text>
      </div>
    </PhotosCardStyling>
  );
};

export default PhotosCard;

const PhotosCardStyling = styled.div`
  max-width: auto;

  .photo_img {
    height: 200px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .photo_title-text {
    font-size: ${Theme.fontSizes.xlarge};
    ${media.mobileLarge`
      font-size: 1rem;
    `}
  }

  img,
  object {
    max-width: 100%;
    height: auto;
  }
`;
