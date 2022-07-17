import create from 'zustand';

// Move to Types
export type RoutePath =
  | 'Home'
  | 'Users'
  | 'Services'
  | 'Repos'
  | 'Dashboard'
  | 'Feature Flags';

// STATE TYPE
type LayoutState = {
  // Routes
  selectedRoute: RoutePath;
  setSelectedRoute: (selectedRoute: RoutePath) => void;

  // Notifications
  showNotification: boolean;
  setShowNotification: (showNotification: boolean) => void;
};

// INITIAL STATE
export const useLayout = create<LayoutState>((set) => ({
  // Routes
  selectedRoute: 'Home',
  setSelectedRoute: (selectedRoute: RoutePath) =>
    set(() => ({ selectedRoute })),

  // Notifications
  showNotification: false,
  setShowNotification: (showNotification: boolean) =>
    set(() => ({ showNotification })),
}));
