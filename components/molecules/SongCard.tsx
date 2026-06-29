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

const AutoMarquee = ({ text }: { text: string }) => {
  const containerRef = React.useRef<HTMLSpanElement>(null);
  const textRef = React.useRef<HTMLSpanElement>(null);
  const [dist, setDist] = React.useState(0);

  React.useLayoutEffect(() => {
    const measure = () => {
      const container = containerRef.current;
      const textEl = textRef.current;
      if (!container || !textEl) return;
      const cw = container.getBoundingClientRect().width;
      if (cw === 0) return;
      const tw = textEl.scrollWidth;
      setDist(tw > cw ? cw - tw - 12 : 0);
    };
    measure();
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null;
    if (ro && containerRef.current) ro.observe(containerRef.current);
    document.fonts?.ready?.then(measure);
    return () => ro?.disconnect();
  }, [text]);

  return (
    <span
      ref={containerRef}
      style={{
        display: 'block',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: dist === 0 ? 'ellipsis' : 'clip',
        width: '100%',
        // @ts-ignore
        '--slide-dist': `${dist}px`,
      }}
    >
      <span
        ref={textRef}
        className={dist !== 0 ? 'auto-marquee-text' : ''}
        style={{ display: 'inline-block', maxWidth: 'none' }}
      >
        {text}
      </span>
    </span>
  );
};

const SongCard: React.FC<{ songItem: ChartItem; variant?: 'large' | 'compact' }> = ({ songItem, variant = 'large' }) => {
  const renderTrendIndicator = (whiteMode = false) => {
    if (songItem.lastPosition === 0) {
      return whiteMode ? (
        <Typography.Text style={{ color: 'white' }} className="tag" weight="semiBold" fontType="WorkSans">
          NEW
        </Typography.Text>
      ) : (
        <div style={{ padding: '2px 6px', backgroundColor: '#0F8F491A', borderRadius: '20px' }}>
          <Typography.Text style={{ color: Theme.colorPalette.ttcGreen }} className="tag" weight="semiBold" fontType="WorkSans">
            NEW
          </Typography.Text>
        </div>
      );
    } else if (songItem.lastPosition === -1) {
      return whiteMode ? (
        <Typography.Text style={{ color: 'white' }} className="tag" weight="semiBold" fontType="WorkSans">
          RE-ENTRY
        </Typography.Text>
      ) : (
        <div style={{ padding: '2px 6px', backgroundColor: '#F1A01F1A', borderRadius: '20px' }}>
          <Typography.Text style={{ color: Theme.colorPalette.ttcYellow }} className="tag" weight="semiBold" fontType="WorkSans">
            RE-ENTRY
          </Typography.Text>
        </div>
      );
    } else if (songItem.rank < songItem.lastPosition) {
      return <UpTrendIcon className="trend_arrow" />;
    } else if (songItem.rank > songItem.lastPosition) {
      return <DownTrendIcon className="trend_arrow" />;
    } else {
      return <NoTrendIcon className="trend_arrow" />;
    }
  };

  if (variant === 'large') {
    return (
      <SongCardStyling className={variant}>
        {/* Full-bleed album art */}
        <div className="img">
          <img
            src={songItem.imageUri}
            alt={songItem.title}
            onError={(e) => { (e.target as HTMLImageElement).src = '/assets/ttc-new.png'; }}
          />
        </div>

        {/* Rank badge — top-left overlay */}
        <div className="rank_badge">
          <span className="rank_num">{songItem.rank}</span>
          {renderTrendIndicator(true)}
        </div>

        {/* Info bar — pinned to bottom */}
        <div className="name">
          <div className="name_info">
            <h3 className="name_title">
              <AutoMarquee text={songItem.title} />
            </h3>
            <p className="name_artist">
              <AutoMarquee text={songItem.artiste} />
            </p>
          </div>
        </div>
      </SongCardStyling>
    );
  }

  // Compact variant
  return (
    <SongCardStyling className={variant}>
      <div className="rank">
        <span className="rank_num">{songItem.rank}</span>
        {renderTrendIndicator()}
      </div>
      <div className="img">
        <img
          src={songItem.imageUri}
          alt={songItem.title}
          onError={(e) => { (e.target as HTMLImageElement).src = '/assets/ttc-new.png'; }}
        />
      </div>
      <div className="name">
        <p className="name_title">{songItem.title}</p>
        <p className="name_artist">{songItem.artiste}</p>
      </div>
    </SongCardStyling>
  );
};


export default SongCard;

const SongCardStyling = styled.div`
  padding: 16px;

  .trend_arrow {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
  }

  .tag {
    font-size: ${Theme.fontSizes.xxsmall};
    white-space: nowrap;
  }

  /* Large variant */
  &.large {
    position: relative;
    overflow: hidden;
    width: 657px;
    max-width: 100%;
    height: 768px;
    padding: 0;

    /* Full-bleed image */
    .img {
      width: 100%;
      height: 657px;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }
    }

    /* Rank badge — top-left green square */
    .rank_badge {
      position: absolute;
      top: 0;
      left: 0;
      background-color: ${Theme.colorPalette.ttcGreen};
      width: 72px;
      height: 72px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 4px;
      z-index: 2;

      .rank_num {
        color: white;
        font-family: 'Host Grotesk', sans-serif;
        font-size: 28px;
        font-weight: 700;
        line-height: 1;
      }

      .trend_arrow {
        width: 16px;
        height: 16px;
        color: white;

        &.up    { transform: rotate(-90deg); color: white; }
        &.down  { transform: rotate(90deg);  color: white; }
        &.neutral { color: white; }
      }
    }

    /* Info bar — pinned to bottom */
    .name {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: ${Theme.colorPalette.black};
      padding: 14px 16px 18px;
      text-align: center;
      z-index: 2;

      .name_title {
        color: white;
        font-family: 'Host Grotesk', sans-serif;
        font-size: 38px;
        font-weight: 700;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin: 0 0 4px;
        letter-spacing: -2%;
        line-height: 100%;
      }

      .name_artist {
        color: white;
        font-family: 'Host Grotesk', sans-serif;
        font-size: 20px;
        font-weight: 400;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin: 0;
      }
    }

    ${media.tablet`
      min-height: 400px;
    `}

    ${media.mobileLarge`
      min-height: 320px;
    `}
  }

  /* Compact variant */
  &.compact {
    display: flex;
    flex-direction: row;
    gap: 14px;
    padding: 6px 12px;
    align-items: center;

    /* Rank + trend indicator */
    .rank {
      display: flex;
      flex-direction: row;
      align-items: center;
      flex-shrink: 0;
      min-width: 86px;

      .rank_num {
        color: ${Theme.colorPalette.white};
        font-family: 'Host Grotesk', sans-serif;
        font-size: 22px;
        font-weight: 400;
        line-height: 1;
        min-width: 26px;
      }

      > :last-child {
        margin: 0 auto;
      }
    }

    /* Album art */
    .img {
      width: 54px;
      height: 54px;
      flex-shrink: 0;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }
    }

    /* Track info */
    .name {
      flex: 1;
      min-width: 0;

      .name_title {
        color: ${Theme.colorPalette.white};
        font-family: 'Host Grotesk', sans-serif;
        font-size: 1rem;
        font-weight: 600;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin: 0 0 3px;
      }

      .name_artist {
        color: white !important;
        font-family: 'Host Grotesk', sans-serif;
        font-size: 0.75rem;
        font-weight: 400;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin: 0;
      }
    }

    /* Mobile: full-bleed card layout */
    ${media.mobileLarge`
      padding: 0;
      position: relative;
      aspect-ratio: 1;
      overflow: hidden;
      display: block;

      .rank {
        position: absolute;
        top: 10px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 2;
        min-width: unset;
        gap: 4px;
        justify-content: center;

        .rank_num {
          font-size: 16px;
          font-weight: 700;
          text-shadow: 0 1px 3px rgba(0,0,0,0.5);
          min-width: unset;
        }

        .trend_arrow {
          filter: drop-shadow(0 1px 3px rgba(0,0,0,0.5));
        }
      }

      .img {
        width: 175px;
        height: 175px;
        position: absolute;
        inset: 0;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      .name {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 24px 10px 10px;
        min-width: unset;
        text-align: center;

        .name_title {
          font-size: 0.8rem;
          margin-bottom: 2px;
          color: white;
        }

        .name_artist {
          font-size: 0.65rem;
          color: white !important;
        }
      }
    `}
  }

  .auto-marquee-text {
    animation: autoMarquee 5s linear infinite alternate;
  }

  @keyframes autoMarquee {
    0%, 20% { transform: translateX(0); }
    80%, 100% { transform: translateX(var(--slide-dist)); }
  }
`;
