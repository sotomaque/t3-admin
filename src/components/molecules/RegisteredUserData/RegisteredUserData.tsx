import {
  ClipboardCheckIcon,
  ClipboardCopyIcon,
} from '@heroicons/react/outline';
import { useState } from 'react';
import { useLayout } from 'store';

const RegisteredUserData = ({
  username,
  password,
  bearerToken,
}: {
  username: string;
  password: string;
  bearerToken: string;
}) => {
  const { setShowNotification } = useLayout();
  const [hasCopied, setHasCopied] = useState(false);
  const handleCopy = (data: string) => {
    navigator.clipboard.writeText(data);
    setHasCopied(true);
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  return (
    <div className="my-6 p-4 sm:my-5 space-y-6 sm:space-y-5">
      {/* Username */}
      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
        >
          Registered Username
        </label>
        <div className="mt-1 sm:mt-0 sm:col-span-2">
          <div className="max-w-lg flex rounded-md ">
            <div className="mt-1 flex flex-col">
              <input
                disabled
                className={`
                rounded 
                border-2 
                border-gray-300 
                focus:border-indigo-500 
                focus:ring-indigo-500                
                flex-1
                w-full              
                min-w-0
                sm:text-sm 
                px-2
                `}
                value={username}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Password */}
      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
        >
          Registered Password
        </label>
        <div className="mt-1 sm:mt-0 sm:col-span-2">
          <div className="max-w-lg flex rounded-md ">
            <div className="mt-1 flex flex-col">
              <input
                disabled
                className={`
                rounded 
                border-2 
                border-gray-300 
                focus:border-indigo-500 
                focus:ring-indigo-500                
                flex-1
                w-full              
                min-w-0
                sm:text-sm 
                px-2
                `}
                value={password}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Bearer Token */}
      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
        <label className="flex justify-between text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
          Bearer Token
          <div
            onClick={() => handleCopy(bearerToken)}
            className="cursor-pointer"
          >
            {hasCopied ? (
              <ClipboardCheckIcon color="green" height={15} width={15} />
            ) : (
              <ClipboardCopyIcon height={15} width={15} />
            )}
          </div>
        </label>

        <div className="mt-1 sm:mt-0 sm:col-span-2">
          <div className="mt-1 h-200">
            <textarea
              disabled
              className="text-xs w-full h-full overflow-scroll p-4"
              value={bearerToken}
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisteredUserData;
