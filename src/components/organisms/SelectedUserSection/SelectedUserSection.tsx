import {
  FeatureFlagsSection,
  UserProfileSummary,
  SelectedUserTransfersSection,
  SelectedUserReferralsSection,
  UserFlagsCard,
} from 'components';
import { User } from 'types';

interface SelectedUserSectionProps {
  user: User;
}

const SelectedUserSection = ({ user }: SelectedUserSectionProps) => {
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
        <FeatureFlagsSection />
      </div>
    </div>
  );
};

export default SelectedUserSection;
