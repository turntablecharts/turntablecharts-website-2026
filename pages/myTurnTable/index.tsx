/* eslint-disable @next/next/no-img-element */
import Typography from "components/atoms/typography";
import Theme from "constants/Theme";
import styled from "styled-components";
import media from "constants/MediaQuery";
import { ChangeEvent, useEffect, useState } from "react";
import { sendWrappedRequest } from "utility/ChartsApi/api";
import { downloadDivToImg } from "utility/helpers";

type WrappedResult = {
  randomFact: string;
  images: string;
  songs: string[];
  artists: string[];
  genre: string;
};

const MyTurnTable = () => {
  const [stage, setStage] = useState(1);
  const [formSongs, setFormSongs] = useState<{ [key: string]: string }>({});
  const [formArtistes, setFormArtistes] = useState<{ [key: string]: string }>(
    {}
  );
  const [wrappedResults, setWrappedResults] = useState<WrappedResult>();
  const [loading, setLoading] = useState<boolean>(false);

  const count = ["01", "02", "03", "04", "05"];

  const handleSongsChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setFormSongs((prevFormSongs) => ({ ...prevFormSongs, [name]: value }));
  };

  const handleArtistesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setFormArtistes((prevFormArtistes) => ({
      ...prevFormArtistes,
      [name]: value,
    }));
  };

  const handleCreateWrapped = () => {
    setLoading(true);
    sendWrappedRequest({
      songs: Object.values(formSongs),
      artists: Object.values(formArtistes),
    }).then((res) => {
      setLoading(false);

      setWrappedResults(res.data as WrappedResult);
    });
  };

  if (loading) {
    return (
      <MyTurnTableStyling>
        <div className="page_header">
          <Typography.Title>#myTurnTable</Typography.Title>
        </div>
        <Typography.Heading
          fontType="Mermaid"
          style={{
            color: Theme.colorPalette.ttcYellow,
            fontSize: Theme.fontSizes.xlarge,
            textAlign: "center",
          }}
          level={3}
        >
          Compiling your #myTurnTable...
        </Typography.Heading>
      </MyTurnTableStyling>
    );
  }

  return (
    <MyTurnTableStyling>
      <div className="page_header">
        <Typography.Title style={{ fontSize: "64px" }}>
          #myTurnTable
        </Typography.Title>
      </div>
      {stage === 1 && (
        <div className="page_content">
          <Typography.Heading
            level={2}
            style={{
              fontSize: Theme.fontSizes.xxxxlarge,
              marginBottom: "50px",
              letterSpacing: "1px",
              lineHeight: "40px",
            }}
            fontType="Fontastique"
          >
            myTurnTable is our way of bringing data to life and relating it to
            your personal listening choices
          </Typography.Heading>
          <Typography.Text
            fontType="SFProText"
            level="xlarge"
            style={{ lineHeight: "32px", marginBottom: "40px" }}
          >
            All you have to do is input your five favorite artistes and songs
            during the first half of the year (these can be songs released in
            the last quarter of 2021 too)— and you can see how they compare in
            the overall ranking in Nigeria. You’ll also get some interesting
            information about music in Nigeria so far in 2022
          </Typography.Text>
          <Typography.Text
            fontType="SFProText"
            level="xxlarge"
            weight="semiBold"
          >
            Sound simple right? Let’s get started
          </Typography.Text>

          <div className="myTurnTableCta">
            <button onClick={() => setStage(2)} className="btn begin">
              Begin
            </button>
          </div>
        </div>
      )}
      {stage === 2 && (
        <div className="form_content">
          <div className="form_wrapper">
            <div className="top_songs">
              <Typography.Text
                fontType="Mermaid"
                level="xxlarge"
                style={{
                  color: Theme.colorPalette.ttcYellow,
                  marginBottom: "26px",
                }}
              >
                Enter Your Top Songs
              </Typography.Text>
              {count.map((item) => (
                <div key={item + "songs"} className="input">
                  <Typography.Text
                    fontType="SFProText"
                    weight="semiBold"
                    level="xlarge"
                  >
                    {item}
                  </Typography.Text>
                  <input
                    onChange={handleSongsChange}
                    name={item}
                    value={formSongs[item] || ""}
                    type="text"
                  />
                </div>
              ))}
            </div>
            <div className="top_artists">
              <Typography.Text
                fontType="Mermaid"
                level="xxlarge"
                style={{
                  color: Theme.colorPalette.ttcYellow,
                  marginBottom: "26px",
                }}
              >
                Enter Your Top Artistes
              </Typography.Text>
              {count.map((item) => (
                <div key={item + "artistes"} className="input">
                  <Typography.Text
                    fontType="SFProText"
                    weight="semiBold"
                    level="xlarge"
                  >
                    {item}
                  </Typography.Text>
                  <input
                    name={item}
                    value={formArtistes[item] || ""}
                    onChange={handleArtistesChange}
                    type="text"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="myTurnTableCta">
            <button
              onClick={() => {
                setStage(3);
                handleCreateWrapped();
              }}
              className="btn begin"
            >
              Create My TurnTable
            </button>
          </div>
        </div>
      )}
      {stage === 3 && (
        <>
          <div className="wrapped_content" id="saveWrapped">
            <Typography.Heading level={2}>#myTurnTable</Typography.Heading>
            <div className="images">
              <img src="/assets/wrapped.png" alt="wrapped" />
            </div>
            <Typography.Text
              fontType="SFProText"
              weight="medium"
              style={{ lineHeight: "24px" }}
              level="large"
            >
              Here&apos;s how your top songs & artistes ranked in H1 2022
            </Typography.Text>
            <div className="results">
              <div className="top_songs">
                <Typography.Heading
                  fontType="Mermaid"
                  style={{
                    color: Theme.colorPalette.ttcYellow,
                    fontSize: Theme.fontSizes.xlarge,
                  }}
                  level={3}
                >
                  Top Songs
                </Typography.Heading>
                {wrappedResults &&
                  wrappedResults.songs.map((song, i) => (
                    <div key={song} className="entry">
                      {/* <Typography.Text
                        fontType="SFProText"
                        weight="semiBold"
                        level="large"
                      >
                        {"0" + (i + 1).toString()}
                      </Typography.Text> */}
                      <Typography.Text
                        fontType="SFProText"
                        weight="bold"
                        level="large"
                      >
                        {song}
                      </Typography.Text>
                    </div>
                  ))}
              </div>
              <div className="top_artistes">
                <Typography.Heading
                  fontType="Mermaid"
                  style={{
                    color: Theme.colorPalette.ttcYellow,
                    fontSize: Theme.fontSizes.xlarge,
                  }}
                  level={3}
                >
                  Top Artistes
                </Typography.Heading>
                {wrappedResults &&
                  wrappedResults.artists.map((artist, i) => (
                    <div key={artist} className="entry">
                      {/* <Typography.Text
                        fontType="SFProText"
                        weight="semiBold"
                        level="large"
                      >
                        {"0" + (i + 1).toString()}
                      </Typography.Text> */}
                      <Typography.Text
                        fontType="SFProText"
                        weight="bold"
                        level="large"
                      >
                        {artist}
                      </Typography.Text>
                    </div>
                  ))}
              </div>
            </div>
            <div style={{ textAlign: "left" }} className="genre">
              <Typography.Heading
                fontType="Mermaid"
                style={{
                  color: Theme.colorPalette.ttcYellow,
                  fontSize: Theme.fontSizes.xlarge,
                }}
                level={3}
              >
                Genre Share of H1
              </Typography.Heading>
              <Typography.Text fontType="SFProText" weight="bold" level="large">
                {wrappedResults?.genre}
              </Typography.Text>
            </div>
            <div className="random_fact">
              <Typography.Heading
                fontType="Mermaid"
                style={{
                  color: Theme.colorPalette.ttcYellow,
                  fontSize: Theme.fontSizes.xlarge,
                }}
                level={3}
              >
                Fun Fact
              </Typography.Heading>
              <Typography.Text
                fontType="SFProText"
                weight="medium"
                style={{ lineHeight: "24px" }}
                level="large"
              >
                {wrappedResults?.randomFact}
              </Typography.Text>
            </div>
          </div>
          <div className="myTurnTableCta">
            <button
              onClick={() => {
                downloadDivToImg("saveWrapped", "myTurnTable.jpeg");
              }}
              className="btn begin"
            >
              Share Your TurnTable
            </button>
          </div>
        </>
      )}
    </MyTurnTableStyling>
  );
};

export default MyTurnTable;

const MyTurnTableStyling = styled.div`
  max-width: 1200px;
  width: 95%;
  margin: 0 auto;
  .page_header {
    padding: 7vh 0;
    text-align: center;

    ${media.mobileLarge`
    h1 {
        font-size: 50px;

      }
    `}
  }

  .page_content {
    max-width: 700px;
    width: 95%;
    margin: 0 auto;
  }

  .wrapped_content {
    max-width: 500px;
    margin: 0 auto;
    padding: 25px 25px;
    background-color: ${Theme.colorPalette.black};
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 40px;
    -webkit-print-color-adjust: exact;

    .images {
      width: 250px;
      height: 150px;
      display: grid;
      place-items: center;
      overflow: hidden;
      -webkit-print-color-adjust: exact;

      img {
        width: 100%;
        -webkit-print-color-adjust: exact;
      }
    }

    .results {
      display: flex;
      justify-content: space-between;
      gap: 20px;
      text-align: left;

      .top_songs {
        flex: 1;
      }
      .top_artistes {
        flex: 1;
      }

      .entry {
        display: flex;
        align-items: center;
        gap: 15px;
        margin-top: 15px;
      }
    }
  }

  .form_content {
    .form_wrapper {
      max-width: 1000px;
      width: 90%;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      ${media.tablet`
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 40px;
    `}
    }
    .input {
      display: flex;
      align-items: center;
      gap: 20px;
      margin-top: 16px;

      input {
        color: #fff;
        background: #000;
        border: 1px solid ${Theme.colorPalette.ttcYellow};
        font-size: ${Theme.fontSizes.xxlarge};
        font-weight: ${Theme.fontWeights.semiBold};
        font-family: ${Theme.typography.extra};
        padding: 10px;
        max-width: 330px;
        outline: none;
      }
    }
  }

  .myTurnTableCta {
    display: grid;
    place-items: center;
    margin-top: 100px;

    .btn {
      all: unset;
      padding: 24px 50px;
      /* width: 250px; */
      background-color: ${Theme.colorPalette.ttcYellow};
      color: ${Theme.colorPalette.black};
      font-family: ${Theme.typography.extra};
      font-weight: ${Theme.fontWeights.semiBold};
      font-size: ${Theme.fontSizes.xlarge};
      border-radius: 36px;
      display: inline-flex;
      align-items: center;
      gap: 10px;
      cursor: pointer;

      ${media.mobileLarge`
    padding: 14px 24px;
      `}
    }
  }
`;
