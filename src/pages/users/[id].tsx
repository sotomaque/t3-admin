import {
  SelectedUserSection,
  SingleColumnContentWrapper,
  Spinner,
} from 'components';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useUsers } from 'store';
import { trpc } from 'utils/trpc';

const UserPage: NextPage = () => {
  // Effect(s)
  const router = useRouter();
  const { id } = router.query;
  const { setSelectedUser, selectedUser } = useUsers();
  const { isLoading } = trpc.useQuery(
    ['user.userByUserId', { userId: `${id}` }],
    {
      onSuccess(data) {
        data && data.user && setSelectedUser(data.user);
      },
    }
  );

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
