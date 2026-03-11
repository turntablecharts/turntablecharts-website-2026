import styled from 'styled-components';
import Typography from 'components/atoms/typography';
import Link from 'next/link';
import Theme from 'constants/Theme';
import media from 'constants/MediaQuery';
import WantUpdates from './WantUpdates';

const Footer = () => {
  return (
    <FooterStyling>
      <div className="footer_content">
        <div className="content_upper">
          <div className="footer_section explore">
            <Typography.Text fontType="WorkSans" weight="normal" level="large" className="section_title">
              Explore
            </Typography.Text>
            <nav className="footer_links">
              <Link href="/charts">
                <a>
                  <Typography.Text fontType="WorkSans" weight="normal" level="medium">
                    Charts
                  </Typography.Text>
                </a>
              </Link>
              <Link href="/news">
                <a>
                  <Typography.Text fontType="WorkSans" weight="normal" level="medium">
                    News
                  </Typography.Text>
                </a>
              </Link>
              <Link href="/magazines">
                <a>
                  <Typography.Text fontType="WorkSans" weight="normal" level="medium">
                    Magazines
                  </Typography.Text>
                </a>
              </Link>
              <Link href="/business">
                <a>
                  <Typography.Text fontType="WorkSans" weight="normal" level="medium">
                    Business
                  </Typography.Text>
                </a>
              </Link>
              <Link href="/certifications">
                <a>
                  <Typography.Text fontType="WorkSans" weight="normal" level="medium">
                    Certifications
                  </Typography.Text>
                </a>
              </Link>
            </nav>
          </div>

          <div className="footer_section follow">
            <Typography.Text fontType="WorkSans" weight="normal" level="large" className="section_title">
              Follow
            </Typography.Text>
            <nav className="footer_links">
              <a href="https://twitter.com/TurntableCharts" target="_blank" rel="noreferrer">
                <Typography.Text fontType="WorkSans" weight="normal" level="medium">
                  X
                </Typography.Text>
              </a>
              <a href="https://www.instagram.com/turntablecharts/" target="_blank" rel="noreferrer">
                <Typography.Text fontType="WorkSans" weight="normal" level="medium">
                  Instagram
                </Typography.Text>
              </a>
              <a href="https://facebook.com/turntablecharts" target="_blank" rel="noreferrer">
                <Typography.Text fontType="WorkSans" weight="normal" level="medium">
                  Facebook
                </Typography.Text>
              </a>
              <a href="https://linkedin.com/company/turntablecharts" target="_blank" rel="noreferrer">
                <Typography.Text fontType="WorkSans" weight="normal" level="medium">
                  LinkedIn
                </Typography.Text>
              </a>
            </nav>
          </div>

          <div className="footer_section updates">
            <WantUpdates />
          </div>
        </div>
      </div>

      <div className="footer_notice">
        <Typography.Text fontType="WorkSans" weight="normal" level="small" className="notice_text">
          TurnTable Charts is part of TurnTable Media, Data and Analytics. ©️TMDA 2026. All Rights Reserved
        </Typography.Text>
      </div>
    </FooterStyling>
  );
};

export default Footer;

const FooterStyling = styled.footer`
  width: 100%;
  background-color: ${Theme.colorPalette.black};
  color: ${Theme.colorPalette.white};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 0 40px 0;

  ${media.mobileLarge`
    padding: 40px 0 30px 0;
  `}

  .footer_content {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    .content_upper {
      max-width: 1200px;
      width: 90%;
      height: 240px;
      display: grid;
      grid-template-columns: 1fr 1fr 2fr;
      gap: 60px;
      align-items: start;
      margin-bottom: 40px;

      ${media.tablet`
        grid-template-columns: 1fr 1fr;
        height: auto;
        gap: 40px;
        
        .updates {
          grid-column: 1 / -1;
        }
      `}

      ${media.mobileLarge`
        grid-template-columns: 1fr;
        height: auto;
        gap: 40px;
      `}
    }
  }

  .footer_section {
    display: flex;
    flex-direction: column;
    gap: 20px;
    height: 100%;

    &.updates {
      /* Override WantUpdates component styles for footer context */
      > div {
        background-image: none;
        padding: 0;
        margin: 0;
        width: 100%;
        max-width: 100%;
        text-align: left;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .updates_texts {
          width: 100%;
          text-align: left;
          margin-bottom: 10px;

          .header {
            font-family: 'Roboto Flex', sans-serif;
            font-size: 42px;
            font-weight: 850;
            text-transform: uppercase;
            line-height: 0.9;
            text-align: left;
            width: 100%;
            letter-spacing: -2.5px;
          }

          .body {
            color: ${Theme.colorPalette.white};
            font-size: 0.875rem;
            line-height: 1.5;

            p {
              color: ${Theme.colorPalette.white};
            }
          }
        }

        form {
          flex-direction: row;
          align-items: center;
          padding: 0;
          gap: 12px;
          margin-top: auto;

          input {
            flex: 1;
            background-color: ${Theme.colorPalette.white};
            border: none;
            outline: none;
            padding: 12px 16px;
            border-radius: 4px;

            &:focus {
              outline: 2px solid ${Theme.colorPalette.ttcYellow};
            }
          }

          button {
            background-color: ${Theme.colorPalette.ttcYellow};
            color: ${Theme.colorPalette.black};
            border: none;
            font-weight: 600;
            padding: 12px 24px;
            border-radius: 4px;
            cursor: pointer;
            white-space: nowrap;

            &:hover {
              background-color: #e6a800;
              border: none;
            }
          }
        }
      }

      ${media.mobileLarge`
        > div {
          .updates_texts .header {
            font-size: 1.5rem;

            h1, h2 {
              font-size: 1.5rem;
            }
          }

          form {
            flex-direction: column;
            align-items: stretch;

            input {
              width: 100%;
            }

            button {
              width: 100%;
            }
          }
        }
      `}
    }

    .section_title {
      color: ${Theme.colorPalette.textGrey};
      letter-spacing: -0.5px;
      font-size: 1rem;
      margin-bottom: 10px;
    }

    .footer_links {
      display: flex;
      flex-direction: column;
      gap: 12px;

      a {
        color: ${Theme.colorPalette.white};
        text-decoration: underline;
        transition: color 0.3s ease;

        &:hover {
          color: ${Theme.colorPalette.ttcYellow};
        }

        p {
          color: inherit;
        }
      }
    }
  }

  .footer_notice {
    max-width: 1200px;
    width: 90%;
    padding-top: 40px;
    border-top: 1px solid rgba(255, 255, 255, 0.2);

    .notice_text {
      color: white;
      font-size: 0.875rem;
      line-height: 1.6;

      ${media.mobileLarge`
        font-size: 0.75rem;
      `}
    }
  }
`;

