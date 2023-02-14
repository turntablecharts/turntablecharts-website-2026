import styled from 'styled-components';
import TTCIconInsta from 'assets/icons/ttc-insta.svg';
import TTCIconTwiter from 'assets/icons/ttc-twitter.svg';
import Typography from 'components/atoms/typography';
import Link from 'next/link';
import Theme from 'constants/Theme';
import media from 'constants/MediaQuery';

const Footer = () => {
  return (
    <FooterStyling>
      <div className="ttc_copy">
        <Typography.Text level="medium" weight="medium" fontType="Montserrat">
          &copy; {new Date().getFullYear()}
        </Typography.Text>
        <Link href="/">
          <a>
            <Typography.Text style={{ color: Theme.colorPalette.ttcYellow }} fontType="Montserrat" level="medium" weight="medium">
              Turntable Charts
            </Typography.Text>
          </a>
        </Link>
      </div>
      <div className="ttc_socials">
        <TTCIconInsta className="ttc_socials-icon" />
        <TTCIconTwiter className="ttc_socials-icon" />
      </div>
    </FooterStyling>
  );
};

export default Footer;

const FooterStyling = styled.footer`
  max-width: 1200px;
  width: 95%;
  margin: 50px auto 0px auto;
  padding-bottom: 50px;
  display: flex;
  justify-content: space-between;

  .ttc_copy,
  .ttc_socials {
    display: flex;
    align-items: center;
    gap: 80px;

    ${media.mobileLarge`
    gap: 30px;
    `}
  }

  .ttc_socials {
    &-icon {
      height: 24px;
      width: 24px;
    }
  }
`;
