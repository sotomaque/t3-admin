import { EmailSection, SingleColumnContentWrapper } from 'components';
import { useRouter } from 'next/router';
import { useState } from 'react';

export type TaskStatusType =
  | 'Sending Verification Email'
  | 'Verification Email Sent'
  | 'Verifying OTP'
  | 'OTP Verified'
  | 'OTP Verification Failed'
  | 'Registering User' // with eco server
  | 'Creating PT Account'
  | 'Submitting PT Documents'
  | 'Getting CIP'
  | 'Verifying CIP'
  | 'Verifying KYC'
  | 'Completed'
  | 'Error';

const NewUser = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [hasSubmittedEmail, setHasSubmittedEmail] = useState(false);
  const [taskStatus, setTaskStatus] = useState<TaskStatusType | null>(null);

  const handleOnBackClicked = () => {
    router.back();
  };

  return (
    <SingleColumnContentWrapper>
      <div className="h-full w-full py-10">
        <div className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-4">
          <div className="max-w-7xl mx-auto">
            <div className="p-4 bg-white">
              <div className="p-4 sm:px-6 lg:px-8">
                {/* Add User Button */}
                <div className="sm:flex sm:items-center">
                  <div className="sm:flex-auto">
                    <h1 className="text-xl font-semibold text-gray-900">
                      Create New User
                    </h1>
                    <p className="mt-2 text-sm text-gray-700">
                      Create new user in staging environment with a custom KYC
                      State
                    </p>
                  </div>
                  <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                    <button
                      onClick={() => handleOnBackClicked()}
                      type="button"
                      className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                    >
                      Back
                    </button>
                  </div>
                </div>
                {/* Content */}
                <div className="mt-8 flex flex-col">
                  <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                        {/* Email Section */}
                        <EmailSection
                          email={email}
                          setEmail={setEmail}
                          hasSubmittedEmail={hasSubmittedEmail}
                          setHasSubmittedEmail={setHasSubmittedEmail}
                          setTaskStatus={setTaskStatus}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SingleColumnContentWrapper>
  );
};

export default NewUser;
