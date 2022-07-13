import { useState } from 'react';
import { User } from 'types';

const UserFlagsCard = ({ user }: { user: User }) => {
  const [collapsed, setCollapsed] = useState(false);

  const handleOnHide = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <div className="mx-auto container bg-white shadow rounded overflow-x-scroll">
      {/* Title */}
      <div className="flex w-full pl-3 sm:pl-6 pr-3 py-5 items-center justify-between bg-teal-200 rounded-t">
        {/* Full Name */}
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          User Flags
        </h3>
        <button
          onClick={() => handleOnHide()}
          className={`ml-0 sm:ml-6 transition duration-150 ease-in-out focus:outline-none rounded text-white px-5 h-8 flex items-center text-sm
        ${
          collapsed
            ? 'bg-blue-700 hover:bg-blue-600'
            : 'bg-indigo-700 hover:bg-indigo-600'
        }
        ${user.userFlags && user.userFlags.length > 1 ? '' : 'hidden'}
        `}
        >
          {collapsed ? 'Expand' : 'Collapse'}
        </button>
      </div>
      {/* Content  */}
      <div className="px-4">
        {/* Flags */}
        {user.userFlags &&
          user.userFlags
            .slice(0, collapsed ? 1 : user.userFlags.length)
            .map((userFlag, idx) => {
              const isLast = collapsed
                ? true
                : idx === (user.userFlags ? user.userFlags.length - 1 : -1);
              return (
                <div
                  key={`userFlag-${userFlag}-${idx}`}
                  className={`${idx === 0 && 'mt-2'} ${isLast && 'pb-2'}`}
                >
                  {idx != 0 && <hr className="my-2" />}
                  <p>{userFlag}</p>
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default UserFlagsCard;
