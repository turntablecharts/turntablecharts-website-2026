import TableCert from 'components/atoms/TableCert';
import Typography from 'components/atoms/typography';
import media from 'constants/MediaQuery';
import Theme from 'constants/Theme';
import { format } from 'date-fns';
import React from 'react';
import styled from 'styled-components';
import { CertificationEntry } from 'utility/CertificationApi/api';
import { resolveUserTypeToTableData } from 'utility/helpers';
import { TableContentLayout } from './TableLayout';

const CERT_HEADER = {
  milestone: {
    key: 'milestone',
    label: 'MILESTONE',
    active: true,
  },
  title: {
    key: 'title',
    label: 'TITLE',
    active: true,
  },
  artiste: {
    key: 'artiste',
    label: 'ARTISTE',
    active: true,
  },
  format: {
    key: 'format',
    label: 'FORMAT',
    active: true,
  },
  label: {
    key: 'label',
    label: 'LABEL',
    active: true,
  },
  certifiedDate: {
    key: 'certifiedDate',
    label: 'CERTIFIED DATE',
    active: true,
  },
  isClaimed: {
    key: 'isClaimed',
    label: ' ',
    active: true,
  },
};

const CertificationEligible: React.FC<{ certEntries: CertificationEntry[] }> = ({ certEntries }) => {
  const tableData = resolveUserTypeToTableData(certEntries, (cur) => ({
    milestone: <TableCert cert={cur.milestone} />,
    title: cur.title,
    artiste: cur.artiste,
    format: cur.format,
    label: cur.label,
    certifiedDate: format(new Date(cur.certifiedDate), 'PP'),
    isClaimed: cur.isClaimed ? (
      <Typography.Text className="isclaimed" uppercase fontType="SFProText" level="large" color="ttcGreen" weight="semiBold">
        Certified
      </Typography.Text>
    ) : (
      <Typography.Text className="isclaimed" uppercase fontType="SFProText" level="large" color="ttcYellow" weight="semiBold">
        Claim plaque
      </Typography.Text>
    ),
  }));
  return (
    <CertificationEligibleStyling>
      <TableContentLayout columns={CERT_HEADER} data={tableData} />
    </CertificationEligibleStyling>
  );
};

export default CertificationEligible;

const CertificationEligibleStyling = styled.div`
  margin-top: 80px;
  ${media.tablet`
  margin-top: 40px;
  `}
  tr {
    background: black;

    td,
    .isclaimed {
      font-family: ${Theme.typography.extra};
      text-transform: uppercase;
      font-size: ${Theme.fontSizes.large};

      ${media.tablet`
    font-size: 14px;
  `}
    }
  }
`;
