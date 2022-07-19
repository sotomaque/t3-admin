import React from 'react';
import { RoutePath } from 'types/routes';
import create from 'zustand';

// STATE TYPE
type LayoutState = {
  // Routes
  selectedRoute: RoutePath;
  setSelectedRoute: (selectedRoute: RoutePath) => void;

  // Notifications
  showNotification: boolean;
  setShowNotification: (showNotification: boolean) => void;

  // Popup
  showPopup: boolean;
  setShowPopup: (showPopup: boolean) => void;

  // Search
  searchComponent: React.ReactNode | null;
  setSearchComponent: (searchComponent: React.ReactNode) => void;
  clearSearchComponent: () => void;
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

  // Popup
  showPopup: false,
  setShowPopup: (showPopup: boolean) => set(() => ({ showPopup })),

  // Search
  searchComponent: null,
  setSearchComponent: (searchComponent: React.ReactNode) =>
    set(() => ({
      searchComponent,
    })),
  clearSearchComponent: () =>
    set(() => ({
      searchComponent: null,
    })),
}));
