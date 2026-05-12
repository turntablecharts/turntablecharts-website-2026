import Link from 'next/link';
import styled, { css } from 'styled-components';
import TTCLogo from 'assets/icons/ttc-logo.svg';
import TTCIconInsta from 'assets/icons/ttc-insta.svg';
import TTCIconYoutube from 'assets/icons/ttc-youtube.svg';
import TTCIconTiktok from 'assets/icons/ttc-tiktok.svg';
import TTCIconTwitter from 'assets/icons/ttc-twitter.svg';
import TTCIconSearch from 'assets/icons/ttc-search.svg';
import Theme from 'constants/Theme';
import Typography from 'components/atoms/typography';
import { useRouter } from 'next/router';
import media from 'constants/MediaQuery';
import { useState } from 'react';
import NavHover from 'assets/icons/navHover.svg';

const Navbar = ({ onSearchOpen }: { onSearchOpen?: () => void }) => {
  const router = useRouter();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  return (
    <NavbarStyling pathname={router.pathname}>
      <div onClick={() => isMobileNavOpen && setIsMobileNavOpen(false)} className="logo">
        <Link href="/">
          <a>
            <TTCLogo style={{ height: '1.8rem', width: '100px' }} />
          </a>
        </Link>
      </div>
      <nav className="menus">
        <Link href="/charts">
          <a className={`menus_menu ${router.pathname.startsWith('/charts') ? 'active' : ''}`}>
            <Typography.Text className='menus_text' fontType="HostGrotesk" weight="semiBold">
              CHARTS
            </Typography.Text>
            <NavHover className="nav_glow" />
          </a>
        </Link>
        <Link href="/news">
          <a className={`menus_menu ${router.pathname.startsWith('/news') ? 'active' : ''}`}>
            <Typography.Text className='menus_text' fontType="HostGrotesk" weight="semiBold">
              NEWS
            </Typography.Text>
            <NavHover className="nav_glow" />
          </a>
        </Link>
        <Link href="/magazine">
          <a className={`menus_menu ${router.pathname.startsWith('/magazine') ? 'active' : ''}`}>
            <Typography.Text className='menus_text' fontType="HostGrotesk" weight="semiBold">
              MAGAZINES
            </Typography.Text>
            <NavHover className="nav_glow" />
          </a>
        </Link>
        <Link href="/business">
          <a className={`menus_menu ${router.pathname.startsWith('/business') ? 'active' : ''}`}>
            <Typography.Text className='menus_text' fontType="HostGrotesk" weight="semiBold">
              BUSINESS
            </Typography.Text>
            <NavHover className="nav_glow" />
          </a>
        </Link>
        <Link href="/certification">
          <a className={`menus_menu ${router.pathname.startsWith('/certification') ? 'active' : ''}`}>
            <Typography.Text className='menus_text' fontType="HostGrotesk" weight="semiBold">
              CERTIFICATIONS
            </Typography.Text>
            <NavHover className="nav_glow" />
          </a>
        </Link>
      </nav>
      <div className={`mobile_menus ${isMobileNavOpen ? 'open' : ''}`}>
        <nav className="menuContainer">
          <Link className="mobile_menu" href="/charts">
            <a
              onClick={() => {
                setIsMobileNavOpen(false);
              }}
              className={router.pathname.startsWith('/charts') ? 'active' : ''}
            >
              <Typography.Text level="regular" fontType="HostGrotesk" weight="semiBold">
                CHARTS
              </Typography.Text>
            </a>
          </Link>
          <Link className="mobile_menu" href="/news">
            <a
              onClick={() => {
                setIsMobileNavOpen(false);
              }}
              className={router.pathname.startsWith('/news') ? 'active' : ''}
            >
              <Typography.Text level="regular" fontType="HostGrotesk" weight="semiBold">
                NEWS
              </Typography.Text>
            </a>
          </Link>
          <Link className="mobile_menu" href="/magazine">
            <a
              onClick={() => {
                setIsMobileNavOpen(false);
              }}
              className={router.pathname.startsWith('/magazine') ? 'active' : ''}
            >
              <Typography.Text level="regular" fontType="HostGrotesk" weight="semiBold">
                MAGAZINES
              </Typography.Text>
            </a>
          </Link>
          <Link className="mobile_menu" href="/business">
            <a
              onClick={() => {
                setIsMobileNavOpen(false);
              }}
              className={router.pathname.startsWith('/business') ? 'active' : ''}
            >
              <Typography.Text level="regular" fontType="HostGrotesk" weight="semiBold">
                BUSINESS
              </Typography.Text>
            </a>
          </Link>
          <Link className="mobile_menu" href="/certification">
            <a onClick={() => {
              setIsMobileNavOpen(false);
            }} className={router.pathname.startsWith('/certification') ? 'active' : ''}>
              <Typography.Text level="regular" fontType="HostGrotesk" weight="semiBold">
                CERTIFICATIONS
              </Typography.Text>
            </a>
          </Link>
          <Link className="mobile_menu" href="/gallery">
            <a onClick={() => {
              setIsMobileNavOpen(false);
            }} className={router.pathname.startsWith('/gallery') ? 'active' : ''}>
              <Typography.Text level="regular" fontType="HostGrotesk" weight="semiBold">
                GALLERY
              </Typography.Text>
            </a>
          </Link>
          <Link className="mobile_menu" href="/powerlist25">
            <a onClick={() => {
              setIsMobileNavOpen(false);
            }} className={router.pathname.startsWith('/powerlist25') ? 'active' : ''}>
              <Typography.Text level="regular" fontType="HostGrotesk" weight="semiBold">
                POWERLIST
              </Typography.Text>
            </a>
          </Link>
        </nav>
        <div className="mobile_socials">
          <a href="https://www.instagram.com/turntablecharts/" target="_blank" rel="noreferrer" aria-label="Instagram">
            <TTCIconInsta className="socials_icon" />
          </a>
          <a href="https://www.youtube.com/@turntablecharts" target="_blank" rel="noreferrer" aria-label="YouTube">
            <TTCIconYoutube className="socials_icon" />
          </a>
          <a href="https://www.tiktok.com/@turntablecharts" target="_blank" rel="noreferrer" aria-label="TikTok">
            <TTCIconTiktok className="socials_icon" />
          </a>
          <a href="https://twitter.com/TurntableCharts" target="_blank" rel="noreferrer" aria-label="X">
            <TTCIconTwitter className="socials_icon" />
          </a>
        </div>
      </div>
      {/* main nav search */}
      <div className="socials">
        <button
          aria-label="Search"
          onClick={() => onSearchOpen?.()}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex' }}
        >
          <TTCIconSearch className="socials_icon" />
        </button>
      </div>
      <div onClick={() => setIsMobileNavOpen(!isMobileNavOpen)} className={`hamburger ${isMobileNavOpen ? 'open' : ''}`}>
        <span className="top"></span>
        <span className="middle"></span>
        <span className="bottom"></span>
      </div>
    </NavbarStyling>
  );
};

export default Navbar;

const NavbarStyling = styled.div<{ pathname: string }>`
  padding: 20px 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${Theme.colorPalette.black};
  z-index: 1000;
  width: 100vw;
  margin: 0 auto;
  border-radius: 0;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;


  ${({ pathname }) =>
    pathname === '/myTurnTable' &&
    css`
      background: transparent;
      position: relative;
    `}


  ${media.mobileLarge`
    padding:  10px;
    width: 100%;
    top: 0;
    left: 0;
    border-radius: 0;
    height: 70px;
    border: none;

  `}
  
  .logo {
    position: relative;
    z-index: 1004;

    ${media.mobileLarge`
      svg {
        height: 34px !important;
        width: 80px !important;
      }
    `}
  }
    
  .menus {
    display: flex;
    gap: 50px;
    position: relative;
    z-index: 1001;

    ${media.smallDesktop`
      gap: 28px;
    `}

    ${media.tablet`
      display: none;
    `}

    a.menus_menu {
      font-family: ${Theme.typography.text};
      font-size: 14px;
      font-weight: ${Theme.fontWeights.semiBold};
      cursor: pointer;
      transition: color 0.3s ease;
      position: relative;
      z-index: 1003;
      padding-bottom: 6px;

      /* SVG glow underline */
      .nav_glow {
        position: absolute;
        bottom: -10px;
        left: 50%;
        transform: translateX(-50%);
        width: 120%;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.25s ease;
      }

      &:hover .nav_glow,
      &.active .nav_glow {
        opacity: 1;
      }

      &:hover .menus_text {
        color: ${Theme.colorPalette.white} !important;
      }

      &.active .menus_text {
        color: ${Theme.colorPalette.white} !important;
      }
    }

    .menus_text {
      font-size: 14px;
      transition: color 0.3s ease;
      pointer-events: none;
    }
  }
  .socials {
    &_icon {
      height: 20px;
      width: 20px;
      transition: color 0.3s;
      &:hover {
        color: ${Theme.colorPalette.ttcYellow};
      }
    }
    ${media.tablet`
      display: none;
    `}
  }

  .hamburger {
    width: 20px;
    height: 16px;
    display: none;
    flex-direction: column;
    justify-content: space-around;
    cursor: pointer;
    ${media.tablet`
      display: flex;
    `}
    .top,
    .middle,
    .bottom {
      display: inline-block;
      height: 1px;
      width: 20px;
      border-top: 2px solid #fff;
      transition: all 0.5s;
    }
  }

  .hamburger.open {
    z-index: 1002;
    .top {
      transform: rotate(45deg) translate(3px, 4px);
    }
    .middle {
      opacity: 0;
    }
    .bottom {
      transform: rotate(-45deg) translate(3px, -4px);
    }
  }

  .mobile_menus {
    display: none;
  }

  ${media.tablet`
    .mobile_menus {
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background-color: #000000;
      box-shadow: inset 0 0 18.3px #FF9500;
      backdrop-filter: blur(5px);
      padding: 60px 0px;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      transform: translateX(100%);
      transition: transform 0.7s ease-in-out, visibility 0s 0.7s;
      visibility: hidden;
      z-index: 999;

      .menuContainer {
        display: flex;
        flex-direction: column;
        gap: 55px;
        align-items: center;
        width: fit-content;
        margin: 0 auto;
        padding-top: 1rem;

       
      }

      .mobile_socials {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 28px;
        padding: 24px 0 0;
        margin-top: auto;

        a {
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255, 255, 255, 0.7);
          transition: color 0.2s;

          &:hover { color: white; }

          svg, .socials_icon {
            width: 24px;
            height: 24px;
          }
        }
      }
    }
  `}

  .mobile_menus.open {
    transform: translateX(0);
    visibility: visible;
    transition: transform 0.7s ease-in-out;
    z-index: 1001;
  }

  ${media.smallDesktop`
    padding-inline: 24px;
  `}
`;
