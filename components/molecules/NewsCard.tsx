/* eslint-disable @next/next/no-img-element */
import React from "react";
import styled from "styled-components";
import Typography from "components/atoms/typography";
import Link from "next/link";

const NewsCard = () => {
  return (
    <NewsCardStyling>
      <div className="article_img">
        {/* <img
          src={img}
          alt="article img"
        /> */}
      </div>
      <div className="article_title">
        <Typography.Text
          fontType="Mermaid"
          level="xlarge"
          style={{
            marginTop: "20px",
          }}
        >
          TurnTable NXT: Meet Murz
        </Typography.Text>
      </div>
      <div className="article_summary">
        <Typography.Text fontType="Montserrat" level="large">
          Kelvin Egonu&apos;s foray into music is born out of a need to escape
          the life he was born into, he hopes hi...
        </Typography.Text>
      </div>
      <div className="article_link yellow">
        <Link href="">
          <a>
            <Typography.Text fontType="Montserrat" level="large">
              Read more
            </Typography.Text>
          </a>
        </Link>
      </div>
    </NewsCardStyling>
  );
};

export default NewsCard;

const NewsCardStyling = styled.div`
  max-width: 285px;
  display: flex;
  flex-direction: column;

  .article_img {
    height: 200px;
    overflow: hidden;
    display: flex;
    align-items: center;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  .article_title {
    flex: 1;
  }

  .article_summary {
    margin: 10px 0px;
    -webkit-line-clamp: 3;
  }
  .article_link {
    &:hover {
      text-decoration: underline;
    }
  }

  /* .article_img {
    border-radius: 8px;
  } */
`;
