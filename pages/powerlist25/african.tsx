import React from 'react';
import styled from 'styled-components';
import media from 'constants/MediaQuery';

const GOLD = '#C5B57A';

// ── Use this as a sentinel id to wire up the sidebar button ──
export const AFRICAN_GLOBAL_ID = 'african-global' as const;
export type ActiveCategory = number | typeof AFRICAN_GLOBAL_ID | null;

interface StaticHonoree {
  name: string;
  industry: string;
  bio: string;
  grouped?: boolean;
}

const HONOREES: StaticHonoree[] = [
  {
    name: 'Alexa Rae Perkins',
    industry: 'Management',
    bio: "Alexa Rae Perkins is a music executive and talent manager best known for her work with Nigerian superstar Asake. With a background spanning major music companies including EMPIRE, Def Jam, Capitol Records, and TuneCore, she has built a reputation for artist development, global marketing, and strategic career management. Perkins has played a key role in Asake's international expansion, helping guide his transition from a Nigerian hitmaker to a globally recognized Afrobeats star through major touring, branding, and cultural initiatives.",
  },
  {
    name: 'Jada Pollock',
    industry: 'Management',
    bio: "Jada Pollock (Jada P) is a visionary music executive whose influence extends far beyond traditional artist management. Best known as one of the architects behind Wizkid's global positioning, she has spent over a decade helping transform one of Africa's biggest stars into a worldwide cultural force. With a sharp understanding of branding, international markets, and artist development, Jada has navigated landmark collaborations, global campaigns, and career-defining moments that have expanded the reach of Afrobeats on the world stage.",
  },
  {
    name: 'Adam Tiran',
    industry: 'Label',
    bio: "Adam Tiran is a British-South African music executive, label founder, and cultural strategist with over a decade of experience driving the growth of African music globally. As Director of Operations and International Lead at Africori, he has helped shape the careers of artists including Master KG, Bien, Sjava, Blxckie, Marioo, and Rexxie. He is also the founder of Outer South, a creative hub and record label championing forward-thinking talents such as Tim Lyre and Suté Iwar, cementing his reputation as one of the key architects behind Africa's evolving music ecosystem.",
  },
  {
    name: 'Tshwanelo Maredi',
    industry: 'Group',
    bio: "Tshwanelo Maredi is a music and culture executive with over a decade of experience shaping the global narrative around African music. As Director of Artist Development at LVRN, she helps drive talent strategy and artist growth within one of the industry's most influential creative collectives. Her career spans editorial strategy, artist and label relations, and global campaign execution, with previous leadership roles at Apple Music, TRACE, and MultiChoice.",
  },
  {
    name: 'Aubrey Mensah',
    industry: 'Management',
    bio: "Aubrey Mensah is a Ghanaian music executive, artiste manager, and A&R professional best known for managing Black Sherif and Exo Xan. With a background in music strategy and artist development, he previously served as Head of Content Acquisition at Boomplay Music Ghana before taking the helm at Road Boys Gram, where he continues to play a pivotal role in shaping the careers of emerging and established African talent.",
  },
  {
    name: 'Taponeswa Mavunga',
    industry: 'Label',
    bio: "Taponeswa Mavunga is a Zimbabwean music executive and cultural strategist shaping the global future of African music. As Director of Africa at Sony Music UK, she leads efforts to connect African talent with international opportunities and expand the continent's influence across global markets. Prior to this, she served as Head of Talent and Music at Viacom Africa, overseeing talent and music strategy across MTV Base, BET Africa, and Nickelodeon.",
  },
  {
    name: 'Diba Diallo',
    industry: 'Management',
    bio: "Diba Diallo is an Ivorian music executive, talent manager, and entrepreneur whose work has helped position Côte d'Ivoire as a growing force in the global music industry. As the founder of Repat Agency, she has built a reputation for identifying and elevating African talent through strategic management, branding, and international market expansion. Widely recognized as a key architect behind the success of Didi-B, she has played an instrumental role in transforming local success into global recognition.",
  },
  {
    name: 'Karl Anderson',
    industry: 'Streaming',
    bio: "Karl Anderson is the Head of Music, Africa at Apple Music, where he leads the platform's music strategy and artist engagement across the continent. A veteran music executive with over 30 years of experience, he previously held senior roles at EMI and RPM Records and founded the acclaimed South African independent label Just Music. He is recognized as one of the leading figures driving the global growth of African music.",
  },
  {
    name: 'Jarrod Assenheim',
    industry: 'Media',
    bio: "Jarrod Assenheim is a South African music-tech entrepreneur and rights management expert with nearly four decades of experience at the forefront of the music business. As the founder of Audlytics, he is pioneering data-driven solutions that help artists and rights holders unlock greater value from their music. Blending deep industry knowledge with technological innovation, Assenheim continues to shape the future of music rights, insights, and revenue generation across Africa and beyond.",
  },
  {
    name: 'Brandon Hixon',
    industry: 'Management',
    bio: "Brandon Hixon is a music executive, entrepreneur, and talent manager whose career has been defined by building global pathways for exceptional artists. As the founder of We Make Music and co-manager of Tyla, he has been instrumental in transforming one of Africa's brightest stars into a worldwide phenomenon.",
  },
  {
    name: 'Colin Gayle',
    industry: 'Management',
    bio: "Colin Gayle is a business development executive, entrepreneur, and creative strategist with more than 20 years of experience across the media, entertainment, and communications industries. As the founder of Africa Creative Agency (ACA) and co-manager of Tyla, he has been instrumental in building pathways for African talent to thrive on the global stage. Leveraging a career that spans collaborations with Warner Bros., G-Unit Records, African Fashion International, Essence, and the Motsepe Foundation, Gayle combines commercial expertise with cultural insight to drive artist growth, brand development, and international expansion.",
    grouped: true,
  },
  {
    name: 'Sivu Mfenyana',
    industry: 'Management',
    bio: "Sivu Mfenyana is a music industry professional and project strategist dedicated to advancing African talent on the global stage. As Senior Project Manager at Africa Creative Agency (ACA), she oversees the execution of key initiatives that support artist growth, brand development, and international expansion. Prior to ACA, she played a vital role at Sony Music Entertainment, where she coordinated label operations, drove streaming growth, and led promotional campaigns that enhanced artist visibility.",
    grouped: true,
  },
  {
    name: 'Jules Ferree',
    industry: 'Management',
    bio: "Jules Ferree is a music and entertainment executive serving as President of Brands & Ventures at HYBE America, where she leads brand partnerships, consumer ventures, and strategic business development. With over 15 years of experience at the intersection of music, culture, and commerce, she has crafted impactful collaborations for global artists including Justin Bieber, Ariana Grande, Karlie Kloss, J Balvin, and Demi Lovato. Recognized by Billboard's 40 Under 40 and Women in Music, Ferree is known for building innovative partnerships that connect artists, brands, and audiences on a global scale.",
    grouped: true,
  },
  {
    name: 'Junia Abaidoo',
    industry: 'Group',
    bio: "Junia Abaidoo is a music executive and operations strategist serving as Co-Founder and Head of Operations & Touring at LVRN. He has played a pivotal role in scaling culturally influential talent while building the operational infrastructure that powers long-term success. With expertise spanning touring, artist development, and business operations, Abaidoo has established himself as a key architect behind LVRN's rise as one of the music industry's most influential creative collectives.",
  },
  {
    name: 'Thulani "Thuli" Keupilwe',
    industry: 'Management',
    bio: "Thulani Keupilwe is a South African talent manager, booking executive, and brand strategist renowned for shaping some of the country's most influential music careers. As the founder of Lawk Communications, she has built a leading talent and brand agency while managing industry heavyweights such as DJ Maphorisa and Kabza de Small. With over a decade of experience spanning artist management, bookings, label operations, and brand partnerships, Thuli has played a pivotal role in elevating Amapiano from a local movement to a global cultural force.",
  },
  {
    name: 'Cristiana Votta',
    industry: 'Management',
    bio: "Cristiana Votta is a music executive, artist manager, and cultural strategist whose career has been defined by a thoughtful approach to talent development and global growth. As Managing Director and Partner at Alegria Agency, she guides the careers of internationally recognized artists while working closely with Black Coffee Entertainment, helping shape opportunities at the intersection of music, culture, and business. With over a decade of experience, Votta has earned a reputation for identifying talent early and building sustainable careers.",
  },
  {
    name: 'Sallam SK Mendes',
    industry: 'Management',
    bio: "Sallam SK is a Tanzanian music executive and visionary talent manager best known for helping transform Wasafi from a local record label into one of Africa's most influential entertainment powerhouses. Working alongside Diamond Platnumz from the label's early days, he played a pivotal role in building the business, developing talent, and expanding Wasafi's global footprint. Through his leadership, artists such as Harmonize, Rayvanny, and Zuchu emerged as some of East Africa's biggest stars, while initiatives like Wasafi TV and Wasafi FM redefined how African music is distributed and consumed.",
  },
  {
    name: 'Babu Tale (Hamisi Taletale)',
    industry: 'Management',
    bio: "Babu Tale (Hamisi Taletale) is a Tanzanian entertainment executive, talent manager, and entrepreneur whose influence has been central to the rise of East Africa's modern music industry. As co-founder of WCB Wasafi, he helped transform the label into a cultural powerhouse, guiding the careers of some of Tanzania's biggest stars and contributing to the global expansion of Bongo Flava.",
    grouped: true,
  },
  {
    name: 'Mkubwa Fella (Said Fella)',
    industry: 'Management',
    bio: "Mkubwa Fella is a Tanzanian talent manager and music executive widely regarded as one of the architects of modern Bongo Flava. Through his influential talent platform, Mkubwa na Wanawe, he played a crucial role in discovering, developing, and promoting some of Tanzania's biggest stars. Among his most notable successes was Diamond Platnumz, whose early career Fella helped shape through strategic management, industry connections, and relentless promotion.",
    grouped: true,
  },
  {
    name: 'Charlotte Bwana',
    industry: 'Streaming',
    bio: "Charlotte Bwana is a music marketing executive and cultural strategist serving as Vice President of Marketing for Europe, Africa, and MENA at Audiomack. Recognized as a Billboard Global Power Player 2026, she has been instrumental in driving the platform's growth across emerging and established music markets, helping connect artists with audiences on a global scale. Known for her expertise in audience development, artist marketing, and cultural storytelling, Bwana has become a leading voice in shaping how African and global music is discovered and celebrated in the digital era.",
  },
  {
    name: 'Phresh Kobby',
    industry: 'Management',
    bio: "Phresh Kobby is a visionary music executive and the culturally astute manager driving the strategic rollout and global trajectory of Ghanaian hip-hop powerhouse Kweku Smoke. Celebrated for his sharp creative direction and deep roots in the sonic landscape, Kobby seamlessly bridges authentic storytelling with innovative, legacy-building industry strategy.",
  },
  {
    name: "Neo 'Macfowlen' Makate",
    industry: 'Management',
    bio: "Neo 'Macfowlen' Makate is the Founder of Waltz Music Group. Operating at the intersection of heritage and sonic innovation, he masterminds the trajectories of vanguard talents JAZZWRLD, Thukuthela & GL_Ceejay. Well-known for his sharp industry intuition, he remains a vital force in shaping the next frontier of independent music and preserving true album culture.",
  },
  {
    name: 'Phiona Okumu',
    industry: 'Streaming',
    bio: "Phiona Okumu is the Head of Music for Sub-Saharan Africa at Spotify, where she leads regional music strategy, artist partnerships, and industry engagement across the continent. A respected music executive with previous leadership experience at Apple Music, she has played a significant role in advancing the global visibility of African music. Passionate about talent development and cultural innovation, Okumu continues to champion emerging and established African artists while helping shape the future of music streaming in Africa.",
  },
  {
    name: 'Warren Bokwe',
    industry: 'Streaming',
    bio: "Warren Bokwe is the Lead for Music Strategy & Operations for Sub-Saharan Africa at Spotify. With extensive experience in artist relations, label partnerships, and digital music strategy, he works at the intersection of music, technology, and culture to drive the growth of African music across global streaming audiences. Passionate about artist development and industry innovation, Bokwe plays a key role in shaping Spotify's music ecosystem across the African continent.",
  },
  {
    name: 'Arnaud Gadagada',
    industry: 'Management',
    bio: "Arnaud Gadagada is a talent manager best known for guiding the career of Ivorian drill and rap star Himra. As Himra's manager, Gadagada has played a key role in the artist's rise from a local rap sensation to one of the most internationally recognized voices in Francophone African music. His management has coincided with a period of rapid growth for the rapper, including major festival appearances, award wins, international performances, and increased visibility across Europe and Africa.",
  },
];

const AfricanGlobalHonorees: React.FC = () => (
  <SectionWrap>
    <div className="cat_heading">
      <h2 className="cat_heading_text">African &amp; Global Honorees</h2>
    </div>

    <Grid>
      {HONOREES.map((honoree, index) => (
        <Card key={`${honoree.name}-${index}`} className={honoree.grouped ? 'grouped' : ''}>
          <div className="card_divider" />
          <span className="card_name">{honoree.name}</span>
          <span className="card_tag">{honoree.industry.toUpperCase()}</span>
          <p className="card_bio">{honoree.bio}</p>
        </Card>
      ))}
    </Grid>
  </SectionWrap>
);

export default AfricanGlobalHonorees;

/* ─────────────────────── Styles ─────────────────────── */

const SectionWrap = styled.div`
  .cat_heading {
    padding: 60px 80px 20px;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 2px;
      background: white;
    }

    ${media.tablet`padding: 40px 40px 28px;`}
    ${media.mobileLarge`padding: 28px 20px 20px;`}
  }

  .cat_heading_text {
    font-family: 'Anton', sans-serif;
    font-size: clamp(2.5rem, 5vw, 4.5rem);
    font-weight: 400;
    color: white;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    margin: 0;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  margin-top: 20px;
  padding: 0 52px 60px;

  ${media.tablet`padding: 0 28px 48px;`}
  ${media.mobileLarge`
    grid-template-columns: 1fr;
    padding: 0 20px 40px;
  `}
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  padding: 40px 36px 44px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  border-right: 1px solid rgba(255, 255, 255, 0.06);

  &:nth-child(2n) {
    border-right: none;
  }

  /* Grouped sub-entries: dimmed to signal they share a slot with the entry above */
  &.grouped {
    .card_divider { opacity: 0.3; }
    .card_name { opacity: 0.8; }
  }

  .card_divider {
    width: 52px;
    height: 3px;
    background: ${GOLD};
    margin-bottom: 18px;
    opacity: 0.8;
    flex-shrink: 0;
  }

  .card_name {
    font-family: 'Nohemi', sans-serif;
    font-size: clamp(1.05rem, 1.6vw, 1.4rem);
    font-weight: 800;
    color: ${GOLD};
    line-height: 1.2;
    margin-bottom: 12px;
  }

  .card_tag {
    display: inline-block;
    padding: 5px 14px;
    border: 1px solid ${GOLD};
    border-radius: 100px;
    font-family: 'Work Sans', sans-serif;
    font-size: 0.65rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    color: ${GOLD};
    align-self: flex-start;
    margin-bottom: 18px;
  }

  .card_bio {
    font-family: 'Work Sans', sans-serif;
    font-size: 0.84rem;
    line-height: 1.85;
    color: rgba(255, 255, 255, 0.6);
    margin: 0;
    flex: 1;
  }

  ${media.mobileLarge`
    padding: 28px 0 32px;
    border-right: none;

    .card_bio { font-size: 0.82rem; }
  `}
`;