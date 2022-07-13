import { User } from 'types';

const UserFlagsCard = ({ user }: { user: User }) => {
  const hasUserFlags = user.userFlags && user.userFlags.length > 0;

  return (
    <div className="mx-auto container bg-white shadow rounded overflow-x-scroll">
      {/* Title */}
      <div className="flex w-full pl-3 sm:pl-6 pr-3 py-5 items-center justify-between bg-teal-200 rounded-t">
        {/* Full Name */}
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          User Flags
        </h3>
      </div>
      {/* Content  */}
      <div className="px-4">
        {hasUserFlags ? (
          <div>
            {user!.userFlags!.map((userFlag, idx) => (
              <UserFlagsContent
                key={`userFlag-${userFlag}-${idx}`}
                userFlag={userFlag}
                idx={idx}
                totalFlags={user.userFlags!.length}
              />
            ))}
          </div>
        ) : (
          <NoFlagsPlaceholder user={user} />
        )}
      </div>
    </div>
  );
};

export default UserFlagsCard;

const UserFlagsContent = ({
  userFlag,
  idx,
  totalFlags,
}: {
  userFlag: string;
  idx: number;
  totalFlags: number;
}) => (
  <div className={`${idx === 0 && 'mt-2'} ${idx === totalFlags - 1 && 'pb-2'}`}>
    {idx != 0 && <hr className="my-2" />}
    <p>{userFlag}</p>
  </div>
);

const NoFlagsPlaceholder = ({ user }: { user: User }) => (
  <div className="p4">
    <p>No Flags for User: {user.userID}</p>
  </div>
);
