import type { NextPage } from 'next';
import { useEffect } from 'react';
import { useLayout } from 'store';
import Users from './users';

// TODO: add custom homepage
const Home: NextPage = () => {
  const { setSelectedRoute } = useLayout();

  useEffect(() => {
    setSelectedRoute('Home');
  }, [setSelectedRoute]);

  // TODO: add home page content
  return <Users />;
};

export default Home;
