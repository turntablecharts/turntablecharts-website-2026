/* eslint-disable @next/next/no-img-element */
import React from "react";
import styled from "styled-components";
import { ChartItem } from "utility/ChartsApi/types";
import UpTrendIcon from "assets/icons/upTrend.svg";
import DownTrendIcon from "assets/icons/downTrend.svg";
import NoTrendIcon from "assets/icons/neutralTrend.svg";
import Theme from "constants/Theme";

const MobileSongCard: React.FC<{ songItem: ChartItem }> = ({ songItem }) => {
    const renderTrend = () => {
        if (songItem.lastPosition === 0) {
            return (
                <span className="badge badge--new">NEW</span>
            );
        } else if (songItem.lastPosition === -1) {
            return (
                <span className="badge badge--reentry">RE-ENTRY</span>
            );
        } else if (songItem.rank < songItem.lastPosition) {
            return <UpTrendIcon className="trend_icon" />;
        } else if (songItem.rank > songItem.lastPosition) {
            return <DownTrendIcon className="trend_icon" />;
        } else {
            return <NoTrendIcon className="trend_icon" />;
        }
    };

    return (
        <MobileCardStyling>
            <div className="mc_img">
                <object data={songItem.imageUri} type="image/png">
                    <img src="/assets/ttcBgWhite.png" alt={songItem.title} />
                </object>
            </div>
            <div className="mc_meta">
                <span className="mc_rank">{songItem.rank}</span>
                {renderTrend()}
            </div>
            <p className="mc_title">{songItem.title}</p>
            <p className="mc_artist">{songItem.artiste}</p>
        </MobileCardStyling>
    );
};

export default MobileSongCard;

const MobileCardStyling = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 5px;
  width: 100%;
  min-width: 0;

  .mc_img {
    width: 100%;
    aspect-ratio: 1;
    overflow: hidden;
    flex-shrink: 0;

    object {
      display: block;
      width: 100%;
      height: 100%;
    }

    object,
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
  }

  .mc_meta {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    margin-top: 6px;

    .mc_rank {
      color: ${Theme.colorPalette.white};
      font-family: "Inter", sans-serif;
      font-size: 14px;
      font-weight: 700;
    }

    .trend_icon {
      width: 13px;
      height: 13px;
    }

    .badge {
      font-family: "Inter", sans-serif;
      font-size: 10px;
      font-weight: 700;
      padding: 2px 5px;
      border-radius: 3px;
    }

    .badge--new {
      background: #0F8F491A;
      color: ${Theme.colorPalette.ttcGreen};
    }

    .badge--reentry {
      background: #F1A01F1A;
      color: ${Theme.colorPalette.ttcYellow};
    }
  }

  .mc_title {
    color: ${Theme.colorPalette.white};
    font-family: "Work Sans", sans-serif;
    font-size: 13px;
    font-weight: 700;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
    margin: 0;
  }

  .mc_artist {
    color: rgba(255, 255, 255, 0.6);
    font-family: "Work Sans", sans-serif;
    font-size: 11px;
    font-weight: 500;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
    margin: 0;
  }
`;
