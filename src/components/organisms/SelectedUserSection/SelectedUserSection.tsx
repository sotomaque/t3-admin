import { UserProfileSummary } from 'components/molecules';
import { User } from 'types';

interface SelectedUserSectionProps {
  user: User;
}

const SelectedUserSection = ({ user }: SelectedUserSectionProps) => {
  return (
    <div className="grid grid-cols-2 gap-6">
      <div className="col-span-1 bg-white">
        <UserProfileSummary user={user} />
      </div>
      <div className="col-span-1 bg-white">
        <div>TODO: User Flags</div>
      </div>
    </div>
  );
};

export default SelectedUserSection;
