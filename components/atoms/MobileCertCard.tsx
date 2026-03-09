import { format } from 'date-fns';
import React from 'react';
import styled from 'styled-components';
import { CertificationEntry } from 'utility/CertificationApi/api';
import Typography from './typography';
import TTCGoldCert from 'assets/icons/ttc-gold.svg';
import TTCSilverCert from 'assets/icons/ttc-silver.svg';
import TTCPlatinumCert from 'assets/icons/ttc-platinum.svg';

const milestoneMap = {
  silver: TTCSilverCert,
  gold: TTCGoldCert,
  platinum: TTCSilverCert,
};

const MobileCertCard = ({ entry, isDisplay }: { entry: CertificationEntry; isDisplay?: boolean }) => {
  const [milestone, count] = entry.milestone.toLowerCase().split('_');

  const hasMilestoneCount = typeof parseInt(count, 10) === 'number' && parseInt(count, 10) > 1;
  return (
    <MobileCertCardStyling>
      <div className="title">
        <Typography.Text uppercase fontType="Anton" level="xxlarge" weight="semiBold">
          {entry.title}
        </Typography.Text>
        <div className="cert">
          <Typography.Text className="isclaimed" uppercase fontType="Anton" level="medium" weight="semiBold">
            {`${hasMilestoneCount ? `${count}x` : ''} ${milestone.toUpperCase()}`}
          </Typography.Text>
          <div className="collection">
            {hasMilestoneCount
              ? Array(parseInt(count, 10))
                .fill({})
                .map((_, i) =>
                  React.createElement(milestoneMap[milestone as 'silver' | 'gold' | 'platinum'], {
                    key: i.toString() + 'cert',
                    style: { position: 'absolute', left: 10.5 * i },
                    className: 'certs',
                  }),
                )
              : React.createElement(milestoneMap[milestone as 'silver' | 'gold' | 'platinum'], { className: 'certs' })}
          </div>
        </div>
      </div>
      <div className="details">
        <Typography.Text uppercase fontType="OpenSans">
          ARTISTE: {entry.artiste}
        </Typography.Text>
        <Typography.Text uppercase fontType="OpenSans">
          FORMAT: {entry.format}
        </Typography.Text>
        <Typography.Text uppercase fontType="OpenSans">
          LABEL: {entry.label}
        </Typography.Text>
        <Typography.Text uppercase fontType="OpenSans">
          CERTIFICATION DATE: {format(new Date(entry.certifiedDate), 'PP')}
        </Typography.Text>
      </div>
      {!isDisplay && (
        <div style={{ textAlign: 'center', marginTop: '35px' }}>
          {entry.isClaimed ? (
            <Typography.Text className="isclaimed" uppercase fontType="OpenSans" level="medium" color="ttcGreen" weight="semiBold">
              Certified
            </Typography.Text>
          ) : (
            <Typography.Text className="isclaimed" uppercase fontType="OpenSans" level="medium" color="ttcYellow" weight="semiBold">
              Claim plaque
            </Typography.Text>
          )}
        </div>
      )}
    </MobileCertCardStyling>
  );
};

export default MobileCertCard;

const MobileCertCardStyling = styled.div`
  background: #222;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  .title {
    margin-bottom: 35px;

    .cert {
      display: flex;
      align-items: center;
      gap: 10px;
      .collection {
        position: relative;
        height: 20px;
        display: grid;
        place-items: center;
      }
    }
  }
  .details p:not(:last-child) {
    margin-bottom: 20px;
  }
`;
