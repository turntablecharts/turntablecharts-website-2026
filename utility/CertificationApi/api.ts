import TTCRequest from 'lib/axios';

export type CertificationEntry = {
  id: number;
  milestone: string;
  title: string;
  artiste: string;
  format: string;
  label: string;
  certifiedDate: string;
  isClaimed: boolean;
};

export const getAllCertificationEntry = async () => {
  const response = await TTCRequest.get<CertificationEntry[]>('/api/certified-song');
  return response;
};
