import {
  Layout,
  RecentUsersSection,
  SelectedUserSection,
  SingleColumnContentWrapper,
  Spinner,
} from 'components';
import { useEffect, useRef } from 'react';
import { useUsers } from 'store';
import { trpc } from 'utils/trpc';

const Users = () => {
  const { setRecentUsers, recentUsers, selectedUser, setLoading } = useUsers();
  const { data: usersData, isLoading: usersLoading } = trpc.useQuery([
    'example.recentUsers',
  ]);

  useEffect(() => {
    if (usersData && usersData.users) {
      setRecentUsers(usersData.users);
    }
  }, [setRecentUsers, usersData]);

  useEffect(() => {
    setLoading(usersLoading);
  }, [setLoading, usersLoading]);

  const selectedUserRef = useRef(null);

  const scrollToBottom = () => {
    // @ts-ignore:next-line
    selectedUserRef?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (selectedUser) {
      scrollToBottom();
    }
  }, [selectedUser]);

  return (
    <Layout>
      <SingleColumnContentWrapper>
        {usersLoading && (
          <div className="flex items-center justify-center h-screen">
            <Spinner />
          </div>
        )}
        {!!recentUsers && !usersLoading && (
          <div className="bg-gray-100 h-full w-full py-10">
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
    </Layout>
  );
};

export default Users;
