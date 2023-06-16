import React from 'react';
import media from 'constants/MediaQuery';
import Theme from 'constants/Theme';
import Typography from 'components/atoms/typography';
import styled from 'styled-components';
import Form from 'components/molecules/Form';

const power100 = () => {
  return (
    <Power100Styling>
      <Typography.Heading fontType="Mermaid" className="header" level={2} style={{ marginBottom: '10px' }}>
        TurnTable Power 100
      </Typography.Heading>
      <Typography.Text fontType="SFProText" className="body" style={{ marginBottom: '40px' }} weight="semiBold">
        Nominate someone in the Nigerian music industry who has
        <br /> done a lot for Afrobeats within the last 3 years
      </Typography.Text>
      <Form />
    </Power100Styling>
  );
};

export default power100;

const Power100Styling = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  .body {
    font-size: ${Theme.fontSizes.xlarge};
    ${media.mobileLarge`
      font-size: 12px;
    `}
    ${media.smallMobile`
    font-size: 10px;
  `}
  }
`;
