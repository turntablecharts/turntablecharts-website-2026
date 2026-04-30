/* eslint-disable @next/next/no-img-element */
import React from "react";
import styled from "styled-components";
import Typography from "components/atoms/typography";
import { format } from "date-fns";
import Link from "next/link";
import { EditionArticleSummary } from "utility/MagazinesApi/types";
import { useRouter } from "next/router";
import media from "constants/MediaQuery";

const MagazineCard: React.FC<{ magazineItem: EditionArticleSummary }> = ({
  magazineItem,
}) => {
  const router = useRouter();
  return (
    <MagazineCardStyling>
      <div className="article_card-img">
        <Link href={`/magazine/${router.query.editionName}/${magazineItem.id}`}>
          <a>
            <img
              src={magazineItem.headerImage}
              alt={magazineItem.title}
              onError={(e) => { (e.target as HTMLImageElement).src = '/assets/ttcBgWhite.png'; }}
            />
          </a>
        </Link>
      </div>
      <div className="article_card-date">
        <Typography.Text
          fontType="WorkSans"
          level="small"
          style={{
            margin: "16px 0px 8px 0px",
          }}>
          {format(new Date(magazineItem.dateCreated), "PPP")}
        </Typography.Text>
      </div>
      <div className="article_card-title">
        <Link href={`/magazine/${router.query.editionName}/${magazineItem.id}`}>
          <a>
            <Typography.Text
              fontType="WorkSans"
              style={{ lineHeight: "24px" }}
              level="xlarge">
              {magazineItem.title}
            </Typography.Text>
          </a>
        </Link>
      </div>
      {/* <div className="article_card-desc">
        <Typography.Text fontType="Montserrat" level="large" weight="medium">
          {magazineItem.description}
        </Typography.Text>
      </div> */}
    </MagazineCardStyling>
  );
};

export default MagazineCard;

const MagazineCardStyling = styled.div`
  max-width: auto;
  display: flex;
  flex-direction: column;



  .article_card-title {
    margin-bottom: 8px;


    &:hover p {
      text-decoration: underline;
    }
  }
  .article_card-desc {

    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
  }

  .article_card-img {
    width: 100%;
    aspect-ratio: 3 / 4;
    overflow: hidden;
    background: #111;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    ${media.tablet`
      aspect-ratio: 3 / 4;
    `}

    a {
      display: block;
      width: 100%;
      height: 100%;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      object-position: center;
      display: block;
      pointer-events: none;
      transition: transform 0.4s ease;
    }

    &:hover img {
      transform: scale(1.03);
    }
  }

`;
