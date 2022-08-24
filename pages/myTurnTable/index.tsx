/* eslint-disable @next/next/no-img-element */
import Typography, { Text } from "components/atoms/typography";
import Theme from "constants/Theme";
import styled from "styled-components";
import media from "constants/MediaQuery";
import { ChangeEvent, useState } from "react";
import { sendWrappedRequest } from "utility/ChartsApi/api";
import { downloadDivToImg } from "utility/helpers";
import TTCIconLoading from "assets/icons/rollingAnimated.svg";
import CTAArrow from "assets/icons/ctaArrow.svg";
import { searchArtisteByQuery, searchSongByQuery } from "utility/SearchApi/api";
import { DebounceInput } from "react-debounce-input";

type WrappedResult = {
  randomFact: string;
  images: string;
  songs: string[];
  artists: string[];
  genre: string;
};

const MyTurnTable = () => {
  const [stage, setStage] = useState(1);
  const [formSongs, setFormSongs] = useState<{
    [key: string]: { value: string; loading: boolean; results: string[] };
  }>({});
  const [formArtistes, setFormArtistes] = useState<{
    [key: string]: { value: string; loading: boolean; results: string[] };
  }>({});
  const [wrappedResults, setWrappedResults] = useState<WrappedResult>();
  const [loading, setLoading] = useState<boolean>(false);

  const count = ["01", "02", "03", "04", "05"];

  const handleSongsChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setFormSongs((prevFormSongs) => ({
      ...prevFormSongs,
      [name]: { value, loading: true, results: [] },
    }));

    searchSongByQuery(value.trim()).then(({ data }) => {
      setFormSongs((prevFormSongs) => ({
        ...prevFormSongs,
        [name]: {
          ...prevFormSongs[name],
          loading: false,
          results: data.data,
        },
      }));
    });
  };

  const handleArtistesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setFormArtistes((prevFormArtistes) => ({
      ...prevFormArtistes,
      [name]: { value, loading: true, results: [] },
    }));

    searchArtisteByQuery(value.trim()).then(({ data }) => {
      setFormArtistes((prevFormArtistes) => ({
        ...prevFormArtistes,
        [name]: {
          ...prevFormArtistes[name],
          loading: false,
          results: data.data,
        },
      }));
    });
  };

  const handleCreateWrapped = () => {
    setLoading(true);
    sendWrappedRequest({
      songs: Object.values(formSongs).map((song) => song.value.trim()),
      artists: Object.values(formArtistes).map((artist) => artist.value.trim()),
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
          level={3}>
          Compiling your #myTurnTable...
        </Typography.Heading>
      </MyTurnTableStyling>
    );
  }

  return (
    <MyTurnTableStyling>
      <div className="page_header">
        <Typography.Title>#myTurnTable</Typography.Title>
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
            fontType="Fontastique">
            myTurnTable is our way of bringing data to life and relating it to
            your personal listening choices
          </Typography.Heading>
          <Typography.Text
            fontType="SFProText"
            level="xlarge"
            style={{ lineHeight: "32px", marginBottom: "40px" }}>
            All you have to do is input your five favorite artistes and songs
            during the first half of the year (these can be songs released in
            the last quarter of 2021 too)— and you can see how they compare in
            the overall ranking in Nigeria. You’ll also get some interesting
            information about music in Nigeria so far in 2022
          </Typography.Text>
          <Typography.Text
            fontType="SFProText"
            level="xxlarge"
            weight="semiBold">
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
        <>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "20px",
              cursor: "pointer",
            }}
            onClick={() => {
              setStage(stage - 1);
            }}>
            <CTAArrow
              style={{
                width: "30px",
                stroke: "white",
                transform: "rotate(180deg)",
              }}
            />
            <Typography.Text fontType="SFProText">Back</Typography.Text>
          </div>
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
                  className="top_title">
                  Enter Your Top Songs
                </Typography.Text>
                {count.map((item) => (
                  <div key={item + "songs"} className="input">
                    <Typography.Text
                      fontType="SFProText"
                      weight="semiBold"
                      level="xlarge">
                      {item}
                    </Typography.Text>
                    <DebounceInput
                      debounceTimeout={700}
                      value={formSongs[item]?.value || ""}
                      name={item}
                      onChange={handleSongsChange}
                    />
                    {formSongs[item]?.loading && (
                      <TTCIconLoading className="search_icon" />
                    )}
                    {formSongs[item]?.results?.length ? (
                      <div className="results">
                        {formSongs[item]?.results.map((result) => (
                          <div
                            key={result}
                            onClick={() => {
                              setFormSongs((prevFormSongs) => ({
                                ...prevFormSongs,
                                [item]: {
                                  ...prevFormSongs[item],
                                  value: result,
                                  results: [],
                                },
                              }));
                            }}
                            className="result">
                            <Typography.Text
                              fontType="SFProText"
                              level="xlarge">
                              {result}
                            </Typography.Text>
                          </div>
                        ))}
                      </div>
                    ) : null}
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
                  className="top_title">
                  Enter Your Top Artistes
                </Typography.Text>
                {count.map((item) => (
                  <div key={item + "artistes"} className="input">
                    <Typography.Text
                      fontType="SFProText"
                      weight="semiBold"
                      level="xlarge">
                      {item}
                    </Typography.Text>
                    <DebounceInput
                      debounceTimeout={700}
                      value={formArtistes[item]?.value || ""}
                      name={item}
                      onChange={handleArtistesChange}
                    />
                    {formArtistes[item]?.loading && (
                      <TTCIconLoading className="search_icon" />
                    )}
                    {formArtistes[item]?.results?.length ? (
                      <div className="results">
                        {formArtistes[item]?.results.map((result) => (
                          <div
                            key={result}
                            onClick={() => {
                              setFormArtistes((prevFormArtistes) => ({
                                ...prevFormArtistes,
                                [item]: {
                                  ...prevFormArtistes[item],
                                  value: result,
                                  results: [],
                                },
                              }));
                            }}
                            className="result">
                            <Typography.Text
                              fontType="SFProText"
                              level="xlarge">
                              {result}
                            </Typography.Text>
                          </div>
                        ))}
                      </div>
                    ) : null}
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
                className="btn begin">
                Create My TurnTable
              </button>
            </div>
          </div>
        </>
      )}
      {stage === 3 && (
        <>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "20px",
              cursor: "pointer",
            }}
            onClick={() => {
              setStage(stage - 1);
            }}>
            <CTAArrow
              style={{
                width: "30px",
                stroke: "white",
                transform: "rotate(180deg)",
              }}
            />
            <Typography.Text fontType="SFProText">Back</Typography.Text>
          </div>
          <div className="wrapped_content" id="saveWrapped">
            <img
              src="/assets/ttc-logo.png"
              style={{
                height: "30px",
                // width: "102px",
                margin: "30px auto 0px",
              }}
              alt="logo"
            />
            <div className="images">
              {/* <img src="/assets/wrapped.png" alt="wrapped" /> */}
              <div>
                <Text
                  fontType="SFProText"
                  weight="bold"
                  level="xxlarge"
                  style={{ backgroundColor: "#000", padding: "3px" }}>
                  #myTurnTable
                </Text>
                <Text
                  fontType="SFProText"
                  weight="semiBold"
                  level="large"
                  style={{
                    backgroundColor: "#000",
                    color: Theme.colorPalette.ttcYellow,
                    display: "inline-block",
                  }}>
                  Jan - June 2022
                </Text>
              </div>
            </div>
            <Typography.Text
              fontType="Montserrat"
              weight="medium"
              style={{
                lineHeight: "24px",
                maxWidth: "400px",
                width: "90%",
                alignSelf: "center",
              }}
              level="medium">
              Here&apos;s how your favourite songs & artistes ranked in H1 2022
            </Typography.Text>
            <div className="results">
              <div className="top_songs">
                <Typography.Heading
                  fontType="Mermaid"
                  style={{
                    color: Theme.colorPalette.ttcYellow,
                    fontSize: Theme.fontSizes.xlarge,
                  }}
                  level={3}>
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
                        fontType="Montserrat"
                        weight="bold"
                        level="large">
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
                  level={3}>
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
                        fontType="Montserrat"
                        weight="bold"
                        level="large">
                        {artist}
                      </Typography.Text>
                    </div>
                  ))}
              </div>
            </div>
            <div className="genre">
              <Typography.Heading
                fontType="Mermaid"
                style={{
                  color: Theme.colorPalette.ttcYellow,
                  fontSize: Theme.fontSizes.xlarge,
                }}
                level={3}>
                Genre Share of H1
              </Typography.Heading>
              <Typography.Text
                fontType="Montserrat"
                weight="bold"
                level="large">
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
                level={3}>
                Fun Fact
              </Typography.Heading>
              <Typography.Text
                fontType="Montserrat"
                weight="medium"
                style={{ lineHeight: "24px" }}
                level="large">
                {wrappedResults?.randomFact}
              </Typography.Text>
            </div>
            <div className="turntable_footer" />
          </div>
          <div className="myTurnTableCta">
            <button
              onClick={() => {
                downloadDivToImg("saveWrapped", "myTurnTable.jpeg");
              }}
              className="btn begin">
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

    ${media.mobile`
      padding: 3vh 0;
    `}

    h1 {
      font-size: 64px;
    }
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
    background-color: ${Theme.colorPalette.black};
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 30px;
    -webkit-print-color-adjust: exact;
    background-image: url("/assets/turntableBg.png");
    background-size: cover;
    border: 2px solid ${Theme.colorPalette.white};

    ${media.mobile`
      gap: 20px;
    `}

    .images {
      height: 150px;
      width: 100%;
      display: grid;
      place-items: center;
      overflow: hidden;
      -webkit-print-color-adjust: exact;
      background-image: url("/assets/myturntabletopBg.svg");
      background-size: cover;
      background-position: center top;

      ${media.mobile`
        height: 80px;
      `}
    }

    .results {
      display: flex;
      justify-content: space-between;
      text-align: left;
      margin: 0px 20px;

      .top_songs {
        flex: 1;
      }
      .top_artistes {
        flex: 1;
        text-align: right;
        .entry {
          text-align: right;
          justify-content: flex-end;
        }
      }

      .entry {
        display: flex;
        align-items: center;
        gap: 15px;
        margin-top: 15px;

        ${media.mobile`
        margin-top: 10px;
        p{
          font-size: 13px;
        }
        `}
      }

      .genre {
        text-align: left;
        margin: 0px 20px;

        ${media.mobile`
          p{
            font-size: 13px;
          }
        `}
      }
    }

    .random_fact {
      max-width: 400px;
      width: 90%;
      align-self: center;

      ${media.mobile`
          p{
            font-size: 12px;
          }
        `}
    }

    .turntable_footer {
      height: 50px;
      background-image: url("/assets/myturntableDownBg.svg");
      background-size: cover;
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

      .top_title {
        ${media.mobile`
          font-size: 16px;
        `}
      }
    }
    .input {
      display: flex;
      align-items: center;
      gap: 20px;
      margin-top: 16px;
      position: relative;

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
        ${media.mobile`
          font-size: 14px;
        `}
      }

      .search_icon {
        position: absolute;
        z-index: 10;
        right: 12px;
      }

      .results {
        position: absolute;
        z-index: 10;
        top: calc(100% + 5px);
        right: 0px;
        min-width: 230px;
        background-color: ${Theme.colorPalette.white};
        color: ${Theme.colorPalette.black};
        max-height: 200px;
        overflow: scroll;

        .result {
          padding: 10px;
          border-bottom: 1px solid ${Theme.colorPalette.textGrey}30;
          cursor: pointer;
          ${media.mobile`
          p {

            font-size: 14px;
          }
        `}
          &:hover {
            background-color: ${Theme.colorPalette.textGrey}15;
          }
        }
      }
    }
  }

  .myTurnTableCta {
    display: grid;
    place-items: center;
    margin-top: 70px;

    .btn {
      all: unset;
      padding: 24px 50px;
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
        font-size: 16px;
      `}
    }
  }
`;
