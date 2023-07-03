/* eslint-disable @next/next/no-img-element */
import CertificationApplication from 'components/organisms/CertificationApplication';
import CertificationDisplay from 'components/organisms/CertificationDisplay';
import CertificationEligible from 'components/organisms/CertificationEligible';
import media from 'constants/MediaQuery';
import Theme from 'constants/Theme';
import Head from 'next/head';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { CertificationEntry, getAllCertificationEntry } from 'utility/CertificationApi/api';

export async function getStaticProps() {
  const certEntriesResponse = await getAllCertificationEntry();

  return {
    props: {
      certEntries: certEntriesResponse.data,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 3600, // In seconds
  };
}

const Certification: React.FC<{ certEntries: CertificationEntry[] }> = ({ certEntries }) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [tabUnderlineWidth, setTabUnderlineWidth] = useState(0);
  const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0);

  const tabsRef = useRef<HTMLButtonElement[]>([]);

  useEffect(() => {
    function setTabPosition() {
      const currentTab = tabsRef.current[activeTabIndex];
      setTabUnderlineLeft(currentTab?.offsetLeft ?? 0);
      setTabUnderlineWidth(currentTab?.clientWidth ?? 0);
    }

    setTabPosition();
    window.addEventListener('resize', setTabPosition);

    return () => window.removeEventListener('resize', setTabPosition);
  }, [activeTabIndex]);

  const certificationTabs = [
    { title: 'Eligible Songs', component: <CertificationEligible certEntries={certEntries} /> },
    { title: 'Application', component: <CertificationApplication /> },
    { title: 'Display', component: <CertificationDisplay certEntries={certEntries} /> },
  ];
  return (
    <CertificationPageStyling>
      <Head>
        <title>TurnTable Charts | Certification</title>
        <meta name="description" content="TurnTable Charts - Certification" />
      </Head>
      <div>
        <div className="certification_tabs">
          <div className="certification_tabs-tab">
            {certificationTabs.map((tab, idx) => {
              return (
                <button
                  key={idx}
                  ref={(el) => (tabsRef.current[idx] = el!)}
                  className="certification_tabs-tab-button"
                  onClick={() => setActiveTabIndex(idx)}
                >
                  {tab.title}
                </button>
              );
            })}
          </div>
          <span className="certification_tabs-underline" style={{ left: tabUnderlineLeft, width: tabUnderlineWidth }} />
        </div>
        <div className="py-4">{certificationTabs[activeTabIndex].component}</div>
      </div>
    </CertificationPageStyling>
  );
};

export default Certification;

const CertificationPageStyling = styled.div`
  max-width: 1200px;
  width: 95%;
  margin: 40px auto;
  height: 100vh;

  ${media.mobileLarge`
  height: 100vh;
  overflow: hidden;

`}
  .certification_tabs {
    position: relative;

    ${media.mobileLarge`
    position: sticky;
    top: 0;
    z-index: 1;

`}

    &-tab {
      display: flex;
      width: 100%;
      padding-bottom: 10px;

      &-button {
        padding: 2em 0 3em;
        all: unset;
        cursor: pointer;
        font-family: ${Theme.typography.extra};
        font-size: ${Theme.fontSizes.large};
        font-weight: ${Theme.fontWeights.bold};
        text-transform: uppercase;
        flex: 1;
        text-align: center;
        white-space: pre;
        ${media.mobileLarge`
        font-size: 14px;

    `}
      }
    }

    &-underline {
      position: absolute;
      bottom: 0;
      display: block;
      height: 2px;
      background-color: ${Theme.colorPalette.ttcYellow};
      transition: all 0.3s;
    }
  }
`;
