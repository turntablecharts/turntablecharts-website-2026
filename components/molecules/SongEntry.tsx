/* eslint-disable @next/next/no-img-element */
import Typography from 'components/atoms/typography';
import media from 'constants/MediaQuery';
import Theme from 'constants/Theme';
import React from 'react';
import styled from 'styled-components';
import { ChartItem } from 'utility/ChartsApi/types';
import { truncateString } from 'utility/helpers';

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
      // Only set distance if text is actually wider than container
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
        style={{ 
          display: 'inline-block',
          maxWidth: 'none'
        }}
      >
        {text}
      </span>
    </span>
  );
};

const SongEntry = ({ song, setVid }: { song: ChartItem; setVid: (arg: string) => void }) => {
  const vidID = song.musicLink?.split('v=')[1]?.split('&')[0];

  const handleClick = () => {
    if (!vidID) return;
    setVid(`https://www.youtube.com/embed/${vidID}?playsinline=1&rel=0`);
  };

  return (
    <SongEntryStyling
      hasVideo={!!vidID}
      onClick={handleClick}
    >
      <div className="entry_image">
        <img
          src={song.imageUri}
          alt={song.title}
          onError={(e) => { (e.target as HTMLImageElement).src = '/assets/ttc-new.png'; }}
        />
      </div>
      <div className="entry_name">
        <Typography.Text
          fontType="WorkSans"
          weight="semiBold"
          className="title"
        >
          <AutoMarquee text={song.title} />
        </Typography.Text>
        <Typography.Text className="artiste" fontType="WorkSans" weight="medium" level="large">
          <AutoMarquee text={song.artiste} />
        </Typography.Text>
      </div>
    </SongEntryStyling>
  );
};

export default SongEntry;

const SongEntryStyling = styled.div<{ hasVideo?: boolean }>`
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: ${({ hasVideo }) => (hasVideo ? 'pointer' : 'default')};
  transition: opacity 0.15s;

  &:active {
    opacity: 0.75;
  }

  ${media.mobile`
    gap: 10px;
  `}
  .entry_image {
    height: 64px;
    width: 64px;
    border-radius: 8px;
    overflow: hidden;
    display: flex;
    align-items: center;
    flex-shrink: 0;
    ${media.tablet`
      height: 48px;
      width: 48px;
    `}
    ${media.mobileLarge`
      height: 44px;
      width: 44px;
      border-radius: 4px;
    `}
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      pointer-events: none;
    }
  }
  .entry_name {
    flex: 1;
    min-width: 0;
    .title {
      font-size: ${Theme.fontSizes.xlarge};
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      display: block;
      ${media.tablet`
        font-size: 14px;
      `}
      ${media.mobileLarge`
        font-size: 13px;
      `}
    }
    .artiste {
      font-size: ${Theme.fontSizes.large};
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      display: block;
      ${media.tablet`
        font-size: 11px;
      `}
      ${media.mobileLarge`
        font-size: 10px;
      `}
    }

    .auto-marquee-text {
      animation: autoMarquee 5s linear infinite alternate;
    }
  }

  @keyframes autoMarquee {
    0%, 20% { transform: translateX(0); }
    80%, 100% { transform: translateX(var(--slide-dist)); }
  }
`;
