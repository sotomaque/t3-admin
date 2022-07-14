import { User, Transaction, Referral } from 'types';
import create from 'zustand';

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

  filter: string;
  searchResults: User[] | null;
  setSearchResults: (results: User[] | null) => void;
  setSearchFilter: (filter: string) => void;
  clearSearchFilter: () => void;

  clearSelectedUser: () => void;
};

// INITIAL STATE
export const useUsers = create<UserState>((set) => ({
  loading: false,
  setLoading: (loading: boolean) => set(() => ({ loading })),

  recentUsers: [],
  setRecentUsers: (recentUsers: User[]) => set(() => ({ recentUsers })),

  selectedUser: null,
  setSelectedUser: (selectedUser: User) => set(() => ({ selectedUser })),

  selectedUserTransactions: [],
  setSelectedUserTransactions: (selectedUserTransactions: Transaction[]) =>
    set(() => ({ selectedUserTransactions })),

  selectedUserReferrals: [],
  setSelectedUserReferrals: (selectedUserReferrals: Referral[]) =>
    set(() => ({ selectedUserReferrals })),

  filter: '',
  searchResults: null,
  setSearchResults: (searchResults: User[] | null) =>
    set(() => ({ searchResults })),
  setSearchFilter: (filter: string) => set(() => ({ filter })),
  clearSearchFilter: () => set(() => ({ filter: '' })),

  clearSelectedUser: () =>
    set(() => ({
      selectedUser: null,
      selectedUserTransactions: [],
      selectedUserReferrals: [],
    })),
}));
