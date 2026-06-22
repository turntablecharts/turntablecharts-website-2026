/* eslint-disable @next/next/no-img-element */
import styled from 'styled-components';
import Link from 'next/link';
import Theme from 'constants/Theme';
import BackToTopSVG from 'assets/icons/BackToTop.svg';
import media from 'constants/MediaQuery';
import { FormEvent, useState } from 'react';
import { useQuery } from 'react-query';
import { getAllMagazineEditions } from 'utility/MagazinesApi/api';
import TTCRequest from 'lib/axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const NAV_LINKS = [
  { label: 'Charts', href: '/charts' },
  { label: 'News', href: '/news' },
  { label: 'Magazines', href: '/magazine' },
  { label: 'Business', href: '/business' },
  { label: 'Certifications', href: '/certification' },
  // { label: 'Gallery', href: '/gallery' },
  { label: 'Power List', href: '/powerlist25' },
];

const SOCIAL_LINKS = [
  { label: 'X', href: 'https://twitter.com/TurntableCharts' },
  { label: 'Instagram', href: 'https://www.instagram.com/turntablecharts/' },
  { label: 'TikTok', href: 'https://www.tiktok.com/@turntablecharts' },
  { label: 'YouTube', href: 'https://www.youtube.com/@turntablecharts' },
];

const Footer = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [exploreOpen, setExploreOpen] = useState(false);

  const { data: magazineData } = useQuery('footer-magazine', getAllMagazineEditions, {
    staleTime: 1000 * 60 * 60,
  });

  const latestEdition = magazineData?.data
    ? [...magazineData.data].sort((a, b) => b.id - a.id)[0]
    : null;

  const handleSubscribe = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim()) return;

    // Using a toast ID to avoid multiple toasts
    const toastId = toast.loading('Signing you up... ⏳');

    TTCRequest.post('/api/Email/subscribe', {
      email: email.trim(),
      name: name.trim() // Include name in the request
    })
      .then(() => {
        toast.update(toastId, {
          render: 'Successfully signed up ✅',
          type: 'success',
          isLoading: false,
          autoClose: 3000
        });
        setEmail('');
        setName('');
      })
      .catch(() => {
        toast.update(toastId, {
          render: 'Something went wrong. Please try again.',
          type: 'error',
          isLoading: false,
          autoClose: 3000
        });
      });
  };

  const subscribeBlock = (
    <form className="subscribe_form" onSubmit={handleSubscribe}>
      <input
        type="text"
        placeholder="Name"
        className="name_input"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit">Subscribe</button>
    </form>
  );

  return (
    <FooterStyling>
      <ToastContainer />

      {/* ── Desktop: 3-col grid ── */}
      <div className="footer_main">
        {/* Magazine cover */}
        <div className="footer_cover">
          {latestEdition ? (
            <Link href={`/magazine/${latestEdition.name}`}>
              <a className="cover_link">
                <img src={latestEdition.coverImageUrl} alt={latestEdition.name} />
              </a>
            </Link>
          ) : (
            <div className="cover_placeholder" />
          )}
        </div>

        {/* Explore links */}
        <div className="footer_explore">
          <span className="explore_label">Explore</span>
          <nav className="explore_links">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href}>
                <a className="nav_link">{link.label}</a>
              </Link>
            ))}
          </nav>
        </div>

        {/* Subscribe + back-to-top */}
        <div className="footer_subscribe_row">
          <div className="footer_subscribe">
            <h2 className="subscribe_heading">
              Subscribe to
              <br />
              <span className="subscribe_highlight">Turntable Times</span>
            </h2>
            <p className="subscribe_body">
              Enter your name and email to subscribe to our newsletter & get the latest updates from TurnTable.
            </p>
            {subscribeBlock}
          </div>
          <button
            className="back_to_top"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Back to top"
          >
            <BackToTopSVG />
          </button>
        </div>
      </div>

      {/* ── Mobile layout ── */}
      <div className="footer_mobile">
        {/* Subscribe card with back-to-top pinned top-right */}
        <div className="mobile_subscribe_card">
          <button
            className="back_to_top_mobile"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Back to top"
          >
            <BackToTopSVG />
          </button>
          <h2 className="subscribe_heading">
            Subscribe to
            <br />
            <span className="subscribe_highlight">Turntable Times</span>
          </h2>
          <p className="subscribe_body">
            Enter your name and email to subscribe to our newsletter & get the latest updates from TurnTable.
          </p>
          {subscribeBlock}
        </div>

        {/* Explore accordion */}
        <div className="mobile_explore">
          <button
            className="explore_toggle"
            onClick={() => setExploreOpen((o) => !o)}
            aria-expanded={exploreOpen}
          >
            <span>Explore</span>
            <svg
              className={`chevron ${exploreOpen ? 'open' : ''}`}
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path d="M6 9L12 15L18 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          {exploreOpen && (
            <nav className="explore_links_mobile">
              {NAV_LINKS.map((link) => (
                <Link key={link.href} href={link.href}>
                  <a className="nav_link_mobile" onClick={() => setExploreOpen(false)}>{link.label}</a>
                </Link>
              ))}
            </nav>
          )}
        </div>
      </div>

      {/* ── Big wordmark ── */}
      <div className="footer_wordmark" aria-hidden="true">
        TURNTABLE
      </div>

      {/* ── Social + copyright ── */}
      <div className="footer_bottom_bar">
        <div className="footer_social">
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="social_link"
            >
              {link.label}
            </a>
          ))}
        </div>
        <div className="footer_copyright">
          TurnTable Charts is part of TurnTable Media, Data and Analytics. ©TMDA 2026. All Rights Reserved
        </div>
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
  overflow: visible;

  /* ── Desktop 3-col grid ── */
  .footer_main {
    display: grid;
    grid-template-columns: 400px min-content 1fr;
    gap: 80px;
    align-items: center;
    padding: 60px 60px 0;

    ${media.smallDesktop`
      grid-template-columns: min-content 1fr;
      gap: 50px;
      padding: 50px 32px 0;

      .footer_cover {
        display: none;
      }
    `}

    ${media.tablet`
      display: none;
    `}
  }

  /* ── Mobile layout (hidden on desktop) ── */
  .footer_mobile {
    display: none;

    ${media.tablet`
      display: flex;
      flex-direction: column;
      gap: 0;
      padding: 40px 20px 0;
      position: relative;
      z-index: 100;
    `}
  }

  /* Subscribe card */
  .mobile_subscribe_inner {
    display: flex;
    align-items: flex-start;
    gap: 16px;
  }

  .mobile_subscribe_content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .mobile_subscribe_card {
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 8px;
    padding: 24px 20px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-bottom: 12px;
    position: relative;
    z-index: 2;
  }

  /* Explore accordion */
  .mobile_explore {
    border: 1px solid rgba(255, 255, 255, 1);
    border-radius: 8px;
    overflow: hidden;
  }

  .explore_toggle {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 18px 20px;
    background: transparent;
    border: none;
    color: white;
    font-family: 'Host Grotesk', sans-serif;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    text-align: left;

    .chevron {
      transition: transform 0.25s ease;
      flex-shrink: 0;

      &.open {
        transform: rotate(180deg);
      }
    }
  }

  .explore_links_mobile {
    display: flex;
    flex-direction: column;
    padding: 20px 20px 24px;
    gap: 18px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    align-items: flex-start;
  }

  .nav_link_mobile {
    font-family: 'Host Grotesk', sans-serif;
    font-size: 12px;
    font-weight: 400;
    color: ${Theme.colorPalette.white};
    text-decoration: none;
    text-align: left;
    transition: color 0.2s ease;
    text-decoration: underline;

    &:hover {
      color: ${Theme.colorPalette.ttcYellow};
    text-decoration: underline;

    }
  }

  /* ── Magazine cover (desktop only) ── */
  .footer_cover {
    .cover_link {
      display: block;

      img {
        width: 400px;
        height: 400px;
        display: block;
        object-fit: contain;
      }
    }

    .cover_placeholder {
      width: 100%;
      aspect-ratio: 3 / 4;
      background: rgba(255, 255, 255, 0.06);
    }
  }

  /* ── Explore (desktop) ── */
  .footer_explore {
    display: flex;
    flex-direction: column;
    align-self: center;
    justify-content: space-evenly;
   height: 100%;
    font-size: 1rem;

    
  }

  .explore_label {
    font-family: 'Host Grotesk', sans-serif;
    font-size: 1rem;
    font-weight: 400;
    color: ${Theme.colorPalette.ttcYellow};
    letter-spacing: 0.02em;
   
  }

  .explore_links {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    gap: 25px;
    text-decoration: underline;
    color: ${Theme.colorPalette.white};
 
  }

  .nav_link {
    font-family: 'Host Grotesk', sans-serif;
    font-size: 1rem;
    font-weight: 400;
    color: ${Theme.colorPalette.white};
    text-decoration: none;
    transition: all 0.2s ease;
    width: fit-content;

    &:hover {
      color: ${Theme.colorPalette.ttcYellow};
      opacity: 1;
      transform: translateX(4px);
      text-decoration: underline;
    }
  }

  /* ── Subscribe (shared styles) ── */
  .footer_subscribe {
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-self: center;
  }

  .subscribe_heading {
    font-family: 'Nohemi', sans-serif;
    font-size: clamp(1.5rem, 3.5vw, 2.5rem);
    font-weight: 900;
    text-transform: uppercase;
    line-height: 1;
    letter-spacing: -1px;
    margin: 0;

    ${media.mobileLarge`
      font-size: 1.8rem;
    `}
  }

  .subscribe_highlight {
    color: ${Theme.colorPalette.ttcOrange};
  }

  .subscribe_body {
    font-family: 'Host Grotesk', sans-serif;
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.75);
    line-height: 1.6;
    max-width: 420px;
    margin: 0;
  }

  .subscribe_form {
    display: grid;
    grid-template-columns: 1fr 1fr auto;
    gap: 12px;
    width: 100%;

    ${media.tablet`
      display: flex;
    `}

    input {
      background: ${Theme.colorPalette.white};
      border: none;
      outline: none;
      padding: 14px 18px;
      font-family: 'Host Grotesk', sans-serif;
      font-size: 0.9rem;
      color: ${Theme.colorPalette.black};
      border-radius: 2px;
      width: 100%;
      
      ${media.tablet`
        width: auto;
        flex: 1;
        min-width: 0;
      `}
     

      &::placeholder {
        color: rgba(0, 0, 0, 0.45);
      }

      &:focus {
        outline: 2px solid ${Theme.colorPalette.ttcYellow};
      }
    }

    button {
      background: ${Theme.colorPalette.ttcYellow};
      color: ${Theme.colorPalette.black};
      border: none;
      padding: 14px 28px;
      font-family: 'Host Grotesk', sans-serif;
      font-size: 0.9rem;
      font-weight: 700;
      border-radius: 2px;
      cursor: pointer;
      width: 100%;
      transition: background 0.2s ease;

      &:hover {
        background: #e6961a;
      }
      
      ${media.tablet`
        width: auto;
        flex-shrink: 0;
      `}
    }
  }

  /* ── Subscribe + back-to-top side-by-side ── */
  .footer_subscribe_row {
    display: flex;
    align-items: flex-start;
    gap: 24px;
    padding-right: 100px;

    ${media.smallDesktop`
      padding-right: 60px;
    `}
  }

  /* ── Wordmark ── */
  .footer_wordmark {
    font-family: 'Nohemi', sans-serif;
    font-size: clamp(80px, 16vw, 240px);
    font-weight: 900;
    text-transform: uppercase;
    line-height: 0.85;
    letter-spacing: -6px;
    color: ${Theme.colorPalette.white};
    padding: 20px 5px 0;
    width: 100%;
    text-align: center;
    overflow-x: clip;

    ${media.mobileLarge`
      font-size: clamp(48px, 16vw, 70px);
      letter-spacing: -2px;
      padding: 60px 20px 0;
    `}
  }

  /* ── Back to top button ── */
  .back_to_top {
    all: unset;
    cursor: pointer;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    opacity: 0.9;
    transition: opacity 0.2s ease, transform 0.2s ease;
margin-left: 10%;
    &:hover {
      opacity: 1;
      transform: translateY(-4px);
    }

    svg {
      display: block;
      width: 38px;
      height: 172px;
    }
  }

  /* ── Mobile-only back to top ── */
  .back_to_top_mobile {
    all: unset;
    cursor: pointer;
    display: block;
    position: absolute;
    top: -60px;
    right: 0px;
    opacity: 0.9;
    transition: opacity 0.2s ease;
  
    &:hover { opacity: 1; }

    svg {
      display: block;
      width: 30px;
      height: 102px;
      
    }
  }

  /* ── Bottom bar: social + copyright ── */
  .footer_bottom_bar {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .footer_social {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 48px;
    padding: 28px 40px;

    ${media.tablet`
      gap: 28px;
      flex-wrap: wrap;
    `}

    ${media.mobileLarge`
      gap: 20px;
      padding: 20px;
    `}
  }

  .social_link {
    font-family: 'Host Grotesk', sans-serif;
    font-size: 0.95rem;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.65);
    text-decoration: none;
    transition: color 0.2s ease;
    text-decoration: underline;

    &:hover {
      color: ${Theme.colorPalette.ttcYellow};
    }
  }

  /* ── Copyright ── */
  .footer_copyright {
    text-align: center;
    font-family: 'Host Grotesk', sans-serif;
    font-size: 0.6rem;
    color: ${Theme.colorPalette.black};
    background-color: ${Theme.colorPalette.white};
    padding: 16px 24px 20px;
    width: 100%;
  }
`;
