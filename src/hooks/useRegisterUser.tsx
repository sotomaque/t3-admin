import { TaskStatusType } from 'types/taskStatus';
import { useEffect, useState } from 'react';
import { trpc } from 'utils/trpc';
import { faker } from '@faker-js/faker';
import { useUsers } from 'store';

const useRegisterUser = () => {
  // String(s)
  const [email, setEmail] = useState('');
  const [bearerToken, setBearerToken] = useState('');
  const [registeredUsername, setRegisteredUsername] = useState('');
  const [registeredPassword, setRegisteredPassword] = useState('');

  // State
  const [taskStatus, setTaskStatus] = useState<TaskStatusType | null>(null);

  // Guard(s)
  const [hasSubmittedEmail, setHasSubmittedEmail] = useState(false);
  const [hasBeganRegisteringUser, setHasBegainRegisteringUser] =
    useState(false);

  // Effect(s)
  const { setUserRegistrationStepAsCurrent } = useUsers();
  const { data: isUsernameAvailable, refetch } = trpc.useQuery(
    [
      'registration.isUsernameAvailable',
      {
        username: registeredUsername,
      },
    ],
    {
      refetchOnWindowFocus: false,
      enabled: registeredUsername.length > 0,
    }
  );
  useEffect(() => {
    if (bearerToken && !hasBeganRegisteringUser) {
      registerUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bearerToken, hasBeganRegisteringUser]);

  // Function(s)
  const registerUser = async () => {
    setHasBegainRegisteringUser(true);
    const randomUserData = await generateAndValidateRandomUserData();
    setRegisteredUsername(`${randomUserData.username}`);
    setRegisteredPassword(`${randomUserData.password}`);
  };
  const generateAndValidateRandomUserData = async () => {
    const registerTestData = createUserDummyData();
    setTaskStatus('Registering User');
    setUserRegistrationStepAsCurrent(3);
    await refetch();

    if (isUsernameAvailable && !isUsernameAvailable.isAvailable) {
      console.log('recurring', { username: `${registerTestData.username}` });
      await generateAndValidateRandomUserData();
    }

    return registerTestData;
  };
  const createUserDummyData = () => {
    const fakeFullName = faker.name.findName();
    const fakeSplitFullName = fakeFullName.split(' ');

    let fakeFirstName: string;
    let fakeLastName: string;
    fakeFirstName = fakeSplitFullName[0]
      ? fakeSplitFullName[0].toLocaleLowerCase()
      : 'Satish';
    fakeLastName = fakeSplitFullName[1]
      ? fakeSplitFullName[1].toLocaleLowerCase()
      : 'Satish';

    const fakeUsername = faker.internet
      .userName(fakeFirstName, fakeLastName)
      .slice(0, 15);

    const newUserRegisterUserData = {
      username: 'e',
      password: 'passw0rd!',

      givenName: 'test',
      familyName: 'user',

      accountParams: {
        provider: 'WYRE',
      },
    };

    const registerUserData = {
      ...newUserRegisterUserData,
    };

    registerUserData.username = fakeUsername;

    return registerUserData;
  };

  return {
    email,
    setEmail,
    registeredUsername,
    registeredPassword,
    taskStatus,
    setTaskStatus,
    hasSubmittedEmail,
    setHasSubmittedEmail,
    bearerToken,
    setBearerToken,
  };
};

export default useRegisterUser;
