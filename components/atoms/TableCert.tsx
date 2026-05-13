import React from 'react';
import styled from 'styled-components';
import Typography from './typography';
import TTCGoldCert from 'assets/icons/ttc-gold.svg';
import TTCSilverCert from 'assets/icons/ttc-silver.svg';
// import TTCPlatinumCert from 'assets/icons/ttc-platinum.svg';
import media from 'constants/MediaQuery';

const milestoneMap = {
  silver: TTCSilverCert,
  gold: TTCGoldCert,
  platinum: TTCSilverCert,
};

const TableCert = ({ cert }: { cert: string }) => {
  const [milestone, count] = cert.toLowerCase().split('_');
  const hasMilestoneCount = typeof parseInt(count, 10) === 'number' && parseInt(count, 10) > 1;

  return (
    <TableCertStyling>
      <div className={`collection ${hasMilestoneCount ? 'left' : ''}`}>
        {hasMilestoneCount
          ? Array(parseInt(count, 10))
            .fill({})
            .map((_, i) =>
              React.createElement(milestoneMap[milestone as 'silver' | 'gold' | 'platinum'], {
                key: i.toString() + 'cert',
                style: { position: 'absolute', left: -10.5 * i },
                className: 'certs',
              }),
            )
          : React.createElement(milestoneMap[milestone as 'silver' | 'gold' | 'platinum'], { className: 'certs' })}
      </div>
      <Typography.Text className="isclaimed" uppercase fontType="WorkSans" level="medium" weight="semiBold">
        {`${hasMilestoneCount ? `${count}x` : ''}${milestone.toUpperCase()}`}
      </Typography.Text>
    </TableCertStyling>
  );
};

export default TableCert;

const TableCertStyling = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;

  .collection {
    display: flex;
    flex-direction: row;
    height: 40px;

    &.left {
      left: 0;
    }
  }

  .certs {
    position: relative !important;
    left: auto !important;
    width: 40px;
    height: 40px;
    flex-shrink: 0;
    margin-left: -29px;

    &:first-child { margin-left: 0; }
  }

  ${media.mobileLarge`
    .collection {
      height: 18px !important;
    }

    .certs {
      width: 18px !important;
      height: 18px !important;
      margin-left: -6px;

      &:first-child { margin-left: 0; }
    }

    .isclaimed {
      font-size: 9px !important;
    }
  `}
`;
