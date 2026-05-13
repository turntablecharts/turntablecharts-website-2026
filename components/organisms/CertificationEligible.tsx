import MobileCertCard from 'components/atoms/MobileCertCard';
import MobileCertEntry from 'components/atoms/MobileCertEntry';
import TableCert from 'components/atoms/TableCert';
import media from 'constants/MediaQuery';
import Theme from 'constants/Theme';
import { format } from 'date-fns';
import React from 'react';
import styled from 'styled-components';
import { CertificationEntry } from 'utility/CertificationApi/api';
import { resolveUserTypeToTableData } from 'utility/helpers';
import { TableContentLayout } from './TableLayout';

const MOBILE_CERT_HEADER = {
  milestone: {
    key: 'milestone',
    label: 'Milestones',
    active: true,
  },
  entry: {
    key: 'entry',
    label: 'Title',
    active: true,
  },
  certifiedDate: {
    key: 'certifiedDate',
    label: 'Certified Date',
    active: true,
  },
};
const CERT_HEADER = {
  milestone: {
    key: 'milestone',
    label: 'Milestones',
    active: true,
  },
  title: {
    key: 'title',
    label: 'Title',
    active: true,
  },
  artiste: {
    key: 'artiste',
    label: 'Artiste',
    active: true,
  },
  format: {
    key: 'format',
    label: 'Format',
    active: true,
  },
  certifiedDate: {
    key: 'certifiedDate',
    label: 'Certified Date',
    active: true,
  },
};

const CertificationEligible: React.FC<{ certEntries: CertificationEntry[] }> = ({ certEntries }) => {
  const tableData = resolveUserTypeToTableData(certEntries, (cur) => ({
    milestone: <TableCert cert={cur.milestone} />,
    title: cur.title,
    artiste: cur.artiste,
    format: cur.format,
    certifiedDate: format(new Date(cur.certifiedDate), 'PP'),
  }));

  const mobileTableData = resolveUserTypeToTableData(certEntries, (cur) => ({
    milestone: <TableCert cert={cur.milestone} />,
    entry: <MobileCertEntry title={cur.title} artiste={cur.artiste} format={cur.format} />,
    certifiedDate: format(new Date(cur.certifiedDate), 'PP'),
  }));
  return (
    <CertificationEligibleStyling>
      <div className="desktop">
        <div className="certContainer">
          <TableContentLayout columns={CERT_HEADER} data={tableData} />
        </div>
      </div>
      <div className="mobileLarge">
        <TableContentLayout columns={MOBILE_CERT_HEADER} data={mobileTableData} />
      </div>
      <div className="mobile">
        {certEntries.map((entry) => (
          <MobileCertCard key={entry.id} entry={entry} />
        ))}
      </div>
    </CertificationEligibleStyling>
  );
};

export default CertificationEligible;

const CertificationEligibleStyling = styled.div`
  margin-top: 10px;

  ${media.tablet`
    margin-top: 20px;
  `}

  /* ── Column widths (desktop: evenly spaced) ── */
  th, td { width: 20%; }
  th:nth-child(5), td:nth-child(5) { text-align: left !important; }

  ${media.tablet`
    th:nth-child(1), td:nth-child(1) { min-width: 120px; width: 120px; }
    th:nth-child(2), td:nth-child(2) { min-width: 0; }

    /* All table text 10px on mobile */
    td, th { font-size: 10px !important; }
    td * { font-size: 10px !important; }

    /* Title column — sentence case */
    td:nth-child(2) {
      text-transform: none !important;
      * { text-transform: none !important; }
    }

    /* Table header sticky below tabs+search on mobile */
    th { top: 200px !important; }

    /* Left-align milestone and certified date headers/cells */
    th:nth-child(1),
    th:nth-child(3),
    td:nth-child(3) { text-align: left !important; }

    /* Narrow certified date so title gets more room */
    th:nth-child(3), td:nth-child(3) { width: 78px !important; max-width: 78px !important; white-space: nowrap; }
  `}

  /* Override shared table background to black */
  table, tbody { background: #000 !important; }
  th {
    background-color: #000 !important;
    text-align: left !important;
    top: 220px !important;
    box-shadow: 0 -24px 0 0 #000;
  }

  tr {
    background-color: #000;
    td {
      font-family: ${Theme.typography.heading2};
      text-transform: uppercase;
      font-size: ${Theme.fontSizes.medium};

      ${media.tablet`
        font-size: 14px;
      `}
    }
  }

  .mobileLarge { display: none; }
  .mobile { display: none; }

  ${media.tablet`
    .desktop { display: none; }
    .mobileLarge { display: block; }
  `}
  ${media.mobile`
    .desktop { display: none; }
    .mobileLarge { display: block; }
    .mobile { display: none; }
  `}
`;
