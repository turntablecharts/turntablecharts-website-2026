import CTAButton from "components/atoms/ctaButton";
import Typography from "components/atoms/typography";
import Theme from "constants/Theme";
import styled from "styled-components";

// import dynamic from "next/dynamic";
// const CTAButton = dynamic(() => import("components/atoms/ctaButton"), {
//   ssr: false,
// });

const JoinUs = () => {
  return (
    <JoinUsStyling>
      <div className="join_texts">
        <Typography.Heading
          fontType="Mermaid"
          level={2}
          style={{ fontSize: Theme.fontSizes.extralarge, marginBottom: "10px" }}
        >
          #myTurnTable
        </Typography.Heading>
        <Typography.Text
          fontType="SFProText"
          level="xlarge"
          style={{ marginBottom: "40px" }}
          weight="semiBold"
        >
          How does your listening choices compare with the rest of Nigeria?
          <br /> Find out and more on #myTurnTable
          {/* <br /> about Nigerian music you love. */}
        </Typography.Text>
      </div>
      <CTAButton label="Get Started" to="/myTurnTable" />
    </JoinUsStyling>
  );
};

export default JoinUs;

const JoinUsStyling = styled.div`
  background-image: url("/assets/joinUsBG.png");
  background-size: cover;
  text-align: center;
  padding: 100px 0;
  /* width: 100vw; */
`;
