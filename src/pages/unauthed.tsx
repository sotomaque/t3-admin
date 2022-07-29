import { UnauthenticatedSection } from 'components';
import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Unauthed: NextPage = () => {
  // Effect(s)
  const router = useRouter();
  const { data: sessionData } = useSession();
  useEffect(() => {
    if (sessionData && sessionData.user) {
      router.replace('/');
    }
  }, [sessionData, router]);
  return <UnauthenticatedSection />;
};

export default Unauthed;
