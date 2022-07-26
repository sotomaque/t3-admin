import {
  RecentUsersSection,
  SearchUsers,
  SelectedUserSection,
  SingleColumnContentWrapper,
  Spinner,
} from 'components';
import { NextPage } from 'next';
import React, { useEffect, useRef } from 'react';
import { useLayout, useUsers } from 'store';
import { trpc } from 'utils/trpc';

const RecentUsersPage: NextPage = () => {
  // Effect(s)
  const { setSelectedRoute, setSearchComponent, clearSearchComponent } =
    useLayout();
  const { setRecentUsers, recentUsers, selectedUser, setLoading } = useUsers();
  const {
    data: usersData,
    isLoading: usersLoading,
    mutate,
  } = trpc.useMutation(['user.recentUsers']);

  useEffect(() => {
    mutate({ pageNumber: '0' });
  }, [mutate]);

  useEffect(() => {
    setSelectedRoute('Users');
  }, [setSelectedRoute]);

  useEffect(() => {
    setRecentUsers(usersData?.users ?? []);
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

  // Search Component
  useEffect(() => {
    setSearchComponent(<SearchUsers />);

    return () => {
      clearSearchComponent();
    };
  }, [setSearchComponent, clearSearchComponent]);

  // Component
  return (
    <SingleColumnContentWrapper>
      {usersLoading && (
        <div className="flex items-center justify-center h-screen">
          <Spinner />
        </div>
      )}
      {!!recentUsers && !usersLoading && (
        <div className="h-full w-full py-10">
          <div className="max-w-10xl mx-auto lg:px-4">
            <div className="max-w-7xl mx-auto">
              <div className="md:p-4 bg-white dark:bg-slate-800">
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
