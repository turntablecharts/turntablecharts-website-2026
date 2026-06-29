/* eslint-disable @next/next/no-img-element */
import React, { useState, useCallback, useRef } from 'react';
import styled from 'styled-components';
import { MagazineEditions } from 'utility/MagazinesApi/types';
import media from 'constants/MediaQuery';
import LeftIcon from 'assets/icons/ArrowOutline.svg';
import { useRouter } from 'next/router';

interface MagazineSliderProps {
  magazines: MagazineEditions[];
}

const MAX_VISIBLE = 6;
const DRAG_THRESHOLD = 60;

const MagazineSlider: React.FC<MagazineSliderProps> = ({ magazines }) => {
  const covers = magazines.slice(0, MAX_VISIBLE);
  const total = covers.length;
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

  const dragStartX = useRef<number | null>(null);
  const isDragging = useRef(false);

  const prev = useCallback(() => setCurrentIndex((i) => (i - 1 + total) % total), [total]);
  const next = useCallback(() => setCurrentIndex((i) => (i + 1) % total), [total]);

  const onPointerDown = (e: React.PointerEvent) => {
    dragStartX.current = e.clientX;
    isDragging.current = false;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (dragStartX.current === null) return;
    if (Math.abs(e.clientX - dragStartX.current) > 8) {
      isDragging.current = true;
    }
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (dragStartX.current === null) return;
    const delta = e.clientX - dragStartX.current;
    if (isDragging.current) {
      if (delta < -DRAG_THRESHOLD) next();
      else if (delta > DRAG_THRESHOLD) prev();
    }
    dragStartX.current = null;
    isDragging.current = false;
  };

  const leftIndex = (currentIndex - 1 + total) % total;
  const rightIndex = (currentIndex + 1) % total;

  const left = covers[leftIndex];
  const center = covers[currentIndex];
  const right = covers[rightIndex];

  const handleCenterClick = () => {
    if (!isDragging.current) {
      router.push(`/magazine/${center.name}`);
    }
  };

  return (
    <>
      {/* ── Desktop / tablet: 3-up drag carousel with arrows ── */}
      <SliderContainer>
        <NavButton onClick={prev} aria-label="Previous magazine" side="left">
          <LeftIcon style={{ transform: 'scaleX(-1)' }} />
        </NavButton>

        <Stage
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={() => { dragStartX.current = null; isDragging.current = false; }}
        >
          <MagazineItem position="left" onClick={() => { if (!isDragging.current) prev(); }}>
            <MagazineImage>
              <img src={left.coverImageUrl} alt={left.name} onError={(e) => { (e.target as HTMLImageElement).src = '/assets/ttc-new.png'; }} />
            </MagazineImage>
          </MagazineItem>
          <MagazineItem position="center" onClick={handleCenterClick}>
            <MagazineImage>
              <img src={center.coverImageUrl} alt={center.name} onError={(e) => { (e.target as HTMLImageElement).src = '/assets/ttc-new.png'; }} />
            </MagazineImage>
          </MagazineItem>
          <MagazineItem position="right" onClick={() => { if (!isDragging.current) next(); }}>
            <MagazineImage>
              <img src={right.coverImageUrl} alt={right.name} onError={(e) => { (e.target as HTMLImageElement).src = '/assets/ttc-new.png'; }} />
            </MagazineImage>
          </MagazineItem>
        </Stage>

        <NavButton onClick={next} aria-label="Next magazine" side="right">
          <LeftIcon />
        </NavButton>
      </SliderContainer>

      {/* ── Mobile: auto-scrolling marquee loop ── */}
      <MobileStrip>
        <MobileTrack>
          {/* Render covers twice for seamless loop */}
          {[...covers, ...covers].map((mag, i) => (
            <MobileCard key={i} onClick={() => router.push(`/magazine/${mag.name}`)}>
              <img
                src={mag.coverImageUrl}
                alt={mag.name}
                onError={(e) => { (e.target as HTMLImageElement).src = '/assets/ttc-new.png'; }}
              />
            </MobileCard>
          ))}
        </MobileTrack>
      </MobileStrip>
    </>
  );
};

export default MagazineSlider;

/* ─── Styles ──────────────────────────────────────────────────────── */

const SliderContainer = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 20px 0;

  ${media.mobileLarge`
    display: none;
  `}
`;

const NavButton = styled.button<{ side: 'left' | 'right' }>`
  all: unset;
  cursor: pointer;
  flex-shrink: 0;
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.85;
  transition: opacity 0.2s ease, transform 0.2s ease;

  svg {
    width: 38px;
    height: 38px;
    display: block;
  }

  &:hover {
    opacity: 1;
    transform: scale(1.08);
  }

  &:active {
    transform: scale(0.96);
  }

  ${media.mobileLarge`
    display: none;
  `}
`;

const Stage = styled.div`
  flex: 1;
  height: 600px;
  position: relative;
  cursor: grab;
  touch-action: pan-y;

  &:active {
    cursor: grabbing;
  }

  ${media.tablet`
    height: 450px;
  `}

  ${media.mobileLarge`
    height: 320px;
  `}
`;

const MagazineItem = styled.div<{ position: 'left' | 'center' | 'right' }>`
  position: absolute;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);

  ${({ position }) => {
    if (position === 'center') return `
      z-index: 100;
      left: 50%;
      transform: translateX(-50%) scale(1.2);
      opacity: 1;
      cursor: pointer;
    `;
    if (position === 'left') return `
      z-index: 50;
      left: 20%;
      transform: translateX(-50%) scale(0.85);
      opacity: 0.7;
      cursor: pointer;
    `;
    return `
      z-index: 50;
      right: 20%;
      transform: translateX(50%) scale(0.85);
      opacity: 0.7;
      cursor: pointer;
    `;
  }}

  &:hover {
    opacity: 1;
  }
`;

const MagazineImage = styled.div`
  width: 350px;
  height: 450px;
  position: relative;
  overflow: hidden;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-8px);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    box-shadow: 0 15px 50px rgba(0, 0, 0, 0.7);
    pointer-events: none;
    user-select: none;
    display: block;
  }

  ${media.tablet`
    width: 260px;
    height: 340px;
  `}
`;

/* ── Mobile-only swipe strip ── */
const MobileStrip = styled.div`
  display: none;

  ${media.mobileLarge`
    display: block;
    overflow-x: auto;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    width: 100%;
    padding: 20px 0 28px;

    &::-webkit-scrollbar { display: none; }
  `}
`;

const MobileTrack = styled.div`
  ${media.mobileLarge`
    display: flex;
    gap: 16px;
    width: max-content;
    padding: 0 8px;
  `}
`;

const MobileCard = styled.div`
  display: none;

  ${media.mobileLarge`
    display: block;
    flex-shrink: 0;
    width: 52vw;
    aspect-ratio: 2 / 3;
    overflow: hidden;
    cursor: pointer;
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.65);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
      display: block;
      pointer-events: none;
    }
  `}
`;

