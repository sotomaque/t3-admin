import { useProtectedRoute } from 'hooks';
import type { NextPage } from 'next';
import { useEffect } from 'react';
import { useLayout } from 'store';
import Users from './users';

const Home: NextPage = () => {
  // Effect(s)
  const { setSelectedRoute } = useLayout();
  useProtectedRoute();
  useEffect(() => {
    setSelectedRoute('Home');
  }, [setSelectedRoute]);

  return <Users />;
};

export default Home;
