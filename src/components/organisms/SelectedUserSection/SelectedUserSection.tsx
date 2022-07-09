import { UserProfileSummary, SelectedUserTransfersSection } from 'components';
import { User } from 'types';

interface SelectedUserSectionProps {
  user: User;
}

const SelectedUserSection = ({ user }: SelectedUserSectionProps) => {
  return (
    <div>
      {/* First Row */}
      <div className="h-10" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="col-span-1 md:bg-white">
          <UserProfileSummary user={user} />
        </div>
        <div className="col-span-1 md:bg-white">
          <div>TODO: User Flags</div>
        </div>
      </div>
      {/* Second Row */}
      <div className="h-10" />
      <div className="p-4 bg-white">
        <SelectedUserTransfersSection userId={user.userID} />
      </div>
    </div>
  );
};

export default SelectedUserSection;
