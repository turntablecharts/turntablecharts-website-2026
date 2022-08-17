/* eslint-disable @next/next/no-img-element */
import React from "react";
import styled from "styled-components";
import Typography from "components/atoms/typography";
import Theme from "constants/Theme";
import { format } from "date-fns";
import Link from "next/link";
import { EditionArticleSummary } from "utility/MagazinesApi/types";
import { useRouter } from "next/router";

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
          fontType="Montserrat"
          level="small"
          style={{
            margin: "16px 0px 8px 0px",
          }}>
          {format(new Date(magazineItem.dateCreated), "PPP")}
        </Typography.Text>
      </div>
      <div className="article_card-title">
        <Typography.Text
          fontType="Mermaid"
          style={{ lineHeight: "24px" }}
          level="xlarge">
          {magazineItem.title}
        </Typography.Text>
      </div>
      <div className="article_card-desc">
        <Typography.Text fontType="Montserrat" level="large" weight="medium">
          {magazineItem.description}
        </Typography.Text>
      </div>
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
  }
  .article_card-desc {

    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
  }

  .article_card-img {
    height: 200px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    img, object {
      max-width: 100%;
      height: auto;
      transition: transform 1s;

      /* &:before {
      content: ' ';
      display: block;
      position: absolute;
      height: 50px;
      width: 50px;
      background-image: url('/assets/ttcBgWhite.png');
      } */

    &:hover {
      img, object {
        transform: scale(1.05);
      }
    }
  }

  .article_card-title {
    flex: 1;
  }

  .article_card-meta {
    font-family: ${Theme.typography.primary};
    font-size: ${Theme.fontSizes.small};
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 10px;

    .dot {
      width: 3px;
      height: 3px;
      border-radius: 50%;
      background: #fff;
    }
  }
`;
