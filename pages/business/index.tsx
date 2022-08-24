/* eslint-disable @next/next/no-img-element */
import Typography, { Text } from "components/atoms/typography";
import styled from "styled-components";
import TTCIconTrophy from "assets/icons/trophy.svg";
import TTCIconB2B from "assets/icons/b2b.svg";
import TTCIconAdvert from "assets/icons/advert.svg";
import TTCIconPartner from "assets/icons/partner.svg";
import Theme from "constants/Theme";
import media from "constants/MediaQuery";

const Business = () => {
  return (
    <BusinessStyling>
      <div className="business_hero">
        <div className="business_container">
          <Text level="extralarge" fontType="Mermaid" className="business_text">
            Chart, brand licensing & partnerships, product & data support,
            marketing to consumers through our social media and website – there
            are many ways TurnTable Charts can support your business needs.
          </Text>
          {/* <div className="rel">
            <img
              className="business_img"
              src="/assets/businessImg.png"
              alt="businessImg"
            />
            <Text level="xlarge" fontType="SFProText" className="rel_text">
              Chart and brand licensing & partnerships, product & data support,
              marketing to consumers through our social media and website –
              there are many ways TurnTable Charts can support your business
              needs.
            </Text>
          </div> */}
        </div>
      </div>
      <div className="business_rel">
        <img
          className="business_img"
          src="/assets/businessImg.png"
          alt="businessImg"
        />
        <div className="rel_text">
          <Text level="xlarge" fontType="SFProText">
            TTC is a B2B and B2C business offering to individuals and companies,
            a wide range of products and services to global music and media
            industries. We offer services tailored to the demands of labels,
            artiste managers, studio houses, PR houses, advertising agencies,
            consumer brands and many more.
          </Text>
          <Text level="xlarge" fontType="SFProText">
            The analysis and consumer behavior trends from our database enables
            us to provide data support and solutions for any business with an
            interest in and requirement for Nigerian and African entertainment.
          </Text>
          <Text level="xlarge" fontType="SFProText">
            With our new No. 1 Award Initiative, we serve music labels,
            publishers, distributors, A&Rs and management companies looking to
            celebrate their chart-toppers in Nigeria (singles, streaming
            milestones and albums).
          </Text>
          <Text level="xlarge" fontType="SFProText">
            TTC offer data-backed content solutions to media partners, licensees
            and creators of consumer-facing products through the provision of
            current and historic chart information as well as licensing and
            syndication of charts.
          </Text>
        </div>
        <div className="business_services">
          <div className="services_header">
            <Typography.Heading fontType="Mermaid" level={1}>
              Our Services
            </Typography.Heading>
          </div>
          <div className="service_cards">
            <div className="card">
              <div className="icon">
                <TTCIconTrophy style={{ height: "40px", width: "40px" }} />
              </div>
              <Text level="xlarge" fontType="Mermaid" className="title">
                No. 1 Award Initiative
              </Text>
              <Text level="xlarge" fontType="SFProText" className="content">
                Celebrate your No. 1 singles in Nigeria by ordering your own No.
                1 award. The purpose of this new initiative is to celebrate
                success, amplify unique achievement and recognize the unsung
                heroes of artistic milestones – from record label executives,
                producers, songwriters, A&Rs, engineers and more. You can order
                your own No. 1 award provided there is sufficient evidence of
                your role in the creation of a single that peaked at No. 1 on
                the Nigeria Top 100.
              </Text>
            </div>
            <div className="card">
              <div className="icon">
                <TTCIconB2B style={{ height: "40px", width: "40px" }} />
              </div>
              <Text level="xlarge" fontType="Mermaid" className="title">
                B2B Data
              </Text>
              <Text level="xlarge" fontType="SFProText" className="content">
                TTC offers insight into consumer behavior trends needed by
                independent and biggest music companies, local and global movie
                studios, artiste & talent management companies, advertising
                brands, companies that provide consumer products and more. TTC
                offers solution any business with an interest in and requirement
                of Nigerian music, as we provide a comprehensive overview of
                consumption patterns as well as historical and emerging consumer
                behavior. To discuss your business need, please reach out to
                <span className="yellow"> home@turntablecharts.com</span>
              </Text>
            </div>
            <div className="card">
              <div className="icon">
                <TTCIconAdvert style={{ height: "40px", width: "40px" }} />
              </div>
              <Text level="xlarge" fontType="Mermaid" className="title">
                Advertising
              </Text>
              <Text level="xlarge" fontType="SFProText" className="content">
                Tap into TTC unique, steadfast and fast-growing audience to
                market your products and other business needs. For all
                advertising, brand sponsorships and other business needs related
                to marketing, contact
                <span className="yellow"> kd@turntablecharts.com</span>
              </Text>
            </div>
            <div className="card">
              <div className="icon">
                <TTCIconPartner style={{ height: "40px", width: "40px" }} />
              </div>
              <Text level="xlarge" fontType="Mermaid" className="title">
                Brand Licensing, Partnership & Syndication
              </Text>
              <Text level="xlarge" fontType="SFProText" className="content">
                In two years, we have created a unique brand with partnership
                with both local and international organizations including
                international record labels, music distributors, video-sharing
                platforms, social media platforms, media companies, news
                organization and many more. Our charts are comprehensive;
                flagship charts are Nigeria Top 100, streaming to airplay
                charts. Artiste Top 100, Producer Top 100; genres charts include
                Afro-Pop, R&B, Street-POP, Hiphop, Gospel, Alternative which
                focuses on all the genres not associated with mainstream;
                Traditional which cuts across different traditional genre
                associated with Africa (Juju, Fuji, Egedege, Arewa Pop, Zulu and
                many more), and other charts such as Top International Songs and
                NXT Emerging Artiste Top Songs.
                <br />
                <br />
                For more information on licensing, brand partnership and
                syndication, contact
                <span className="yellow"> kd@turntablecharts.com</span>
              </Text>
            </div>
          </div>
          <Text
            level="xlarge"
            fontType="SFProText"
            style={{ textAlign: "center" }}>
            For more details, contact
            <span className="yellow"> home@turntablecharts.com</span>
          </Text>
        </div>
      </div>
    </BusinessStyling>
  );
};

export default Business;

const BusinessStyling = styled.div`
  .business_hero {
    height: calc(100vh - 80px);
    background-image: url("/assets/businessBG.png");
    background-size: cover;
    background-position: center;
    padding-top: 150px;
    ${media.tablet`
    padding-top: 80px;
    `}
    .business_container {
      max-width: 1200px;
      width: 90%;
      margin: 0 auto;

      .business_text {
        line-height: 77px;
        text-align: center;

        ${media.smallDesktop`
        font-size: 30px;
        line-height: 40px;
        `}
        ${media.mobileLarge`
      font-size: 24px;
      line-height: 30px;
    `}
      }
    }
  }

  .business_rel {
    max-width: 1200px;
    width: 90%;
    margin: 0 auto;
    position: relative;
    top: -290px;

    ${media.tablet`
    top: -390px;
    `}

    .business_img {
      width: 100%;
    }

    .rel_text {
      max-width: 780px;
      width: 95%;
      margin: 80px auto;

      p {
        margin-bottom: 20px;
        ${media.mobileLarge`
          font-size: 16px;
        `}
      }
    }
  }

  .business_services {
    .services_header {
      text-align: center;
    }

    .service_cards {
      margin: 120px 0;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 80px;
      ${media.tablet`
      grid-template-columns: 1fr;
      margin: 60px 0;

    `}
      .card {
        display: flex;
        flex-direction: column;
        gap: 20px;
        .content {
          line-height: 32px;
          ${media.mobileLarge`
          font-size: 16px;
          line-height: 24px;
        `}
        }
      }
    }
  }

  .icon {
    height: 100px;
    width: 100px;
    background: ${Theme.colorPalette.ttcYellow}33;
    display: grid;
    place-items: center;
  }
`;
