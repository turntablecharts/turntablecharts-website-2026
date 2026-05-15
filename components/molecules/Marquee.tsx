import React from 'react';
import styled, { keyframes } from 'styled-components';
import Typography from 'components/atoms/typography';
import MarqueeIcon from 'assets/icons/MarqueeIcon.svg';
import MarqueeIcon2 from 'assets/icons/MarqueeIcon2.svg';
import media from 'constants/MediaQuery';

interface MarqueeProps {
  variant?: 'green' | 'yellow';
  chartType?: 'flagship' | 'genre';
}

const FLAGSHIP_ITEMS = [
  'Official Nigeria Top 100',
  'Official Artiste Top 100',
  'Official Top 100 Albums',
  'Official Producer Top 100',
  'Official Radio Songs',
  'Official Streaming Songs'
];

const GENRE_ITEMS = [
  'Top Afro-POP Songs',
  'Top Afro-R&B Songs',
  'Top Gospel Songs',
  'Top Alternative/Dancehall Songs',
  'Top Traditional Songs',
  'Top African Dance/EDM Songs',
];

const Marquee: React.FC<MarqueeProps> = ({ variant = 'green', chartType = 'flagship' }) => {
  const Icon = variant === 'green' ? MarqueeIcon2 : MarqueeIcon;
  const marqueeItems = chartType === 'genre' ? GENRE_ITEMS : FLAGSHIP_ITEMS;

  return (
    <MarqueeContainer>
      <MarqueeTrack>
        {[...Array(4)].map((_, groupIndex) => (
          <MarqueeContent key={groupIndex}>
            {marqueeItems.map((text, index) => (
              <React.Fragment key={`${groupIndex}-${index}`}>
                <MarqueeText>
                  <Typography.Heading level={2} weight="black">
                    {text}
                  </Typography.Heading>
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
  from { transform: translateX(0); }
  to { transform: translateX(-25%); }
`;

const MarqueeContainer = styled.div`
  width: 100%;
  max-width: 100vw;
  overflow: hidden;
  background-color: transparent;
  padding: 10px 0;
`;

const MarqueeTrack = styled.div`
  display: flex;
  align-items: center;
  animation: ${scroll} 40s linear infinite;
  width: max-content;
`;

const MarqueeContent = styled.div`
  display: flex;
  align-items: center;
  gap: 60px;
  padding-right: 60px; /* Essential for gapless looping */
  white-space: nowrap;
`;

const MarqueeText = styled.div`
  text-transform: uppercase;
  
  h2 {
    font-size: 3rem;
    margin: 0;
    white-space: nowrap;
    
    ${media.mobileLarge`
      font-size: 1.8rem;
    `}
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;

  svg {
    width: 84px;
    height: 48px;
    
    ${media.mobileLarge`
      width: 60px;
      height: 32px;
    `}
  }
`;
