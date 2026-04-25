/* eslint-disable @next/next/no-img-element */
import React from "react";
import styled from "styled-components";
import { ChartItem } from "utility/ChartsApi/types";
import ArrowRightOutline from "assets/icons/ArrowRightOutline.svg";
import Theme from "constants/Theme";

const MobileSongCard: React.FC<{ songItem: ChartItem }> = ({ songItem }) => {
    const renderTrend = () => {
        if (songItem.lastPosition === 0) {
            return <span className="badge badge--new">NEW</span>;
        } else if (songItem.lastPosition === -1) {
            return <span className="badge badge--reentry">RE-ENTRY</span>;
        } else if (songItem.rank < songItem.lastPosition) {
            return <ArrowRightOutline className="trend_icon up" />;
        } else if (songItem.rank > songItem.lastPosition) {
            return <ArrowRightOutline className="trend_icon down" />;
        } else {
            return <ArrowRightOutline className="trend_icon neutral" />;
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

    &.up    { transform: rotate(-90deg); color: ${Theme.colorPalette.ttcGreen}; }
    &.down  { transform: rotate(90deg);  color: ${Theme.colorPalette.ttcRed}; }
    &.neutral { color: ${Theme.colorPalette.ttcYellow}; }
  }

  .badge {
    font-family: 'Inter', sans-serif;
    font-size: 7px;
    font-weight: 700;
    padding: 2px 4px;
    border-radius: 2px;
    line-height: 1;
  }

  .badge--new {
    background: ${Theme.colorPalette.ttcGreen};
    color: ${Theme.colorPalette.white};
  }

  .badge--reentry {
    background: ${Theme.colorPalette.ttcYellow};
    color: ${Theme.colorPalette.black};
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
