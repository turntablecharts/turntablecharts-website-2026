import Link from 'next/link';
import styled, { css } from 'styled-components';
import TTCLogo from 'assets/icons/ttc-logo.svg';
// import TTCIconInsta from 'assets/icons/ttc-insta.svg';
// import TTCIconTwiter from 'assets/icons/ttc-twitter.svg';
import TTCIconSearch from 'assets/icons/ttc-search.svg';
import Theme from 'constants/Theme';
import Typography from 'components/atoms/typography';
import { useRouter } from 'next/router';
import media from 'constants/MediaQuery';
import { useState } from 'react';

const Navbar = () => {
  const router = useRouter();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  return (
    <NavbarStyling pathname={router.pathname}>
      <div className="logo">
        <Link href="/">
          <a>
            <TTCLogo style={{ height: '40px', width: '102px' }} />
          </a>
        </Link>
      </div>
      <nav className="menus">
        <Link href="/charts">
          <a className={`menus_menu ${router.pathname === '/charts' ? 'active' : ''}`}>
            <Typography.Text className='menus_text' fontType="Inter" weight="semiBold">
              CHARTS
            </Typography.Text>
          </a>
        </Link>
        <Link href="/news">
          <a className={`menus_menu ${router.pathname === '/news' ? 'active' : ''}`}>
            <Typography.Text className='menus_text' fontType="Inter" weight="semiBold">
              NEWS
            </Typography.Text>
          </a>
        </Link>
        <Link href="/magazine">
          <a className={`menus_menu ${router.pathname === '/magazine' ? 'active' : ''}`}>
            <Typography.Text className='menus_text' fontType="Inter" weight="semiBold">
              MAGAZINES
            </Typography.Text>
          </a>
        </Link>
        <Link href="/business">
          <a className={`menus_menu ${router.pathname === '/business' ? 'active' : ''}`}>
            <Typography.Text className='menus_text' fontType="Inter" weight="semiBold">
              BUSINESS
            </Typography.Text>
          </a>
        </Link>
        <Link href="/certification">
          <a className={`menus_menu ${router.pathname === '/certification' ? 'active' : ''}`}>
            <Typography.Text className='menus_text' fontType="Inter" weight="semiBold">
              CERTIFICATIONS
            </Typography.Text>
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
              className={router.pathname === '/charts' ? 'active' : ''}
            >
              <Typography.Text level="xlarge" fontType="Inter" weight="semiBold">
                CHARTS
              </Typography.Text>
            </a>
          </Link>
          <Link className="mobile_menu" href="/news">
            <a
              onClick={() => {
                setIsMobileNavOpen(false);
              }}
              className={router.pathname === '/news' ? 'active' : ''}
            >
              <Typography.Text level="xlarge" fontType="Inter" weight="semiBold">
                NEWS
              </Typography.Text>
            </a>
          </Link>
          <Link className="mobile_menu" href="/magazine">
            <a
              onClick={() => {
                setIsMobileNavOpen(false);
              }}
              className={router.pathname === '/magazine' ? 'active' : ''}
            >
              <Typography.Text level="xlarge" fontType="Inter" weight="semiBold">
                MAGAZINES
              </Typography.Text>
            </a>
          </Link>
          <Link className="mobile_menu" href="/business">
            <a
              onClick={() => {
                setIsMobileNavOpen(false);
              }}
              className={router.pathname === '/business' ? 'active' : ''}
            >
              <Typography.Text level="xlarge" fontType="Inter" weight="semiBold">
                BUSINESS
              </Typography.Text>
            </a>
          </Link>
          <Link className="mobile_menu" href="/certification">
            <a className={router.pathname === '/certification' ? 'active' : ''}>
              <Typography.Text level="xlarge" fontType="Inter" weight="semiBold">
                CERTIFICATIONS
              </Typography.Text>
            </a>
          </Link>
        </nav>
        <div className="mobile_socials">
          <a target="_blank" rel="noreferrer" className="socials_icon" href="#">
            <TTCIconSearch className="socials_icon" />
          </a>


        </div>
      </div>
      <div className="socials">
        <a target="_blank" rel="noreferrer" className="socials_icon" href="#">
          <TTCIconSearch className="socials_icon" />
        </a>
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
  padding: 10px 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${Theme.colorPalette.black};
  z-index: 1000;
  width: 80vw;
  margin: 0 auto;
  border-radius: 10px;
  position: fixed;
  top: 20px;
  left: 0;
  right: 0;

  ${({ pathname }) =>
    pathname === '/myTurnTable' &&
    css`
      background: transparent;
      position: relative;
    `}
    
  ${media.smallDesktop`
    padding: 10px 30px;
    width: 85vw;
  `}
  
  ${media.mobileLarge`
    padding: 10px 20px;
    width: 100%;
    top: 0;
    left: 0;
    border-radius: 0;
    height: 60px;
    
  `}
  
  .logo {
    ${media.mobileLarge`
      svg {
        height: 32px !important;
        width: 82px !important;
      }
    `}
  }
    
  .menus {
    display: flex;
    gap: 67px;
    position: relative;
    z-index: 1001;

    ${media.smallDesktop`
    gap: 37px;

    `}

    a.menus_menu {
      font-family: ${Theme.typography.text};
      font-size: 14px;
      font-weight: ${Theme.fontWeights.semiBold};
      cursor: pointer;
      transition: color 0.3s ease;
      position: relative;
      z-index: 1003;
      
      &:hover .menus_text {
        color: ${Theme.colorPalette.ttcYellow} !important;
      }
      
      &.active .menus_text {
        color: ${Theme.colorPalette.ttcYellow} !important;
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
  }

  .hamburger {
    width: 24px;
    height: 24px;
    display: none;
    flex-direction: column;
    justify-content: space-around;
    cursor: pointer;
    .top,
    .middle,
    .bottom {
      display: inline-block;
      height: 1px;
      width: 24px;
      border-top: 2px solid #fff;
      transition: all 0.5s;
    }
  }

  .hamburger.open {
    z-index: 1002;
    .top {
      transform: rotate(45deg) translate(5px, 6px);
    }
    .middle {
      opacity: 0;
    }
    .bottom {
      transform: rotate(-45deg) translate(5px, -6px);
    }
  }

  .mobile_menus {
    display: none;
  }

  ${media.mobileLarge`
  
  .mobile_menus {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: #000000;
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
      gap: 60px;
      align-items: center;
      margin-bottom: 60px;
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
      padding-inline: 30px;
  `}
  ${media.mobileLarge`
    .menus, .socials {
      display: none;
    }

    .hamburger {
      display: flex;
    }
`}
`;
