import dynamic from 'next/dynamic';
import { useEffect, useRef } from 'react';
import { useLayout, useUsers } from 'store';
import { trpc } from 'utils/trpc';

const SingleColumnContentWrapper = dynamic(
  () =>
    import(
      'components/layout/LayoutContentWrappers/SingleColumnContentWrapper'
    ),
  { ssr: false }
);
const RecentUsersSection = dynamic(
  () => import('components/organisms/RecentUsersSection'),
  { ssr: false }
);
const SearchUsers = dynamic(() => import('components/molecules/SearchUsers'), {
  ssr: false,
});
const SelectedUserSection = dynamic(
  () => import('components/organisms/SelectedUserSection'),
  { ssr: false }
);
const Spinner = dynamic(() => import('components/atoms/Spinner'), {
  ssr: false,
});

const RecentUsersPage = () => {
  // Effect(s)
  const { setSelectedRoute } = useLayout();
  const { setRecentUsers, recentUsers, selectedUser, setLoading } = useUsers();
  const { data: usersData, isLoading: usersLoading } = trpc.useQuery([
    'user.recentUsers',
  ]);
  useEffect(() => {
    setSelectedRoute('Users');
  }, [setSelectedRoute]);
  useEffect(() => {
    if (usersData && usersData.users) {
      setRecentUsers(usersData.users);
    }
  }, [setRecentUsers, usersData]);
  useEffect(() => {
    setLoading(usersLoading);
  }, [setLoading, usersLoading]);
  useEffect(() => {
    if (selectedUser) {
      scrollToBottom();
    }
  }, [selectedUser]);
  const selectedUserRef = useRef(null);

  // Function(s)
  const scrollToBottom = () => {
    // @ts-ignore:next-line
    selectedUserRef?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Component
  return (
    <SingleColumnContentWrapper searchComponent={<SearchUsers />}>
      {usersLoading && (
        <div className="flex items-center justify-center h-screen">
          <Spinner />
        </div>
      )}
      {!!recentUsers && !usersLoading && (
        <div className="h-full w-full py-10">
          <div className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-4">
            <div className="max-w-7xl mx-auto">
              <div className="p-4 bg-white">
                <RecentUsersSection users={recentUsers} />
              </div>

              {selectedUser && (
                <div ref={selectedUserRef}>
                  <SelectedUserSection user={selectedUser} />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </SingleColumnContentWrapper>
  );
};

export default RecentUsersPage;
