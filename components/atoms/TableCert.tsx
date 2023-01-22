import React from 'react';
import styled from 'styled-components';
import Typography from './typography';
import TTCGoldCert from 'assets/icons/ttc-gold.svg';
import media from 'constants/MediaQuery';

const TableCert = ({ cert }: { cert: string }) => {
  return (
    <TableCertStyling>
      <div className="collection">
        {Array(2)
          .fill({})
          .map((_, i) => (
            <TTCGoldCert key={i.toString() + 'cert'} style={{ position: 'absolute', left: -10.5 * i }} className="certs" />
          ))}
      </div>
      <Typography.Text className="isclaimed" uppercase fontType="SFProText" level="large" weight="semiBold">
        {cert}
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
    left: -10.5px;
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
