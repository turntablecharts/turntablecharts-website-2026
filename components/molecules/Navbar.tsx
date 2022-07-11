import Link from "next/link";
import styled, { css } from "styled-components";
import TTCLogo from "assets/icons/ttc-logo.svg";
import TTCIconInsta from "assets/icons/ttc-insta.svg";
import TTCIconTwiter from "assets/icons/ttc-twitter.svg";
import Theme from "constants/Theme";
import Typography from "components/atoms/typography";
import { useRouter } from "next/router";
import media from "constants/MediaQuery";
import { useState } from "react";

const Navbar = () => {
  const router = useRouter();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  return (
    <NavbarStyling pathname={router.pathname}>
      <div className="logo">
        <Link href="/">
          <a>
            <TTCLogo style={{ height: "40px", width: "102px" }} />
          </a>
        </Link>
      </div>
      <nav className="menus">
        <Link className="menus_menu" href="/charts">
          <a className={router.pathname === "/charts" ? "active" : ""}>
            <Typography.Text fontType="SFProText" weight="semiBold">
              Chart
            </Typography.Text>
          </a>
        </Link>
        <Link className="menus_menu" href="/news">
          <a className={router.pathname === "/news" ? "active" : ""}>
            <Typography.Text fontType="SFProText" weight="semiBold">
              News
            </Typography.Text>
          </a>
        </Link>
        {/* <Link className="menus_menu" href="/photos">
          <a className={router.pathname === "/photos" ? "active" : ""}>
            <Typography.Text fontType="SFProText" weight="semiBold">Photos</Typography.Text>
          </a>
        </Link> */}
      </nav>
      <div className={`mobile_menus ${isMobileNavOpen ? "open" : ""}`}>
        <nav className="menuContainer">
          <Link className="mobile_menu" href="/charts">
            <a
              onClick={() => {
                setIsMobileNavOpen(false);
              }}
              className={router.pathname === "/charts" ? "active" : ""}
            >
              <Typography.Text
                level="xlarge"
                fontType="SFProText"
                weight="semiBold"
              >
                Chart
              </Typography.Text>
            </a>
          </Link>
          <Link className="mobile_menu" href="/news">
            <a
              onClick={() => {
                setIsMobileNavOpen(false);
              }}
              className={router.pathname === "/news" ? "active" : ""}
            >
              <Typography.Text
                level="xlarge"
                fontType="SFProText"
                weight="semiBold"
              >
                News
              </Typography.Text>
            </a>
          </Link>
          {/* <Link className="mobile_menu" href="/photos">
            <a className={router.pathname === "/photos" ? "active" : ""}>
              <Typography.Text level="xlarge" fontType="SFProText" weight="semiBold">
                Photos
              </Typography.Text>
            </a>
          </Link> */}
        </nav>
        <div className="mobile_socials">
          <a
            target="_blank"
            rel="noreferrer"
            className="socials_icon"
            href="https://www.instagram.com/turntablecharts/"
          >
            <TTCIconInsta className="socials_icon" />
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            className="socials_icon"
            href="https://twitter.com/TurntableCharts"
          >
            <TTCIconTwiter className="socials_icon" />
          </a>
        </div>
      </div>
      <div className="socials">
        <a
          target="_blank"
          rel="noreferrer"
          className="socials_icon"
          href="https://www.instagram.com/turntablecharts/"
        >
          <TTCIconInsta className="socials_icon" />
        </a>
        <a
          target="_blank"
          rel="noreferrer"
          className="socials_icon"
          href="https://twitter.com/TurntableCharts"
        >
          <TTCIconTwiter className="socials_icon" />
        </a>
      </div>
      <div
        onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
        className={`hamburger ${isMobileNavOpen ? "open" : ""}`}
      >
        <span className="top"></span>
        <span className="bottom"></span>
      </div>
    </NavbarStyling>
  );
};

export default Navbar;

const NavbarStyling = styled.div<{ pathname: string }>`
  padding: 20px 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  background-color: ${Theme.colorPalette.black};
  z-index: 10;

  ${({ pathname }) =>
    pathname === "/myTurnTable" &&
    css`
      background: transparent;
      position: relative;
    `}
  .menus {
    display: flex;
    gap: 67px;

    .active {
      color: ${Theme.colorPalette.ttcYellow};
    }
  }
  .socials {
    &_icon {
      height: 24px;
      width: 24px;
      transition: color 0.3s;
      &:hover {
        color: ${Theme.colorPalette.ttcYellow};
      }

      &:not(:last-child) {
        margin-right: 80px;
      }
    }
  }

  .hamburger {
    width: 30px;
    height: 30px;
    display: none;
    flex-direction: column;
    justify-content: space-around;
    cursor: pointer;
    .top,
    .bottom {
      display: inline-block;
      height: 1px;
      width: 30px;
      border-top: 2px solid #fff;
      transition: all 0.5s;
    }
  }

  .hamburger.open {
    .top {
      transform: rotate(45deg) translate(5px, 6px);
    }
    .bottom {
      transform: rotate(-45deg) translate(4px, -5px);
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
    top: 84px;
    bottom: 0;
    background-color: #000000e1;
    backdrop-filter: blur(5px);

    padding: 60px 0px;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;

    transform: translateX(100vw);
    transition: transform 0.7s ease-in-out;
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
