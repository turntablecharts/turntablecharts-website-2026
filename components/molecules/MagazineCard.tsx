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
            <object data={magazineItem.headerImage} type="image/png">
              <img src="/assets/ttcBgWhite.png" alt="fallback" />
            </object>
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
    height: 250px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;

    ${media.tablet`
    height: 200px;
    `}
    ${media.mobileLarge`
    height: 150px;
    `}
    cursor: pointer;
    img, object {
      max-width: 100%;
      height: auto;
      transition: transform 1s;

    &:hover {
      /* img, object { */
        transform: scale(1.05);
      /* } */
    }
  }

`;
