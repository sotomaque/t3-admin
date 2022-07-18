import type { NextPage } from 'next';
import { useEffect } from 'react';
import { useLayout } from 'store';
import RecentUsersPage from './users';

// TODO: add custom homepage
const HomePage: NextPage = () => {
  const { setSelectedRoute } = useLayout();

  useEffect(() => {
    setSelectedRoute('Home');
  }, [setSelectedRoute]);

  // TODO: add home page content
  return <RecentUsersPage />;
};

export default HomePage;
