import { useState } from 'react';
import { User } from 'types';
import UserFlagsContent from '../UserFlagsContent';
import UserFlagsEmptyState from '../UserFlagsEmptyState';

const UserFlagsCard = ({ user }: { user: User }) => {
  const hasUserFlags = user.userFlags && user.userFlags.length > 0;
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="mx-auto container bg-white dark:bg-slate-700 shadow rounded-xl overflow-x-scroll">
      {/* Title */}
      <div className="flex w-full pl-3 sm:pl-6 pr-3 py-5 items-center justify-between bg-teal-200 dark:bg-opacity-0 dark:border-b-2 dark:border-b-slate-500 rounded-t">
        {/* Full Name */}
        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-slate-100">
          User Flags
        </h3>
        {/* Collapse Button */}
        {hasUserFlags && user!.userFlags!.length > 1 && (
          <button
            className="bg-blue-400 hover:bg-blue-600 dark:bg-blue-200 dark:hover:bg-blue-100 p-2 rounded-lg text-white dark:text-slate-600 dark:hover:text-slate-800 text-sm"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? 'Show' : 'Collapse'}
          </button>
        )}
      </div>
      {/* Content  */}
      <div className="px-4">
        {hasUserFlags ? (
          <div>
            {user!
              .userFlags!.slice(0, collapsed ? 1 : user!.userFlags!.length)
              .map((userFlag, idx) => (
                <UserFlagsContent
                  key={`userFlag-${userFlag}-${idx}`}
                  userFlag={userFlag}
                  idx={idx}
                  totalFlags={collapsed ? 1 : user.userFlags!.length}
                />
              ))}
          </div>
        ) : (
          <UserFlagsEmptyState user={user} />
        )}
      </div>
    </div>
  );
};

export default UserFlagsCard;
