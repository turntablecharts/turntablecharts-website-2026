import React from 'react';
import styled, { keyframes } from 'styled-components';
import Typography from 'components/atoms/typography';
import media from 'constants/MediaQuery';
import MarqueeIcon from 'assets/icons/MarqueeIcon.svg';
import MarqueeIcon2 from 'assets/icons/MarqueeIcon2.svg';

interface MarqueeProps {
  variant?: 'green' | 'yellow';
}

const Marquee: React.FC<MarqueeProps> = ({ variant = 'green' }) => {
  const Icon = variant === 'green' ? MarqueeIcon2 : MarqueeIcon;

  const marqueeItems = [
    'Turntable Top 50',
    'TV Top Songs',
    'Streaming Top 50',
    'Airplay Top 50',
  ];

  return (
    <MarqueeContainer>
      <MarqueeTrack>
        {/* Duplicate the content multiple times for seamless loop */}
        {[...Array(4)].map((_, groupIndex) => (
          <MarqueeContent key={groupIndex}>
            {marqueeItems.map((text, index) => (
              <React.Fragment key={`${groupIndex}-${index}`}>
                <MarqueeText>
                  <Typography.Text fontType="Anton" weight="bold" level="extralarge">
                    {text}
                  </Typography.Text>
                </MarqueeText>
                <IconWrapper>
                  <Icon />
                </IconWrapper>
              </React.Fragment>
            ))}
          </MarqueeContent>
        ))}
      </MarqueeTrack>
    </MarqueeContainer>
  );
};

export default Marquee;

const scroll = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-25%);
  }
`;

const MarqueeContainer = styled.div`
  width: 100%;
  max-width: 100vw;
  overflow: hidden;
  background-color: transparent;
  padding: 20px 0;

  ${media.mobileLarge`
    padding: 12px 0;
  `}
`;

const MarqueeTrack = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  animation: ${scroll} 30s linear infinite;
  width: fit-content;

  ${media.mobileLarge`
    gap: 16px;
    animation-duration: 20s;
  `}
`;

const MarqueeContent = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  white-space: nowrap;

  ${media.mobileLarge`
    gap: 16px;
  `}
`;

const MarqueeText = styled.div`
  text-transform: uppercase;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;

  svg {
    width: 84px;
    height: 48px;
  }

  ${media.mobileLarge`
    svg {
      width: 44px;
      height: 26px;
    }
  `}
`;
