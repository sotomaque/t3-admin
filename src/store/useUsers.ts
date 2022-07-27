import { User, Transaction, Referral } from 'types';
import create from 'zustand';
import { UserRegistrationProgressType } from 'components/molecules/UserRegistrationProgress/UserRegistrationProgress';
import { BankConnection, BankSubaccount } from 'types/bankConnections';

const initialUserRegistrationStepsState: UserRegistrationProgressType[] = [
  {
    id: 0,
    name: 'Send Auth0 OTP Email',
    description:
      'Send an email to the user with a link to verify their email address',
    transferState: ['Initial'],
    status: 'current',
  },
  {
    id: 1,
    name: 'Verify OTP',
    description:
      "Verify the user's email address by providing the OTP in the email",
    transferState: [
      'Sending Verification Email',
      'Verification Email Sent',
      'Verifying OTP',
    ],
    status: 'upcoming',
  },
  {
    id: 2,
    name: 'Create Auth0 User',
    description: 'Create a new user in Auth0',
    transferState: ['OTP Verified'],
    status: 'upcoming',
  },
  {
    id: 3,
    name: 'Create Eco User',
    description:
      'Create a new user in the Eco server (and link this user to the Auth0 user)',
    transferState: ['Registering User'],
    status: 'upcoming',
  },
  {
    id: 4,
    name: 'Create PT User',
    description: 'Create a PT Account for the user',
    transferState: ['Creating PT Account'],
    status: 'upcoming',
  },
  {
    id: 5,
    name: 'Submit PT KYC Documents',
    description: "Submit the user's KYC documents to the PT server",
    transferState: ['Submitting PT Documents'],
    status: 'upcoming',
  },
  {
    id: 6,
    name: 'Get CIP',
    description: "Get the CIP for the user (needed to modify user's KYC State",
    transferState: ['Getting CIP'],
    status: 'upcoming',
  },
  {
    id: 7,
    name: 'Verify CIP',
    description: "Verify the user's CIP",
    transferState: ['Verifying CIP'],
    status: 'upcoming',
  },
  {
    id: 8,
    name: 'Verify KYC',
    description: 'Verify the user\'s PT KYC State (to "KYC PASSED" state)',
    transferState: ['Verifying KYC'],
    status: 'upcoming',
  },
  {
    id: 9,
    name: 'Complete',
    description: 'Tada!',
    transferState: ['Completed'],
    status: 'upcoming',
  },
];

// STATE TYPE
type UserState = {
  loading: boolean;
  setLoading: (loading: boolean) => void;

  recentUsers: User[] | [];
  setRecentUsers: (users: User[]) => void;

  selectedUser: User | null;
  setSelectedUser: (user: User) => void;

  selectedUserTransactions: Transaction[] | [];
  setSelectedUserTransactions: (transactions: Transaction[]) => void;

  selectedUserReferrals: Referral[] | [];
  setSelectedUserReferrals: (referrals: Referral[]) => void;

  selectedUserBankConnections: BankConnection[] | [];
  setSelectedUserBankConnections: (bankConnections: BankConnection[]) => void;

  selectedUserBankSubaccounts: BankSubaccount[] | [];
  setSelectedUserBankSubaccounts: (subaccounts: any) => void;

  filter: string;
  searchResults: User[] | null;
  setSearchResults: (results: User[] | null) => void;
  setSearchFilter: (filter: string) => void;
  clearSearchFilter: () => void;

  searchError: string;
  setSearchError: (error: string) => void;
  clearSearchError: () => void;

  clearSelectedUser: () => void;

  // user registration
  userRegistrationSteps: UserRegistrationProgressType[];
  setUserRegistrationStepAsCurrent: (idOfStepToMarkAsCurrent: number) => void;
};

// INITIAL STATE
export const useUsers = create<UserState>((set) => ({
  // LOADING
  loading: false,
  setLoading: (loading: boolean) => set(() => ({ loading })),

  // RECENT USERS
  recentUsers: [],
  setRecentUsers: (recentUsers: User[]) => set(() => ({ recentUsers })),

  // SELECTED USER
  selectedUser: null,
  setSelectedUser: (selectedUser: User) => set(() => ({ selectedUser })),
  clearSelectedUser: () =>
    set(() => ({
      selectedUser: null,
      selectedUserTransactions: [],
      selectedUserReferrals: [],
    })),

  // SELECTED USERS TRANSACTIONS
  selectedUserTransactions: [],
  setSelectedUserTransactions: (selectedUserTransactions: Transaction[]) =>
    set(() => ({ selectedUserTransactions })),

  // SELECTED USERS REFERRALS
  selectedUserReferrals: [],
  setSelectedUserReferrals: (selectedUserReferrals: Referral[]) =>
    set(() => ({ selectedUserReferrals })),

  // SELECTED USERS BANK CONNECTIONS
  selectedUserBankConnections: [],
  setSelectedUserBankConnections: (
    selectedUserBankConnections: BankConnection[]
  ) => set(() => ({ selectedUserBankConnections })),

  // SELECTED USERS BANK SUBACCOUNTS
  selectedUserBankSubaccounts: [],
  setSelectedUserBankSubaccounts: (
    selectedUserBankSubaccounts: BankSubaccount[]
  ) => set(() => ({ selectedUserBankSubaccounts })),

  // SEARCH FILTER
  filter: '',
  searchResults: null,
  setSearchResults: (searchResults: User[] | null) =>
    set(() => ({ searchResults })),
  setSearchFilter: (filter: string) => set(() => ({ filter })),
  clearSearchFilter: () => set(() => ({ filter: '' })),

  // Serach Error
  searchError: '',
  setSearchError: (searchError: string) =>
    set(() => ({
      searchError,
    })),
  clearSearchError: () =>
    set(() => ({
      searchError: '',
    })),

  // USER REGISTRATION
  userRegistrationSteps: initialUserRegistrationStepsState,
  setUserRegistrationStepAsCurrent: (idOfStepToMarkAsCurrent: number) =>
    set(() => ({
      userRegistrationSteps: initialUserRegistrationStepsState.map((s) => {
        let userRegistrationStepsState = { ...s };

        if (s.id === idOfStepToMarkAsCurrent) {
          userRegistrationStepsState = { ...s, status: 'current' };
        } else if (s.id > idOfStepToMarkAsCurrent) {
          userRegistrationStepsState = { ...s, status: 'upcoming' };
        } else {
          userRegistrationStepsState = { ...s, status: 'complete' };
        }

        return userRegistrationStepsState;
      }),
    })),
}));
