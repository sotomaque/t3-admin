import { TaskStatusType } from 'types/taskStatus';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { useUsers } from 'store';
import { trpc } from 'utils/trpc';

type EmailSectionProps = {
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  hasSubmittedEmail: boolean;
  setHasSubmittedEmail: Dispatch<SetStateAction<boolean>>;
  setTaskStatus: Dispatch<SetStateAction<TaskStatusType | null>>;
};

const EmailSection = ({
  email,
  setEmail,
  hasSubmittedEmail,
  setHasSubmittedEmail,
  setTaskStatus,
}: EmailSectionProps) => {
  const { setUserRegistrationStepAsCurrent } = useUsers();
  const { mutateAsync, isLoading, isSuccess } = trpc.useMutation([
    'registration.sendOTP',
  ]);

  const isDisabled = isLoading || isSuccess || !email;
  const startPasswordlessFlow = async () => {
    if (!email) return;
    mutateAsync({ email });
    setHasSubmittedEmail(true);
  };

  useEffect(() => {
    if (isSuccess) {
      setTaskStatus('Verification Email Sent');
      setUserRegistrationStepAsCurrent(1);
    }
  }, [isSuccess, setTaskStatus, setUserRegistrationStepAsCurrent]);

  return (
    <div className="mb-6 sm:mb-5 space-y-6 sm:space-y-5 ">
      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
        >
          Unique email
        </label>
        <div className="mt-1 sm:mt-0 sm:col-span-2">
          <div className="max-w-lg flex rounded-md ">
            <div className="mt-1 flex flex-col">
              <input
                type="text"
                name="email"
                id="email"
                autoComplete="email"
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
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button
              type="button"
              disabled={isLoading}
              onClick={(e) => {
                e.preventDefault();
                startPasswordlessFlow();
              }}
              className={`
            ml-2 
            sm:ml-6 
            ${!hasSubmittedEmail ? 'bg-indigo-500' : 'bg-green-500'}
            
            transition 
            duration-150 
            ease-in-out 
            focus:outline-none
            ${!isDisabled && !hasSubmittedEmail && 'hover:bg-indigo-600'}
            rounded 
            text-white 
            px-5
            h-8 
            flex 
            items-center 
            text-xs`}
            >
              {isLoading
                ? 'Processing...'
                : hasSubmittedEmail
                ? 'Success'
                : 'Send'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailSection;
