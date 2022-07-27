export type LinkStatus = 'REQUIRES_RELINK' | 'LINK_OK';

export type BankConnection = {
  id: string;
  itemID: string;
  providerItemID: string;
  institutionID: string;
  institutionName: string;
  linkStatus: LinkStatus;
  accessToken: string;
  lastTimeStatusChecked: string;
  createdAt: string;
  timeAccountsAvailable: string;
};
