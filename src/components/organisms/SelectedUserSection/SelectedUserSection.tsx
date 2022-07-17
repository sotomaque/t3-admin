import {
  UserProfileSummary,
  SelectedUserTransfersSection,
  SelectedUserReferralsSection,
  UserFlagsCard,
} from 'components';
import { useEffect } from 'react';
import { User } from 'types';
import { trpc } from 'utils/trpc';

interface SelectedUserSectionProps {
  user: User;
}

const SelectedUserSection = ({ user }: SelectedUserSectionProps) => {
  const { data, isLoading, error } = trpc.useQuery([
    'featureFlags.getAllFeatureFlags',
  ]);

  useEffect(() => {
    // if the query gives us flags
    if (data) {
      console.log({ data });
    }
  }, [data]);

  return (
    <div>
      {/* Profile / User Flags */}
      <div className="h-10" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="col-span-1 md:bg-white">
          <UserProfileSummary user={user} />
        </div>
        <div className="col-span-1 md:bg-white">
          <UserFlagsCard user={user} />
        </div>
      </div>
      {/* Transfers */}
      <div className="h-10" />
      <div className="p-4 bg-white">
        <SelectedUserTransfersSection userId={user.userID} />
      </div>
      {/* Referrals */}
      <div className="h-10" />
      <div className="p-4 bg-white">
        <SelectedUserReferralsSection user={user} />
      </div>
      {/* Feature Flags */}
      <div className="h-10" />
      <div className="p-4 bg-white">
        <div>TODO</div>
      </div>
    </div>
  );
};

export default SelectedUserSection;
