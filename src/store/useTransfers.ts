import { Transfer } from 'types';
import create from 'zustand';

// STATE TYPE
type TransferState = {
  loading: boolean;
  setLoading: (loading: boolean) => void;

  recentTransfers: Transfer[] | [];
  setRecentTransfers: (recentTransfers: Transfer[]) => void;
};

// INITIAL STATE
export const useTransfers = create<TransferState>((set) => ({
  // LOADING
  loading: false,
  setLoading: (loading: boolean) => set(() => ({ loading })),

  // RECENT TRANSFERS
  recentTransfers: [],
  setRecentTransfers: (recentTransfers: Transfer[]) =>
    set(() => ({ recentTransfers })),
}));
