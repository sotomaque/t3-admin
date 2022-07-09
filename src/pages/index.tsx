import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { RecentUsersSection, Spinner, SelectedUserSection } from 'components';
import { User } from 'types';
import { trpc } from 'utils/trpc';

const Home: NextPage = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const { data: usersData, isLoading: usersLoading } = trpc.useQuery([
    'example.users',
  ]);
  const [users, setUsers] = useState<User[] | null>(null);

  useEffect(() => {
    if (usersData && usersData.users) {
      setUsers(usersData.users);
    }
  }, [usersData]);

  return (
    <>
      <Head>
        <title>Tables Fun</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {usersLoading && (
        <div className="flex items-center justify-center h-screen">
          <Spinner />
        </div>
      )}
      {!!users && (
        <div className="bg-gray-100 h-full w-full py-10">
          <div className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-4">
            <div className="max-w-7xl mx-auto">
              {/* Mock All Users */}
              <div className="p-4 bg-white">
                <RecentUsersSection
                  users={users}
                  selectedUser={selectedUser}
                  setSelectedUser={setSelectedUser}
                />
              </div>

              <div className="h-10" />
              {/* Mock Selected User */}
              {selectedUser && (
                <SelectedUserSection
                  user={selectedUser}
                  setSelectedUser={setSelectedUser}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
