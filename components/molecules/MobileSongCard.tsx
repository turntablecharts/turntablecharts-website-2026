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
                <div style={{ padding: '2px 5px', backgroundColor: '#0F8F491A' }}>
                    <span className="badge badge--new">NEW</span>
                </div>
            );
        } else if (songItem.lastPosition === -1) {
            return (
                <div style={{ padding: '2px 5px', backgroundColor: '#F1A01F1A' }}>
                    <span className="badge badge--reentry">RE-ENTRY</span>
                </div>
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
                <img
                    src={songItem.imageUri}
                    alt={songItem.title}
                    onError={(e) => { (e.target as HTMLImageElement).src = '/assets/ttcBgWhite.png'; }}
                />
            </div>
            <div className="mc_rank_row">
                <span className="mc_rank">{songItem.rank}</span>
                {renderTrend()}
            </div>
            <div className="mc_info">
                <p className="mc_title">{songItem.title}</p>
                <p className="mc_artist">{songItem.artiste}</p>
            </div>
        </MobileCardStyling>
    );
};

export default MobileSongCard;

const MobileCardStyling = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  /* Square image — always fills full column width */
  .mc_img {
    width: 100%;
    aspect-ratio: 1 / 1;
    overflow: hidden;
    flex-shrink: 0;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
  }

  /* Fixed-height rank row so it never varies */
  .mc_rank_row {
    height: 22px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    margin-top: 6px;
    overflow: hidden;
  }

  .mc_rank {
    color: ${Theme.colorPalette.white};
    font-family: 'Host Grotesk', sans-serif;
    font-size: 13px;
    font-weight: 700;
    line-height: 1;
  }

  .trend_icon {
    width: 12px;
    height: 12px;
    flex-shrink: 0;
  }

  .badge {
    font-family: 'Work Sans', sans-serif;
    font-size: 7px;
    font-weight: 700;
    line-height: 1;
    white-space: nowrap;
  }

  .badge--new {
    color: ${Theme.colorPalette.ttcGreen};
  }

  .badge--reentry {
    color: ${Theme.colorPalette.ttcYellow};
  }

  /* Fixed-height info block so it never varies */
  .mc_info {
    height: 38px;
    flex-shrink: 0;
    overflow: hidden;
    padding: 3px 2px 0;
  }

  .mc_title {
    color: ${Theme.colorPalette.white};
    font-family: 'Host Grotesk', sans-serif;
    font-size: 0.72rem;
    font-weight: 600;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 0 0 2px;
    display: block;
  }

  .mc_artist {
    color: rgba(255, 255, 255, 0.5);
    font-family: 'Host Grotesk', sans-serif;
    font-size: 0.6rem;
    font-weight: 400;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 0;
    display: block;
  }
`;
