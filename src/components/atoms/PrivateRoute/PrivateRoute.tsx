import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';
import { isProduction } from 'utils/config';
import Spinner from '../Spinner';

interface PrivateRouteProps {
  protectedRoutes: string[];
  children: JSX.Element;
}

const PrivateRoute = ({
  protectedRoutes,
  children,
}: PrivateRouteProps): JSX.Element => {
  const router = useRouter();
  const { data: sessionData, status } = useSession();
  const isLoading = useMemo(() => {
    return status === 'loading';
  }, [status]);
  const isAuthenticated = useMemo(() => {
    return status === 'authenticated' && sessionData?.user;
  }, [status, sessionData]);

  const pathIsProtected = protectedRoutes.indexOf(router.pathname) !== -1;

  useEffect(() => {
    console.log({
      isProduction,
      isAuthenticated,
      pathIsProtected,
      isLoading,
      pathname: router.pathname,
    });
    if (!isLoading && !isAuthenticated && pathIsProtected && isProduction) {
      router.push('/unauthed');
    }
  }, [pathIsProtected, router, isLoading, isAuthenticated, isProduction]);

  if ((isLoading || !isAuthenticated) && pathIsProtected && isProduction) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return children;
};

export default PrivateRoute;
