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

export type BankSubaccount = {
  account_id: string;
  balances: {
    available: number;
    current: number;
    iso_currency_code: string;
    limit?: number | string;
    unofficial_currency_code?: string;
  };
  mask: string;
  name: string;
  official_name: string;
  subtype: string;
  type: string;
};
