/* eslint-disable @next/next/no-img-element */
import React from "react";
import styled from "styled-components";
import Typography from "components/atoms/typography";
import { PhotoItem } from "utility/PhotosApi/types";

const PhotosCard: React.FC<{ photoItem: PhotoItem }> = ({ photoItem }) => {
  return (
    <PhotosCardStyling>
      <div className="photo_img">
        <img
          src={photoItem.headerImage}
          alt="photo img"
          // onError={(e) =>
          //   (e.currentTarget.src = "../../assets/icons/ttc-logo.svg")
          // }
        />
      </div>
      <div className="photo_title">
        <Typography.Text
          fontType="Mermaid"
          level="xlarge"
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

  img {
    max-width: 100%;
    height: auto;
  }
`;
