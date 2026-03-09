/* eslint-disable @next/next/no-img-element */
import CertificationApplication from 'components/organisms/CertificationApplication';
import CertificationDisplay from 'components/organisms/CertificationDisplay';
import CertificationEligible from 'components/organisms/CertificationEligible';
import media from 'constants/MediaQuery';
import Head from 'next/head';
import React, { useState } from 'react';
import styled from 'styled-components';
import { CertificationEntry, getAllCertificationEntry } from 'utility/CertificationApi/api';

export async function getStaticProps() {
  const certEntriesResponse = await getAllCertificationEntry();
  return {
    props: { certEntries: certEntriesResponse.data },
    revalidate: 3600,
  };
}

const Certification: React.FC<{ certEntries: CertificationEntry[] }> = ({ certEntries }) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [search, setSearch] = useState('');

  const query = search.trim().toLowerCase();
  const filteredEntries = query
    ? certEntries.filter(
      (e) =>
        e.title.toLowerCase().includes(query) ||
        e.artiste.toLowerCase().includes(query)
    )
    : certEntries;

  const certificationTabs = [
    {
      title: 'Eligible Songs',
      component: <CertificationEligible certEntries={filteredEntries} />,
    },
    { title: 'Application', component: <CertificationApplication /> },
    {
      title: 'Display',
      component: <CertificationDisplay certEntries={filteredEntries} />,
    },
  ];

  return (
    <CertificationPageStyling>
      <Head>
        <title>TurnTable Charts | Certification</title>
        <meta name="description" content="TurnTable Charts - Certification" />
      </Head>

      {/* ── Tab nav (matches charts page style) ── */}
      <div className="cert_tabs">
        {certificationTabs.map((tab, idx) => (
          <button
            key={idx}
            className={`cert_tab ${activeTabIndex === idx ? 'active' : ''}`}
            onClick={() => setActiveTabIndex(idx)}
          >
            {tab.title}
          </button>
        ))}
      </div>

      {/* ── Search bar (Eligible Songs + Display only) ── */}
      {activeTabIndex !== 1 && (
        <div className="cert_search">
          <svg
            className="cert_search-icon"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
            <path d="M16.5 16.5L21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <input
            className="cert_search-input"
            type="text"
            placeholder="Search by song or artiste"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      )}

      {/* ── Active tab content ── */}
      <div className="cert_content">
        {certificationTabs[activeTabIndex].component}
      </div>
    </CertificationPageStyling>
  );
};

export default Certification;

const CertificationPageStyling = styled.div`
  max-width: 1200px;
  width: 95%;
  margin: 0 auto;
  padding-top: 8rem;
  padding-bottom: 100px;

  ${media.tablet` padding-top: 6rem; `}

  /* ── Tabs ── */
  .cert_tabs {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 60px;
    padding: 1rem 0;
    margin-bottom: 32px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);

    ${media.tablet` gap: 32px; `}
    ${media.mobileLarge`
      gap: 0;
      justify-content: space-between;
    `}
  }

  .cert_tab {
    all: unset;
    cursor: pointer;
    font-family: 'Work Sans', sans-serif;
    font-size: 1rem;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.4);
    position: relative;
    padding-bottom: 4px;
    transition: color 0.2s ease;
    white-space: nowrap;

    &:hover {
      color: rgba(255, 255, 255, 0.75);
    }

    &.active {
      color: white;

      &::after {
        content: '';
        position: absolute;
        bottom: -17px;
        left: -4px;
        width: calc(100% + 8px);
        height: 2px;
        background: #f1920c;
        box-shadow: -1px 0px 6.5px 0px #f1920c;
        backdrop-filter: blur(4px);
        border-radius: 2px;
      }
    }

    ${media.mobileLarge` font-size: 0.875rem; `}
  }

  /* ── Search bar ── */
  .cert_search {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 360px;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 999px;
    padding: 10px 18px;
    margin: 0 auto 40px;

    ${media.mobileLarge`
      width: 100%;
    `}
  }

  .cert_search-icon {
    width: 16px;
    height: 16px;
    color: rgba(255, 255, 255, 0.4);
    flex-shrink: 0;
  }

  .cert_search-input {
    all: unset;
    flex: 1;
    font-family: 'Work Sans', sans-serif;
    font-size: 0.875rem;
    color: white;

    &::placeholder {
      color: rgba(255, 255, 255, 0.35);
    }
  }

  /* ── Content ── */
  .cert_content {
    width: 100%;
  }
`;
