import Typography from 'components/atoms/typography';
import media from 'constants/MediaQuery';
import Theme from 'constants/Theme';
import Head from 'next/head';
import React from 'react';
import styled from 'styled-components';

const CertificationApplication = () => {
  return (
    <CertificationApplicationStyling>
      <Head>
        <title>Certification Application</title>
        <meta name="description" content="TurnTable Certification | Application" />
      </Head>
      <div className="page_header">
        <Typography.Title>Register to order a plaque for your eligible song or album</Typography.Title>
      </div>
      <div className="page_content">
        <div className="page_content-section">
          <Typography.Heading style={{ lineHeight: '30px' }} level={2} fontType="WorkSans">
            Apply
          </Typography.Heading>
          <Typography.Text fontType="OpenSans" level="xlarge">
            An artiste’s certification milestone represents on-demand streams (and digital downloads where available).
          </Typography.Text>
        </div>

        <div className="page_content-section">
          <Typography.Heading style={{ lineHeight: '30px' }} level={2} fontType="WorkSans">
            Standards
          </Typography.Heading>

          <div className="standards_grid">
            <div className="standard_card">
              <Typography.Heading style={{ lineHeight: '30px', marginBottom: '12px' }} level={3} fontType="WorkSans">
                Singles
              </Typography.Heading>
              <Typography.Text fontType="OpenSans" level="xlarge">
                At the moment, the certification for single is based on audio streaming and digital downloads.
              </Typography.Text>
              <Typography.Text fontType="OpenSans" level="xlarge">
                1 unit = 150 streams
              </Typography.Text>
              <ul>
                <li><Typography.Text fontType="OpenSans" level="xlarge">Silver: 25,000 units</Typography.Text></li>
                <li><Typography.Text fontType="OpenSans" level="xlarge">Gold: 50,000 units</Typography.Text></li>
                <li><Typography.Text fontType="OpenSans" level="xlarge">Platinum: 100,000 units</Typography.Text></li>
              </ul>
            </div>

            <div className="standard_card">
              <Typography.Heading style={{ lineHeight: '30px', marginBottom: '12px' }} level={3} fontType="WorkSans">
                Album
              </Typography.Heading>
              <Typography.Text fontType="OpenSans" level="xlarge">
                The certification for an album is based on audio streaming and digital downloads. A title is classified as an ‘album’ if it has more than three singles and/or surpasses a 15-minute runtime.
              </Typography.Text>
              <Typography.Text fontType="OpenSans" level="xlarge">
                1 unit = 1500 streams
              </Typography.Text>
              <ul>
                <li><Typography.Text fontType="OpenSans" level="xlarge">Silver: 12,500 units</Typography.Text></li>
                <li><Typography.Text fontType="OpenSans" level="xlarge">Gold: 25,000 units</Typography.Text></li>
                <li><Typography.Text fontType="OpenSans" level="xlarge">Platinum: 50,000 units</Typography.Text></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="page_content-section">
          <Typography.Heading style={{ lineHeight: '30px' }} level={2} fontType="WorkSans">
            Eligible Recipients
          </Typography.Heading>
          <Typography.Text fontType="OpenSans" level="xlarge">
            Who is Eligible for a TCSN Plaque?
          </Typography.Text>
          <ul>
            <li><Typography.Text fontType="OpenSans" level="xlarge">Artiste</Typography.Text></li>
            <li><Typography.Text fontType="OpenSans" level="xlarge">Featured artiste</Typography.Text></li>
            <li><Typography.Text fontType="OpenSans" level="xlarge">Producer</Typography.Text></li>
            <li><Typography.Text fontType="OpenSans" level="xlarge">Engineer</Typography.Text></li>
            <li><Typography.Text fontType="OpenSans" level="xlarge">Studio Personnel</Typography.Text></li>
            <li><Typography.Text fontType="OpenSans" level="xlarge">Songwriter</Typography.Text></li>
            <li><Typography.Text fontType="OpenSans" level="xlarge">Background Vocalist</Typography.Text></li>
            <li><Typography.Text fontType="OpenSans" level="xlarge">Uncredited Vocalist</Typography.Text></li>
            <li><Typography.Text fontType="OpenSans" level="xlarge">Label Executive</Typography.Text></li>
            <li><Typography.Text fontType="OpenSans" level="xlarge">Marketing Executive</Typography.Text></li>
            <li><Typography.Text fontType="OpenSans" level="xlarge">Rightholders</Typography.Text></li>
            <li><Typography.Text fontType="OpenSans" level="xlarge">Management Team</Typography.Text></li>
          </ul>
        </div>

        <div className="page_content-section">
          <Typography.Heading style={{ lineHeight: '30px' }} level={2} fontType="WorkSans">
            Application
          </Typography.Heading>
          <Typography.Text fontType="OpenSans" level="xlarge">
            How to Apply for a TCSN plaque? All requests for the TCSN certification program should be sent to <a className="yellow" href="mailto:awards@turntablecharts.com">awards@turntablecharts.com</a> for approval. A representative of the parent organization will guide through the process which will include confirmation that an individual truly qualifies for the plaque requested.
          </Typography.Text>
          <Typography.Text fontType="OpenSans" level="xlarge">
            Note: All TCSN certification awards date back to the beginning of the digital era (iTunes) in Nigeria. Any request for certification for sales before the digital era falls under a special request that will be examined on a case-by-case basis.
          </Typography.Text>
        </div>

      </div>
    </CertificationApplicationStyling>
  );
};

export default CertificationApplication;

const CertificationApplicationStyling = styled.div`
  width: 100%;
  padding: 48px 0 80px;

  /* ── Large heading ── */
  .page_header {
    margin-bottom: 32px;
    display: flex;
    justify-content: center;

    h1 {
      font-family: "Work Sans", sans-serif;
      font-size: clamp(1.8rem, 3.5vw, 2.8rem);
      font-weight: 800;
      line-height: 1.15;
      color: white;
      text-align: center;
      max-width: 760px;
    }

    ${media.tablet`
      h1 { font-size: clamp(1.5rem, 4vw, 2rem); }
    `}
  }

  /* ── Content body ── */
  .page_content {
    width: 100%;
    line-height: 1.7;

    &-section {
      margin-bottom: 28px;

      h2 {
        font-family: "Work Sans", sans-serif;
        font-size: 0.95rem;
        font-weight: 700;
        color: white;
        margin-bottom: 8px;
        text-transform: none;
        letter-spacing: 0;
      }

      h3 {
        font-family: "Work Sans", sans-serif;
        font-size: 1rem;
        font-weight: 700;
        color: #f5d38a;
        margin: 0 0 10px;
      }

      p, li {
        font-family: "Work Sans", sans-serif;
        font-size: 0.92rem;
        line-height: 1.75;
        color: rgba(255, 255, 255, 0.8);

        ${media.tablet` font-size: 0.875rem; `}
      }

      ul {
        margin: 12px 0 0;
        padding-left: 20px;

        li {
          margin-bottom: 6px;
        }
      }

      ol {
        padding-left: 20px;

        li {
          margin-bottom: 20px;
        }
      }
    }
  }

  .standards_grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 20px;
    margin-top: 12px;

    ${media.tablet`
      grid-template-columns: 1fr;
    `}
  }

  .standard_card {
    padding: 20px 18px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.015);
  }

  .yellow {
    color: #f1920c;
    font-weight: 600;
    text-decoration: underline;
    cursor: pointer;
  }

  .bold {
    font-weight: 700;
    color: white;
  }
`;

