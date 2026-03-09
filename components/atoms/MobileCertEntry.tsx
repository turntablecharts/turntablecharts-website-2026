import React, { FC } from 'react';
import styled from 'styled-components';
import Typography from './typography';

type EntryProp = {
  title: string;
  artiste: string;
  format: string;
};

const MobileCertEntry: FC<EntryProp> = ({ title, artiste, format }) => {
  return (
    <MobileCertEntryStyling>
      <div className="flex">
        <Typography.Text fontType="OpenSans" level="medium" weight="semiBold">
          {title}
        </Typography.Text>
        <Typography.Text fontType="OpenSans" level="xsmall" weight="thin">
          ({format})
        </Typography.Text>
      </div>
      <Typography.Text fontType="OpenSans" level="small">
        {artiste}
      </Typography.Text>
    </MobileCertEntryStyling>
  );
};

export default MobileCertEntry;

const MobileCertEntryStyling = styled.div`
  .flex {
    display: flex;
    gap: 5px;
    align-items: flex-end;
  }
`;
