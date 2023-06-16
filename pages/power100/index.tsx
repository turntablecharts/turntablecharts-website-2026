import React from 'react';
import media from 'constants/MediaQuery';
import Theme from 'constants/Theme';
import Typography from 'components/atoms/typography';
import styled from 'styled-components';
import Form from 'components/molecules/Form';

const power100 = () => {
  return (
    <Power100Styling>
      <Typography.Heading fontType="Mermaid" className="header" level={2} style={{ marginBottom: '10px' }} weight="semiBold">
        TurnTable Power 100
      </Typography.Heading>
      <Typography.Text fontType="SFProText" className="body" style={{ marginBottom: '30px' }} weight="semiBold">
        Nominate an individual that has contributed in shaping Afrobeats
        <br /> both at home and/or globally in the last three years
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
  margin-top: 25px;

  .header {
    font-size: ${Theme.fontSizes.extralarge};
    ${media.mobileLarge`
      font-size: 24px;
    `}
  }

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
