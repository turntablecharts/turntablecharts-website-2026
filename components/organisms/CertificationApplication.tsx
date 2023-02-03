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
          <Typography.Heading style={{ lineHeight: '30px' }} level={2} fontType="Mermaid">
            Apply
          </Typography.Heading>
          <Typography.Text fontType="SFProText" level="xlarge">
            An artiste’s certification milestone represents on-demand streams (and digital downloads).
          </Typography.Text>
        </div>
        <div className="page_content-section">
          <Typography.Heading style={{ lineHeight: '30px' }} level={2} fontType="Mermaid">
            Audit of Streaming Numbers Requirements
          </Typography.Heading>
        </div>
        <div className="page_content-section">
          <Typography.Heading style={{ lineHeight: '30px' }} level={2} fontType="Mermaid">
            Certification Application Process
          </Typography.Heading>
          <ol>
            <li>
              <Typography.Text fontType="SFProText" level="xlarge">
                All requests for the TCSN certification program should be sent to <span className="yellow">tcsn@turntablecharts.com</span> for
                approval with the following filled out in the request sheet (download sheet here). Please note that the required information must be
                complete in the excel sheet for a certification request to be considered. Also, do familiarize yourself with the details of the Excel
                sheet and reach out to <span className="yellow">tcsn@turntablecharts.com</span> if you have any questions.
              </Typography.Text>
            </li>
            <li>
              <Typography.Text fontType="SFProText" level="xlarge">
                Kindly fill out every required field in the sheet. The <span className="bold">Requested By</span> field is the point of contact during
                the certification process for any questions from TurnTable. In cases where the Billing Contact and Requested By Contact are same
                individual, kindly enter the information in both fields.
              </Typography.Text>
            </li>
            <li>
              <Typography.Text fontType="SFProText" level="xlarge">
                <span className="bold">Only one invoice can be generated per request</span>. If you require multiple invoices for multiple artistes,
                you will need to submit multiple Excel sheets.
              </Typography.Text>
            </li>
            <li>
              <Typography.Text fontType="SFProText" level="xlarge">
                Kindly select the highest certification level you’re requesting for; Silver, Gold, Platinum or Multi-Platinum. Also, indicate if the
                title has been certified before. If you’re unsure of this, check the <span className="bold">Display</span> section on the website.
              </Typography.Text>
            </li>
            <li>
              <Typography.Text fontType="SFProText" level="xlarge">
                Check for all eligible titles (songs/albums) for certification and what level of certification they are eligible for at any period by
                checking the <span className="bold">Eligible Titles</span> section.
              </Typography.Text>
            </li>
            <li>
              <Typography.Text fontType="SFProText" level="xlarge">
                If every field on the request form is not completed, you will be notified by a representative of TurnTable.
              </Typography.Text>
            </li>
            <li>
              <Typography.Text fontType="SFProText" level="xlarge">
                You may submit multiple titles for certification on the request sheet and receive a bulk discount. This discount only applies to
                titles that have the same billing contact, submitted on one request and available on one invoice. For more information on the
                discount, kindly email <span className="yellow">tcsn@turntablecharts.com</span>.
              </Typography.Text>
            </li>
            <li>
              <Typography.Text fontType="SFProText" level="xlarge">
                A supporting documentation is required, detailing streaming & digital download report (for streams within Nigeria only). Additional
                supporting documentation is a one sheet/product sheet which contains information about the album or track such as artiste, title,
                version description (album, radio edit, remix, live, acoustic, sped-up version etc), product number (UPC/ISRC), runtime and credits
                etc.
              </Typography.Text>
            </li>
            <li>
              <Typography.Text fontType="SFProText" level="xlarge">
                Once all the required documentation is provided and the Excel sheet is completed, your request for certification will be approved.
              </Typography.Text>
            </li>
          </ol>
        </div>
        <div className="page_content-section">
          <Typography.Text fontType="SFProText" level="xlarge" weight="semiBold">
            If you have any question, email tcsn@turntablecharts.com.
          </Typography.Text>
        </div>
        <div className="page_content-section">
          <Typography.Text fontType="SFProText" level="xlarge" weight="semiBold">
            Note: All TCSN certification awards date back to beginning of digital era (iTunes) in Nigeria.
          </Typography.Text>
        </div>
      </div>
    </CertificationApplicationStyling>
  );
};

export default CertificationApplication;

const CertificationApplicationStyling = styled.div`
  .page_header {
    padding: 7vh 0;
    text-align: center;

    h1 {
      font-size: 48px;
    }

    ${media.tablet`
    padding: 3vh 0;
      h1 {
        font-size: 36px;

      }
    `}
  }

  .page_content {
    max-width: 673px;
    width: 95%;
    margin: 80px auto;
    line-height: 30px;

    ${media.tablet`
    margin: 40px auto;
    `}

    &-section {
      margin-bottom: 30px;

      p {
        /* text-align: justify; */
        ${media.tablet`

        font-size: 16px;

      
    `}
      }

      ol {
        li {
          margin-bottom: 25px;
          font-family: ${Theme.typography.extra};
          font-size: ${Theme.fontSizes.xlarge};
          ${media.tablet`

font-size: 16px;


`}
        }
      }
    }
  }
`;
