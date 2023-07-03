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
      <Typography.Text className="isclaimed" uppercase fontType="SFProText" level="medium" weight="semiBold">
        {`${hasMilestoneCount ? `${count}x` : ''}${milestone.toUpperCase()}`}
      </Typography.Text>
    </TableCertStyling>
  );
};

export default TableCert;

const TableCertStyling = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;

  .collection {
    position: relative;
    /* display: flex; */
    height: 40px;

    &.left {
      left: -10.5px;
    }
    ${media.mobileLarge`
    height: 20px;

    `}
  }
  .certs {
    width: 40px;
    height: 40px;
    ${media.mobileLarge`
    width: 25px;
    height: 25px;
    `}
  }
`;
