import {
  SelectedUserSection,
  SingleColumnContentWrapper,
  Spinner,
} from 'components';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useUsers } from 'store';
import { trpc } from 'utils/trpc';

const UserPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { setSelectedUser, selectedUser } = useUsers();

  const { data, isLoading } = trpc.useQuery([
    'user.userByUserId',
    { userId: `${id}` },
  ]);

  useEffect(() => {
    if (data) {
      setSelectedUser(data.user);
    }
  }, [data, setSelectedUser]);

  return (
    <SingleColumnContentWrapper>
      {isLoading || !selectedUser ? (
        <div className="flex items-center justify-center h-screen">
          <Spinner />
        </div>
      ) : (
        <>
          <SelectedUserSection user={selectedUser} />
        </>
      )}
    </SingleColumnContentWrapper>
  );
};

export default UserPage;
