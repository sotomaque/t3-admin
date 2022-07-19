export type NavigationRoute = {
  name: RoutePath;
  href: string;
};

export type RoutePath =
  | 'Home'
  | 'Users'
  | 'Services'
  | 'Repos'
  | 'Dashboard'
  | 'Feature Flags';
