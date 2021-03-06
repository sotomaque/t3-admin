import React from 'react';
import { RoutePath } from 'types/routes';
import create from 'zustand';

// STATE TYPE
type LayoutState = {
  // Dark Mode
  isDark: boolean;
  toggleIsDark: () => void;

  // Routes
  selectedRoute: RoutePath;
  setSelectedRoute: (selectedRoute: RoutePath) => void;

  // Notifications
  showNotification: boolean;
  setShowNotification: (showNotification: boolean) => void;
  notificationMessage: string;
  setNotificationMessage: (notificationMessage: string) => void;

  // Popup
  showPopup: boolean;
  setShowPopup: (showPopup: boolean) => void;
  popupComponent: React.ReactNode | null;
  setPopupComponent: (popupComponent: React.ReactNode) => void;
  clearPopupComponent: () => void;

  // Search
  searchComponent: React.ReactNode | null;
  setSearchComponent: (searchComponent: React.ReactNode) => void;
  clearSearchComponent: () => void;

  // Layout
  showLayout: boolean;
  setShowLayout: (showLayout: boolean) => void;
};

// INITIAL STATE
export const useLayout = create<LayoutState>((set) => ({
  // Dark Mode
  isDark: true,
  toggleIsDark: () => set((state) => ({ isDark: !state.isDark })),

  // Routes
  selectedRoute: 'Home',
  setSelectedRoute: (selectedRoute: RoutePath) =>
    set(() => ({ selectedRoute })),

  // Notifications
  showNotification: false,
  setShowNotification: (showNotification: boolean) =>
    set(() => ({ showNotification })),
  notificationMessage: '',
  setNotificationMessage: (notificationMessage: string) =>
    set(() => ({ notificationMessage })),

  // Popup
  showPopup: false,
  setShowPopup: (showPopup: boolean) => set(() => ({ showPopup })),
  popupComponent: null,
  setPopupComponent: (popupComponent: React.ReactNode) =>
    set(() => ({
      popupComponent,
    })),
  clearPopupComponent: () =>
    set(() => ({
      popupComponent: null,
    })),

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

  // Layout
  showLayout: true,
  setShowLayout: (showLayout: boolean) => set(() => ({ showLayout })),
}));
