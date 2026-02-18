/* eslint-disable @next/next/no-img-element */
import React from "react";
import styled from "styled-components";
import Typography from "components/atoms/typography";
import { ChartItem } from "utility/ChartsApi/types";
import UpTrendIcon from "assets/icons/upTrend.svg";
import DownTrendIcon from "assets/icons/downTrend.svg";
import NoTrendIcon from "assets/icons/neutralTrend.svg";
import Theme from "constants/Theme";
import media from "constants/MediaQuery";


const SongCard: React.FC<{ songItem: ChartItem; variant?: 'large' | 'compact' }> = ({ songItem, variant = 'large' }) => {
  const renderTrendIndicator = () => {
    if (songItem.lastPosition === 0) {
      return (
        <div style={{ padding: "4px 8px", backgroundColor: "#0F8F491A" }}>
          <Typography.Text
            style={{ color: Theme.colorPalette.ttcGreen }}
            level="medium"
            weight="semiBold"
            fontType="Inter"
          >
            NEW
          </Typography.Text>
        </div>
      );
    } else if (songItem.lastPosition === -1) {
      return (
        <div style={{ padding: "4px 8px", backgroundColor: "#F1A01F1A" }}>
          <Typography.Text
            style={{ color: Theme.colorPalette.ttcYellow }}
            level="medium"
            weight="semiBold"
            fontType="Inter"
          >
            RE-ENTRY
          </Typography.Text>
        </div>
      );
    } else if (songItem.rank < songItem.lastPosition) {
      return <UpTrendIcon />;
    } else if (songItem.rank > songItem.lastPosition) {
      return <DownTrendIcon />;
    } else {
      return <NoTrendIcon />;
    }
  };

  if (variant === 'large') {
    return (
      <SongCardStyling className={variant}>
        <div className="rank">
          <Typography.Text fontType="Inter" weight="semiBold" level="large">
            {songItem.rank}
          </Typography.Text>
          {renderTrendIndicator()}
        </div>
        <div className="content">
          <div className="img">
            <object data={songItem.imageUri} type="image/png">
              <img src="/assets/ttcBgWhite.png" alt="fallback" />
            </object>
          </div>
          <div className="name">
            <Typography.Text fontType="Inter" weight="semiBold" level="large" className="text">
              {songItem.title}
            </Typography.Text>
            <Typography.Text className="text" fontType="Inter" weight="medium" level="medium">
              {songItem.artiste}
            </Typography.Text>
          </div>
        </div>
      </SongCardStyling>
    );
  }

  // Compact variant
  return (
    <SongCardStyling className={variant}>
      <div className="rank">
        <Typography.Text fontType="Inter" weight="semiBold" level="large">
          {songItem.rank}
        </Typography.Text>
        {renderTrendIndicator()}
      </div>
      <div className="img">
        <object data={songItem.imageUri} type="image/png">
          <img src="/assets/ttcBgWhite.png" alt="fallback" />
        </object>
      </div>
      <div className="name">
        <Typography.Text fontType="Inter" weight="semiBold" level="large" className="text">
          {songItem.title}
        </Typography.Text>
        <Typography.Text className="text" fontType="Inter" weight="medium" level="medium">
          {songItem.artiste}
        </Typography.Text>
      </div>
    </SongCardStyling>
  );
};


export default SongCard;

const SongCardStyling = styled.div`
  background-color: #121212;
  padding: 16px;

  /* Large variant - rank top-left, image and text on right (DESKTOP) */
  &.large {
    display: flex;
    flex-direction: column;
    height: 100%;
    gap: 16px;

    .rank {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-direction: row;
    }

    .content {
      display: flex;
      flex-direction: column;
      gap: 16px;
      flex: 1;

      .img {
        flex: 1;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;

        img,
        object {
          max-width: 100%;
          max-height: 100%;
          object-fit: cover;
        }
      }

      .name {
        .text {
          display: block;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
    
    /* Mobile: Same vertical layout as compact */
    ${media.mobileLarge`
      background-color: transparent;
      padding: 12px;
      position: relative;
      overflow: visible;
      min-height: auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      width: 175px;
      height: auto;
      
      .rank {
        position: static;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        order: 2;
        width: 100%;
        flex-direction: row;

        p {
          color: ${Theme.colorPalette.white};
          font-size: 16px;
          font-weight: 600;
        }

        svg {
          width: 16px;
          height: 16px;
        }

        div {
          border-radius: 4px;
        }
      }
      
      .content {
        display: contents;
        
        .img {
          width: 100%;
          height: 150px;
          position: static;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          order: 1;

          img,
          object {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }

        .name {
          position: static;
          text-align: center;
          width: 100%;
          order: 3;

          .text {
            display: block;
            color: ${Theme.colorPalette.white};
            
            &:first-child {
              font-size: 14px;
              font-weight: 600;
              margin-bottom: 4px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            
            &:last-child {
              font-size: 12px;
              font-weight: 500;
              opacity: 0.95;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
        }
      }
    `}
  }

  /* Compact variant - horizontal layout on desktop, full-bleed on mobile/tablet */
  &.compact {
    display: flex;
    flex-direction: row;
    gap: 12px;
    padding: 12px;
    align-items: center;

    .rank {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-shrink: 0;
    }

    .img {
      height: 50px;
      width: 50px;
      min-width: 50px;
      flex-shrink: 0;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;

      img,
      object {
        max-width: 100%;
        max-height: 100%;
        object-fit: cover;
      }
    }

    .name {
      flex: 1;
      min-width: 0;

      .text {
        display: block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    /* Mobile/Tablet: Full-bleed image design */
    ${media.tablet`
      background-color: transparent;
      padding: 0;
      position: relative;
      aspect-ratio: 1;
      overflow: hidden;
      min-height: 280px;
      display: block;

      .rank {
        position: absolute;
        top: 12px;
        left: 12px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 4px;
        z-index: 2;

        p {
          color: ${Theme.colorPalette.white};
          font-size: 18px;
          font-weight: 600;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        svg {
          width: 18px;
          height: 18px;
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
        }

        div {
          border-radius: 4px;
        }
      }

      .img {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: unset;

        img,
        object {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      .name {
        position: absolute;
        bottom: 12px;
        right: 12px;
        text-align: right;
        max-width: 70%;
        z-index: 2;
        flex: unset;
        min-width: unset;

        .text {
          display: block;
          color: ${Theme.colorPalette.white};
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
          
          &:first-child {
            font-size: 14px;
            font-weight: 600;
            margin-bottom: 2px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          
          &:last-child {
            font-size: 12px;
            font-weight: 500;
            opacity: 0.95;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
    `}

    ${media.mobileLarge`
      background-color: transparent;
      padding: 12px;
      position: relative;
      overflow: visible;
      min-height: auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      width: 175px;
      
      .rank {
        position: static;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        order: 2;
        flex-direction: row;
        width: 100%;

        p {
          color: ${Theme.colorPalette.white};
          font-size: 16px;
          font-weight: 600;
        }

        svg {
          width: 16px;
          height: 16px;
        }

        div {
          border-radius: 4px;
        }
      }

      .img {
        width: 100%;
        height: 150px;
        position: static;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        order: 1;

        img,
        object {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      .name {
        position: static;
        text-align: center;
        width: 100%;
        order: 3;

        .text {
          display: block;
          color: ${Theme.colorPalette.white};
          
          &:first-child {
            font-size: 14px;
            font-weight: 600;
            margin-bottom: 4px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          
          &:last-child {
            font-size: 12px;
            font-weight: 500;
            opacity: 0.95;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
    `}
  }
`;
