import create from 'zustand';

// STATE TYPE
type LayoutState = {
  showNotification: boolean;
  setShowNotification: (showNotification: boolean) => void;
};

// INITIAL STATE
export const useLayout = create<LayoutState>((set) => ({
  showNotification: false,
  setShowNotification: (showNotification: boolean) =>
    set(() => ({ showNotification })),
}));
