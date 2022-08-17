import MagazineCard from "components/molecules/MagazineCard";
import media from "constants/MediaQuery";
import { GetStaticPaths, GetStaticProps } from "next";
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
}> = ({ editionArticles }) => {
  // console.log(editionArticles);
  return (
    <EditionNameStyling>
      <div className="top_section">
        <div className="top_section-left"></div>
        <div className="top_section-right"></div>
      </div>
      <div className="bottom_section">
        <div className="page_article_cards">
          {editionArticles?.magazineData
            .sort((a, b) => (a.dateCreated > b.dateCreated ? -1 : 1))
            .map((magazine) => (
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

  .page_article_cards {
    display: grid;
    gap: 20px;
    row-gap: 40px;
    margin-bottom: 100px;
    grid-template-columns: repeat(4, minmax(200px, 1fr));

    ${media.smallDesktop`
      grid-template-columns: repeat(4, minmax(180px, 1fr));
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
