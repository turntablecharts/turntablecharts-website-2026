import CTAButton from 'components/atoms/ctaButton';
import Typography from 'components/atoms/typography';
import media from 'constants/MediaQuery';
import Theme from 'constants/Theme';
import styled from 'styled-components';

const JoinUs = () => {
  return (
    <JoinUsStyling>
      <div className="join_texts">
        <Typography.Heading fontType="Anton" className="header" level={2} style={{ marginBottom: '10px' }}>
          TurnTable Power100
        </Typography.Heading>
        <Typography.Text fontType="WorkSans" className="body" style={{ marginBottom: '40px' }} weight="semiBold">
          Nominate an individual that has contributed in shaping Afrobeats
          <br /> both at home and/or globally in the last three years
        </Typography.Text>
      </div>
      <CTAButton label="Get Started" to="/power100" />

      {/* <div className="join_texts">
        <Typography.Heading
          fontType="Mermaid"
          className="header"
          level={2}
          style={{ marginBottom: "10px" }}
        >
          #myTurnTable
        </Typography.Heading>
        <Typography.Text
          fontType="SFProText"
          className="body"
          style={{ marginBottom: "40px" }}
          weight="semiBold"
        >
          How does your listening choices compare with the rest of Nigeria?
          <br /> Find out and more on #myTurnTable */}
      {/* <br /> about Nigerian music you love. */}
      {/* </Typography.Text>
      </div>
      <CTAButton label="Get Started" to="/myTurnTable" /> */}
    </JoinUsStyling>
  );
};

export default JoinUs;

const JoinUsStyling = styled.div`
  background-image: url('/assets/joinUsBG.png');
  background-size: cover;
  text-align: center;
  padding: 100px 0;
  /* width: 100vw; */

  .header {
    font-size: ${Theme.fontSizes.extralarge};
    ${media.mobileLarge`
      font-size: 24px;
    `}
  }

  .body {
    font-size: ${Theme.fontSizes.xlarge};
    ${media.mobileLarge`
      font-size: 14px;
    `}
  }
`;
