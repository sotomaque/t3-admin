export type NavigationRoute = {
  name: RoutePath;
  href: string;
};

export type RoutePath =
  | 'Home'
  | 'Users'
  | 'Transfers'
  | 'Services'
  | 'Repos'
  | 'Dashboard'
  | 'Feature Flags';
