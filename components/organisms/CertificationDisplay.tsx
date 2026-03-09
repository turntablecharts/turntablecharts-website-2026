import MobileCertCard from 'components/atoms/MobileCertCard';
import MobileCertEntry from 'components/atoms/MobileCertEntry';
import TableCert from 'components/atoms/TableCert';
import media from 'constants/MediaQuery';
import Theme from 'constants/Theme';
import { format } from 'date-fns';
import React from 'react';
import styled from 'styled-components';
import { CertificationEntry } from 'utility/CertificationApi/api';
import useMediaQuery, { resolveUserTypeToTableData } from 'utility/helpers';
import { TableContentLayout } from './TableLayout';

const MOBILE_CERT_HEADER = {
  milestone: { key: 'milestone', label: 'Milestone', active: true },
  entry: { key: 'entry', label: 'Entry', active: true },
  certifiedDate: { key: 'certifiedDate', label: 'Certified Date', active: true },
};

const CERT_HEADER = {
  milestone: { key: 'milestone', label: 'Milestones', active: true },
  title: { key: 'title', label: 'Title', active: true },
  artiste: { key: 'artiste', label: 'Artiste', active: true },
  format: { key: 'format', label: 'Format', active: true },
  certifiedDate: { key: 'certifiedDate', label: 'Certified Date', active: true },
};

const CertificationDisplay: React.FC<{ certEntries: CertificationEntry[] }> = ({ certEntries }) => {
  const matchesMobileLarge = useMediaQuery('(max-width: 700px)');

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
    <CertificationDisplayStyling>
      <div className="desktop">
        <TableContentLayout columns={CERT_HEADER} data={tableData} />
      </div>
      <div className="mobileLarge">
        <TableContentLayout columns={MOBILE_CERT_HEADER} data={mobileTableData} />
      </div>
      <div className="mobile">
        {certEntries.map((entry) => (
          <MobileCertCard isDisplay key={entry.id} entry={entry} />
        ))}
      </div>
    </CertificationDisplayStyling>
  );
};

export default CertificationDisplay;

const CertificationDisplayStyling = styled.div`
  margin-top: 10px;

  ${media.tablet` margin-top: 20px; `}

  /* ── Column widths ── */
  th:nth-child(1), td:nth-child(1) { min-width: 220px; width: 220px; text-align: center; }
  th:nth-child(2), td:nth-child(2) { min-width: 180px; }
  th:nth-child(3), td:nth-child(3) { width: 140px; max-width: 140px; }
  th:nth-child(4), td:nth-child(4) { width: 100px; }
  th:nth-child(5), td:nth-child(5) { width: 140px; }

  tr {
    background: black;

    td, .isclaimed {
      font-family: ${Theme.typography.heading2};
      text-transform: uppercase;
      font-size: ${Theme.fontSizes.medium};

      ${media.tablet` font-size: 14px; `}
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
    .mobileLarge { display: none; }
    .mobile {
      display: block;
      overflow: auto;
      max-height: 90vh;
      width: 100%;
    }
  `}
`;
