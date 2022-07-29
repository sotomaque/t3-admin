import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const useProtectedRoute = () => {
  const router = useRouter();
  const { data: sessionData } = useSession();
  useEffect(() => {
    if (!sessionData || !sessionData.user) {
      router.replace('/unauthed');
    }
  }, [sessionData, router]);
};

export default useProtectedRoute;
