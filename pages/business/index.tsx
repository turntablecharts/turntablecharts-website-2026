/* eslint-disable @next/next/no-img-element */
import styled from "styled-components";
import CupIcon from "assets/icons/cup.svg";
import media from "constants/MediaQuery";

const SERVICES = [
  {
    id: "award",
    color: "#2EAF7D",
    title: "No. 1 Award Initiative",
    body: "You can order a No. 1 award to celebrate songs that reached No. 1 on the Nigeria Top 100, recognizing both success and the behind-the-scenes contributors who helped make the hit.",
  },
  {
    id: "b2b",
    color: "#F1A01F",
    title: "B2B Data",
    body: "You can order a No. 1 award to celebrate songs that reached No. 1 on the Nigeria Top 100, recognizing both success and the behind-the-scenes contributors who helped make the hit.",
  },
  {
    id: "advert",
    color: "#00B4D8",
    title: "Advertising",
    body: "You can order a No. 1 award to celebrate songs that reached No. 1 on the Nigeria Top 100, recognizing both success and the behind-the-scenes contributors who helped make the hit.",
  },
  {
    id: "brand",
    color: "#E84855",
    title: "Brand Licensing, Partnership & Syndication",
    body: "You can order a No. 1 award to celebrate songs that reached No. 1 on the Nigeria Top 100, recognizing both success and the behind-the-scenes contributors who helped make the hit.",
  },
];

const Business = () => {
  return (
    <BusinessStyling>
      {/* ── Top section: image + intro text (matches news page width) ── */}
      <div className="biz_article">
        <div className="biz_hero">
          <img src="/assets/businessImg.png" alt="TurnTable Charts Business" />
        </div>

        <h1 className="biz_headline">
          TurnTable Charts supports your business through chart access,
          partnerships, data solutions, and consumer marketing.
        </h1>

        <div className="biz_body">
          <p>
            TTC is a B2B and B2C business offering to individuals and companies,
            a wide range of products and services to global music and media
            industries. We offer services tailored to the demands of labels,
            artiste managers, studio houses, PR houses, advertising agencies,
            consumer brands and many more.
          </p>
          <p>
            The analysis and consumer behavior trends from our database enables
            us to provide data support and solutions for any business with an
            interest in and requirement for Nigerian and African entertainment.
          </p>
          <p>
            With our new No. 1 Award Initiative, we serve music labels,
            publishers, distributors, A&Rs and management companies looking to
            celebrate their chart-toppers in Nigeria (singles, streaming
            milestones and albums).
          </p>
          <p>
            TTC offer data-backed content solutions to media partners, licensees
            and creators of consumer-facing products through the provision of
            current and historic chart information as well as licensing and
            syndication of charts.
          </p>
        </div>
      </div>

      {/* ── Services section: dark + backgroundBG ── */}
      <div className="biz_services">
        <div className="biz_services-inner">
          <div className="biz_cards">
            {SERVICES.map((svc) => (
              <div key={svc.id} className="biz_card">
                <div
                  className="biz_card-icon"
                  style={{ backgroundColor: svc.color }}
                >
                  <CupIcon aria-hidden="true" />
                </div>
                <h3 className="biz_card-title">{svc.title}</h3>
                <p className="biz_card-desc">{svc.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </BusinessStyling>
  );
};

export default Business;

const BusinessStyling = styled.div`
  width: 100%;
  background-color: #0d0d0d;
  color: white;
  padding-top: 80px;

  /* ══════════════════════════════
     TOP ARTICLE SECTION
     (matches news page 80vw layout)
  ══════════════════════════════ */
  .biz_article {
    width: 80vw;
    margin: 0 auto;
    padding: 48px 0 72px;

    ${media.smallDesktop` width: 88vw; `}
    ${media.tablet` width: 92vw; `}
    ${media.mobileLarge` width: 100%; padding: 32px 20px 48px; `}
  }

  .biz_hero {
    width: 100%;
    margin-bottom: 40px;

    img {
      width: 100%;
      height: auto;
      display: block;
    }
  }

  .biz_headline {
    font-family: "Work Sans", sans-serif;
    font-size: clamp(1.5rem, 2.8vw, 2.2rem);
    font-weight: 700;
    color: white;
    line-height: 1.25;
    margin-bottom: 28px;
  }

  .biz_body {
    text-align: left;

    p {
      font-family: "Work Sans", sans-serif;
      font-size: 0.95rem;
      line-height: 1.75;
      color: rgba(255, 255, 255, 0.7);
      margin-bottom: 16px;
    }
  }

  /* ══════════════════════════════
     SERVICES SECTION (dark)
  ══════════════════════════════ */
  .biz_services {
    background-color: #0d0d0d;
    background-image: url("/assets/businessBG.png");
    background-size: cover;
    background-position: center;
    padding: 80px 0 100px;
  }

  .biz_services-inner {
    width: 80vw;
    margin: 0 auto;

    ${media.smallDesktop` width: 88vw; `}
    ${media.tablet` width: 92vw; `}
    ${media.mobileLarge` width: calc(100% - 40px); `}
  }

  .biz_services-heading {
    font-family: "Anton", sans-serif;
    font-size: clamp(1.6rem, 3vw, 2.4rem);
    font-weight: 400;
    color: white;
    text-transform: uppercase;
    text-align: center;
    margin-bottom: 56px;
  }

  /* 2 × 2 card grid */
  .biz_cards {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;

    ${media.tablet`
      grid-template-columns: 1fr;
      gap: 20px;
    `}
  }

  /* Individual card */
  .biz_card {
    background: #1a1a1a;
    border: 1px solid rgba(255, 255, 255, 0.07);
    border-radius: 12px;
    padding: 32px 28px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 16px;
    height: 350px;
  }

  .biz_card-icon {
    width: 52px;
    height: 52px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;

    svg {
      width: 26px;
      height: 26px;
      fill: white;
      color: white;
    }
  }

  .biz_card-title {
    font-family: "Work Sans", sans-serif;
    font-size: 1rem;
    font-weight: 700;
    color: white;
    line-height: 1.3;
    margin: 0;
  }

  .biz_card-desc {
    font-family: "Work Sans", sans-serif;
    font-size: 0.875rem;
    line-height: 1.65;
    color: rgba(255, 255, 255, 0.55);
    margin: 0;
  }

  .biz_card-email {
    color: #f1a01f;
    text-decoration: none;

    &:hover { text-decoration: underline; }
  }
`;
