/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { MagazineEditions } from 'utility/MagazinesApi/types';
import Link from 'next/link';

interface MagazineSliderProps {
  magazines: MagazineEditions[];
}

const MagazineSlider: React.FC<MagazineSliderProps> = ({ magazines }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Debug: Log magazine data
  useEffect(() => {
    console.log('Magazine Data:', magazines);
    console.log('Total number of magazines received:', magazines.length);
    magazines.forEach((mag, index) => {
      console.log(`Magazine ${index + 1}:`, {
        id: mag.id,
        name: mag.name,
        coverImageUrl: mag.coverImageUrl
      });
    });
  }, [magazines]);

  // Auto-rotate through magazines every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % magazines.length);
    }, 5000); // 5 seconds per magazine

    return () => clearInterval(interval);
  }, [magazines.length]);

  // Get the 3 magazines to display (left, center, right)
  const getVisibleMagazines = () => {
    const leftIndex = (currentIndex - 1 + magazines.length) % magazines.length;
    const centerIndex = currentIndex;
    const rightIndex = (currentIndex + 1) % magazines.length;

    return {
      left: magazines[leftIndex],
      center: magazines[centerIndex],
      right: magazines[rightIndex]
    };
  };

  const { left, center, right } = getVisibleMagazines();

  return (
    <SliderContainer>
      {/* Left Magazine - Behind */}
      <MagazineItem position="left">
        <Link href={`/magazine/${left.name}`}>
          <a>
            <MagazineImage>
              <object data={left.coverImageUrl} type="image/png">
                <img src="/assets/ttcBgWhite.png" alt={left.name} />
              </object>
            </MagazineImage>
          </a>
        </Link>
      </MagazineItem>

      {/* Center Magazine - Front */}
      <MagazineItem position="center">
        <Link href={`/magazine/${center.name}`}>
          <a>
            <MagazineImage>
              <object data={center.coverImageUrl} type="image/png">
                <img src="/assets/ttcBgWhite.png" alt={center.name} />
              </object>
            </MagazineImage>
          </a>
        </Link>
      </MagazineItem>

      {/* Right Magazine - Behind */}
      <MagazineItem position="right">
        <Link href={`/magazine/${right.name}`}>
          <a>
            <MagazineImage>
              <object data={right.coverImageUrl} type="image/png">
                <img src="/assets/ttcBgWhite.png" alt={right.name} />
              </object>
            </MagazineImage>
          </a>
        </Link>
      </MagazineItem>

      {/* Progress indicator */}
      {/* <ProgressIndicator>
        {magazines.map((_, index) => (
          <ProgressDot
            key={index}
            active={index === currentIndex}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </ProgressIndicator> */}
    </SliderContainer>
  );
};

export default MagazineSlider;

const SliderContainer = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 60px 20px;
  position: relative;
  height: 600px;
`;

const MagazineItem = styled.div<{ position: 'left' | 'center' | 'right' }>`
  position: absolute;
  transition: all 0.6s ease-in-out;
  
  ${props => {
    if (props.position === 'center') {
      return `
        z-index: 100;
        left: 50%;
        transform: translateX(-50%) scale(1.2);
        opacity: 1;
      `;
    } else if (props.position === 'left') {
      return `
        z-index: 50;
        left: 20%;
        transform: translateX(-50%) scale(0.85);
        opacity: 0.7;
      `;
    } else {
      return `
        z-index: 50;
        right: 20%;
        transform: translateX(50%) scale(0.85);
        opacity: 0.7;
      `;
    }
  }}

  &:hover {
    opacity: 1;
  }
`;

const MagazineImage = styled.div`
  width: 350px;
  height: 450px;
  position: relative;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-10px);
  }

  object,
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    box-shadow: 0 15px 50px rgba(0, 0, 0, 0.7);
  }
`;

const ProgressIndicator = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 200;
`;

const ProgressDot = styled.button<{ active: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: none;
  background: ${props => props.active ? '#F1A01F' : 'rgba(255, 255, 255, 0.3)'};
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;

  &:hover {
    background: ${props => props.active ? '#F1A01F' : 'rgba(255, 255, 255, 0.6)'};
    transform: scale(1.2);
  }
`;
