import {
  AccessCodeSection,
  EmailSection,
  RegisteredUserData,
  TwoColumnContentWrapper,
  UserRegistrationProgress,
} from 'components';
import { useRegisterUser } from 'hooks';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useLayout } from 'store';

const NewUser = () => {
  return (
    <TwoColumnContentWrapper
      sidebarContent={<UserRegistrationProgress />}
      mainContent={<NewUserContent />}
    />
  );
};

const NewUserContent = () => {
  // Effect(s)
  const router = useRouter();
  const { setSelectedRoute } = useLayout();
  const {
    bearerToken,
    email,
    hasSubmittedEmail,
    registeredPassword,
    registeredUsername,
    setBearerToken,
    setEmail,
    setHasSubmittedEmail,
    setTaskStatus,
    submitKycDocumentsData,
  } = useRegisterUser();

  useEffect(() => {
    setSelectedRoute('Users');
  }, [setSelectedRoute]);
  useEffect(() => {
    console.log({ submitKycDocumentsData });
  }, [submitKycDocumentsData]);

  // Function(s)
  const handleOnBackClicked = () => {
    router.back();
  };

  return (
    <div className="h-full w-full py-10">
      <div className="max-w-10xl mx-auto px-4 sm:px-2 lg:px-4">
        <div className="max-w-7xl mx-auto">
          <div className="p-4 sm:p-2 bg-white">
            <div className="p-4 sm:px-2 lg:px-8">
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

                      {/* Enter Access Code Section */}
                      {hasSubmittedEmail && (
                        <AccessCodeSection
                          email={email}
                          setBearerToken={setBearerToken}
                          setTaskStatus={setTaskStatus}
                        />
                      )}

                      {/* Registered User Data */}
                      {registeredUsername &&
                        registeredPassword &&
                        bearerToken && (
                          <RegisteredUserData
                            username={registeredUsername}
                            password={registeredPassword}
                            bearerToken={bearerToken}
                          />
                        )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewUser;
