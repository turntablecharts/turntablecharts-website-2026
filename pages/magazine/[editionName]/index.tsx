/* eslint-disable @next/next/no-img-element */
import Typography from "components/atoms/typography";
import MagazineCard from "components/molecules/MagazineCard";
import media from "constants/MediaQuery";
import { format } from "date-fns";
import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import {
  getAllMagazineEditions,
  getSingleMagazineEditionByName,
} from "utility/MagazinesApi/api";
import { MagazineEditionArticles } from "utility/MagazinesApi/types";

export const getStaticPaths: GetStaticPaths = async () => {
  const editions = await getAllMagazineEditions();

  const paths = editions.data.map((edition) => ({
    params: { editionName: edition.name.toString() },
  }));

  return {
    paths: paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const editionName = context.params?.editionName;

  const response = await getSingleMagazineEditionByName(editionName as string);

  if (response.data) {
    return {
      props: {
        editionArticles: response.data,
      },
      revalidate: 3600,
    };
  }

  return {
    notFound: true,
    revalidate: 3600,
  };
};

const EditionName: React.FC<{
  editionArticles: MagazineEditionArticles;
}> = ({ editionArticles: { magazineData } }) => {
  // console.log(editionArticles);
  const router = useRouter();

  magazineData.sort((a, b) => (a.dateCreated > b.dateCreated ? -1 : 1));

  return (
    <EditionNameStyling>
      <div className="top_section">
        <div className="top_section-left">
          <div className="img">
            <object data={magazineData[0].headerImage} type="image/png">
              <img src="/assets/ttcBgWhite.png" alt="fallback" />
            </object>
          </div>
          <div className="article_card-date">
            <Typography.Text
              fontType="Montserrat"
              level="small"
              style={{
                margin: "16px 0px 8px 0px",
              }}>
              {format(new Date(magazineData[0].dateCreated), "PPP")}
            </Typography.Text>
          </div>
          <div>
            <Link
              href={`/magazine/${router.query.editionName}/${magazineData[0].id}`}>
              <a>
                <Typography.Text
                  fontType="Mermaid"
                  style={{ lineHeight: "24px" }}
                  level="xlarge">
                  {magazineData[0].title}
                </Typography.Text>
              </a>
            </Link>
          </div>
        </div>
        <div className="top_section-right">
          <div className="item">
            <div className="img">
              <object data={magazineData[1].headerImage} type="image/png">
                <img src="/assets/ttcBgWhite.png" alt="fallback" />
              </object>
            </div>
            <div className="text">
              <Typography.Text
                fontType="Montserrat"
                level="small"
                style={{
                  margin: "16px 0px 8px 0px",
                }}>
                {format(new Date(magazineData[1].dateCreated), "PPP")}
              </Typography.Text>
              <Link
                href={`/magazine/${router.query.editionName}/${magazineData[1].id}`}>
                <a>
                  <Typography.Text
                    fontType="Mermaid"
                    style={{ lineHeight: "24px" }}
                    level="xlarge">
                    {magazineData[1].title}
                  </Typography.Text>
                </a>
              </Link>
            </div>
          </div>
          <div className="item">
            <div className="img">
              <object data={magazineData[2].headerImage} type="image/png">
                <img src="/assets/ttcBgWhite.png" alt="fallback" />
              </object>
            </div>
            <div className="text">
              <Typography.Text
                fontType="Montserrat"
                level="small"
                style={{
                  margin: "16px 0px 8px 0px",
                }}>
                {format(new Date(magazineData[2].dateCreated), "PPP")}
              </Typography.Text>
              <Link
                href={`/magazine/${router.query.editionName}/${magazineData[2].id}`}>
                <a>
                  <Typography.Text
                    fontType="Mermaid"
                    style={{ lineHeight: "24px" }}
                    level="xlarge">
                    {magazineData[2].title}
                  </Typography.Text>
                </a>
              </Link>
            </div>
          </div>
          <div className="item">
            <div className="img">
              <object data={magazineData[3].headerImage} type="image/png">
                <img src="/assets/ttcBgWhite.png" alt="fallback" />
              </object>
            </div>
            <div className="text">
              <Typography.Text
                fontType="Montserrat"
                level="small"
                style={{
                  margin: "16px 0px 8px 0px",
                }}>
                {format(new Date(magazineData[3].dateCreated), "PPP")}
              </Typography.Text>
              <Link
                href={`/magazine/${router.query.editionName}/${magazineData[3].id}`}>
                <a>
                  <Typography.Text
                    fontType="Mermaid"
                    style={{ lineHeight: "24px" }}
                    level="xlarge">
                    {magazineData[3].title}
                  </Typography.Text>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="bottom_section">
        <div className="page_article_cards">
          {magazineData.slice(4).map((magazine) => (
            <MagazineCard key={magazine.id} magazineItem={magazine} />
          ))}
        </div>
      </div>
    </EditionNameStyling>
  );
};

const EditionNameStyling = styled.div`
  max-width: 1200px;
  width: 95%;
  margin: 0 auto;

  .top_section {
    min-height: 50vh;
    display: grid;
    gap: 30px;
    grid-template-columns: 1fr 1fr;
    margin-bottom: 60px;
    ${media.tablet`
    display: block;
    `}
  }

  .top_section-left {
    ${media.tablet`
      margin-bottom: 40px;
    `}
    .img {
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;

      object,
      img {
        max-width: 100%;
        height: auto;
        transition: transform 1s;

        &:hover {
          /* img, object { */
          transform: scale(1.05);
          /* } */
        }
      }
    }
  }

  .top_section-right {
    display: grid;
    grid-template-rows: 150px 150px 150px;
    gap: 15px;
    .item {
      display: flex;
      gap: 15px;
      .img {
        /* height: 200px; */
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 1;

        object,
        img {
          max-width: 100%;
          height: auto;
          transition: transform 1s;

          &:hover {
            /* img, object { */
            transform: scale(1.05);
            /* } */
          }
        }
      }
      .text {
        flex: 1;
        ${media.tablet`
          flex: 2;
        `}
        ${media.mobileLarge`
          flex: 1.5;
        `}
      }
    }
  }

  .page_article_cards {
    display: grid;
    gap: 20px;
    row-gap: 40px;
    margin-bottom: 100px;
    grid-template-columns: repeat(3, minmax(200px, 1fr));

    ${media.smallDesktop`
      grid-template-columns: repeat(3, minmax(180px, 1fr));
    `}
    ${media.tablet`
      grid-template-columns: repeat(3, minmax(180px, 1fr));
    `}
      ${media.mobileLarge`
      grid-template-columns: repeat(2, minmax(180px, 1fr));
    `}
  }
`;

export default EditionName;
