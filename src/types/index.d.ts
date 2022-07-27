import { SVGProps } from 'react';

export type RouteName =
  | 'Dashboard'
  | 'Users'
  | 'Documentation'
  | 'Repos'
  | 'Services'
  | 'Feature Flags';

export type RouteType = {
  name: RouteName;
  icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  route: string;
};

export type Service =
  | 'Github'
  | 'Launch Darkly'
  | 'Auth0'
  | 'Postman'
  | 'Figma'
  | 'Lucid.app'
  | 'Confluence'
  | 'Jira'
  | 'Apple App Store Connect'
  | 'CircleCI'
  | 'Unbank'
  | 'Mixpanel'
  | 'Firebase'
  | 'Slack'
  | 'Zoom'
  | 'Cognito'
  | 'Papaya'
  | 'Zendesk'
  | 'Pinwheel'
  | 'Lithic';

export type ServiceType = {
  name: Service;
  function: string;
  adminEmail?: string;
  url: string;
  imageUrl: string;
  imageStyles?: string;
};

export type User = {
  earningsAccountProvider: string;
  userFlags?: string[] | null;
  userID: string;
  auth0UserID: string;
  email: string;
  username: string;
  name: string;
  givenName: string;
  familyName: string;
  kycData: KycData;
  tosAcceptances?: null[] | null | TOSData[];
  tierData: TierData;
  gravatarUpdated: boolean;
  created: number;
  devices?: Device[] | null;
  flowSessionID?: string;
  accounts?: AccountEntity[] | null;
};
export type KycData = {
  kycStatuses?: KycStatusesEntity[] | null;
};
export type KycStatusesEntity = {
  provider: string;
  status: string;
};
export type TOSData = {
  _id: string;
  provider: string;
  accepted: boolean;
  appVersion: string;
  createdAt: string;
};
export type TierData = {
  _id: string;
  tier: string;
  createdAt: string;
};
export type AccountEntity = {
  provider: Provider;
  doNotSendToApp: boolean;
  accountID: string;
  label: string;
  userID: string;
  monthlyInterestRate: string;
  apy: string;
  balanceModifiersData?: null[] | null;
  wallet?: Wallet;
  payer?: Payer;
  createdAt: string;
  created: number;
  lastInterestDepositDate?: string;
  primeTrustData?: PrimeTrustData;
  ecoTokenData?: EcoTokenData;
};
export type Provider = 'PRIME_TRUST' | 'ECO_TOKEN' | 'WYRE';
export type PrimeTrustData = {
  prTrustAccountID: string;
  providerID: string;
  providerStatus: string;
  providerAccountCreated: boolean;
  balances?: PrimeTrustBalancesEntity[] | null;
  contact?: PrimeTrustContactEntity | null;
  webhookID: string;
  kycState: string;
  cipChecks?: PrimeTrustChipCheckEntity | null;
  kycRequiredActions?: { [key: string]: string } | null;
};

export type PrimeTrustChipCheckEntity = {
  exceptions: string[];
  createdAt: string;
  exceptionDetails: string;
  updatedAt: string;
};
export type PrimeTrustBalancesEntity = {
  'contingent-hold': number;
  'non-contingent-hold': number;
  'currency-type': string;
  disbursable: number;
  'pending-transfer': number;
  settled: number;
  'updated-at': string;
};
export type PrimeTrustContactEntity = {
  type: string;
  providerContactID: string;
  attributes: PrimeTrustContactAttributesEntity;
};
export type PrimeTrustContactAttributesEntity = {
  'account-roles': string[];
  'aml-cleared': boolean;
  'cip-cleared': boolean;
  'identity-confirmed': boolean;
  'identity-documents-verified': boolean;
  'proof-of-address-documents-verified': boolean;
  'region-of-formation': null | string;
  type: string;
  'created-at': string;
  'updated-at': string;
};
export type Wallet = {
  walletID: string;
  providerWalletCreated: boolean;
  walletType: string;
  isMigrated: boolean;
  isPrimaryAccount: boolean;
  balances?: BalancesEntity[] | null;
};
export type BalancesEntity = {
  pendingDepositsAmount: number;
  amountOnHold: string;
  currency: string;
  address: string;
  providerBalance: ProviderBalance;
  pendingTxsAmount: string;
};
export type ProviderBalance = {
  totalBalance: string;
  availableBalance: string;
  pendingInterestBalance: string;
};
export type Payer = {
  payerID: string;
  kycCompleted: boolean;
  providerPayerCreated: boolean;
  regionCode: string;
};
export type EcoTokenData = {
  ecoAccountID: string;
  status: string;
  balances?: EcoTokenBalanceEntity[] | null;
};
export type EcoTokenBalanceEntity = {
  currency: string;
  totalBalance: string;
  availableBalance: string;
  lastUpdatedAt: string;
};
export type TransactionServer = {
  data?: Transaction[] | null;
};
export type Transaction = {
  accountID?: string | null;
  currency: string;
  amount: string;
  balance?: string | null;
  src: string;
  dst: string;
  category: string;
  createdAt: string;
  description?: string | null;
  transactionID: string;
  state: string;
  trackingID: string;
  srcMask?: string | null;
  dstMask?: string | null;
};
export type Device = {
  deviceID: string;
  ecoAppVersion: string;
  userAgent: string;
  alerts?: null[] | null;
  feedItems?: FeedItemsEntity[] | null;
  created: string;
  lastFeedItem?: string;
};
export type FeedItemsEntity = {
  _id: string;
  feedItemID: string;
  category: string;
  created: string;
  userID: string;
  payload: Payload;
};
export type Payload = {
  type?: string;
  properties?: Properties | null;
  title?: string | null;
};
export type Properties = {
  transferID?: string | null;
  transferType?: string | null;
  source?: Source | null;
  destination?: Destination | null;
  amount?: string;
  transferLeg?: number;
};
export type Source = {
  ptPlaidAccount?: PtPlaidAccount;
  primeTrustAccount?: PrimeTrustAccount;
};
export type PtPlaidAccount = {
  accountID: string;
  label: string;
  mask: string;
};
export type Destination = {
  wyreAccount?: WyreAccount;
  primeTrustAccount?: PtPlaidAccount;
  ptPlaidAccount?: PtPlaidAccount;
};
export type WyreAccount = {
  accountID: string;
  label: string;
};
export type ReferralsEntity = {
  referrals?: Referral[] | null;
};
export type Referral = {
  referralID: string;
  referringUserID: string;
  referralState: string;
  referredUser: ReferredUser;
  createdAt: string;
  referringUserRewards?: null[] | null;
};
export type ReferredUser = {
  email: string;
  totalDeposited: string;
};

export enum KycStatus {
  passed = 'Passed',
  pending = 'Pending',
  notStarted = 'Not Started',
}

//
export interface Transfer {
  originatingUserID: string;
  recipientUserID: string;
  idempotentID: string;
  transferID: string;
  state: string;
  source: Source;
  destination: Destination;
  amount: Amount;
  trackingData: TrackingData;
  transferData: TransferData;
  requestSubmittedAt: string;
}
export interface Amount {
  value: string;
  currency: string;
}
export interface TrackingData {
  trackingID: string;
  transferCategory: string;
  additionalData: AdditionalData;
}
export interface AdditionalData {
  accountData: AccountData;
  ecoTransferID: string;
  description: string;
}
export interface AccountData {
  srcAccount: PtPlaidAccount;
  destAccount: PtPlaidAccount;
}
export interface TransferData {
  transferLegs: TransferLegs;
  submitTime: string;
  completionTime: string;
}
export interface TransferLegs {
  transferIDs?: string[] | null;
  numLegs: number;
  numCompleted: number;
}
export interface PrimeTrustTransfer {
  transferType: string;
  idempotentID: string;
  originatingUserID: string;
  recipientUserID: string;
  transferID: string;
  state: string;
  plaidAccountID: string;
  providerFundsTransferMethodID: string;
  amount: Amount;
  trackingData: TrackingData;
  expired: boolean;
  numRetries: number;
  jobStateChangeCallback: JobStateChangeCallback;
  requestSubmittedAt: string;
  destAccountID: string;
  transferData: TransferData;
}
export interface Amount {
  value: string;
  currency: string;
}
export interface TrackingData {
  trackingID: string;
  transferCategory: string;
  additionalData: AdditionalData;
  src: string;
  dest: string;
}
export interface AdditionalData {
  accountData: AccountData;
  ecoTransferID: string;
}
export interface JobStateChangeCallback {
  queueName: string;
  serializedEvent: SerializedEvent;
}
export interface SerializedEvent {
  eventType: string;
  properties: Properties;
  transferID: string;
}
export interface TransferData {
  providerTransferID: string;
  submitTime: string;
  completionTime: string;
}
//
