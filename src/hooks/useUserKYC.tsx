import { useEffect, useMemo, useState } from 'react';
import { useLayout } from 'store';
import { User } from 'types';

// TODO: rename to toUserKYCSelector
const useUserKYC = ({ user }: { user: User }) => {
  const [primeTrust, setPrimeTrust] = useState('KYC_REQUIRED');
  const [wyre, setWyre] = useState('KYC_REQUIRED');
  const [cognito, setCognito] = useState('KYC_REQUIRED');
  const { isDark } = useLayout();

  const filteredPrimeTrustKYCAccount = user.kycData?.kycStatuses?.filter(
    (kycAccount) => kycAccount.provider === 'PRIME_TRUST'
  );
  const filteredWyreKYCAccount = user.kycData?.kycStatuses?.filter(
    (kycAccount) => kycAccount.provider === 'WYRE'
  );
  const filteredCognitoYCAccount = user.kycData?.kycStatuses?.filter(
    (kycAccount) => kycAccount.provider === 'COGNITO'
  );

  useEffect(() => {
    if (
      filteredPrimeTrustKYCAccount &&
      Array.isArray(filteredPrimeTrustKYCAccount) &&
      filteredPrimeTrustKYCAccount.length === 1
    ) {
      let _ptAccount = filteredPrimeTrustKYCAccount[0];
      if (_ptAccount && typeof _ptAccount !== 'undefined') {
        setPrimeTrust(_ptAccount.status);
      }
    }
  }, [filteredPrimeTrustKYCAccount]);

  // TODO: use ed53cbc6cf512c to make sure this hook works on "older" users
  useEffect(() => {
    if (
      filteredWyreKYCAccount &&
      Array.isArray(filteredWyreKYCAccount) &&
      filteredWyreKYCAccount.length === 1
    ) {
      let _wyre = filteredWyreKYCAccount[0];
      if (_wyre && typeof _wyre !== 'undefined') {
        setWyre(_wyre.status);
      }
    }
  }, [filteredWyreKYCAccount]);

  useEffect(() => {
    if (
      filteredCognitoYCAccount &&
      Array.isArray(filteredCognitoYCAccount) &&
      filteredCognitoYCAccount.length === 1
    ) {
      let _cognito = filteredCognitoYCAccount[0];
      if (_cognito && typeof _cognito !== 'undefined') {
        setCognito(_cognito.status);
      }
    }
  }, [filteredCognitoYCAccount]);

  const ptStateLabel = useMemo(() => {
    if (primeTrust === 'KYC_REQUIRED') {
      return 'Required';
    } else if (primeTrust === 'KYC_PENDING') {
      return 'Pending';
    } else if (primeTrust === 'KYC_FAILED') {
      return 'Failed';
    } else if (primeTrust === 'KYC_PASSED') {
      return 'Passed';
    }

    return primeTrust;
  }, [primeTrust]);

  const cognitoStateLabel = useMemo(() => {
    if (cognito === 'KYC_REQUIRED') {
      return 'Required';
    } else if (cognito === 'KYC_PENDING') {
      return 'Pending';
    } else if (cognito === 'KYC_FAILED') {
      return 'Failed';
    } else if (cognito === 'KYC_PASSED') {
      return 'Passed';
    }

    return cognito;
  }, [cognito]);

  const ptStateColor = useMemo(() => {
    if (primeTrust === 'KYC_REQUIRED') {
      return 'text-gray-500 dark:text-slate-100';
    } else if (primeTrust === 'KYC_PENDING') {
      return 'text-orange-500 dark:text-orange-100';
    } else if (primeTrust === 'KYC_FAILED') {
      return 'text-red-500 dark:text-red-100';
    } else if (primeTrust === 'KYC_PASSED') {
      return 'text-green-500 dark:text-green-100';
    }

    return 'text-gray-500 dark:text-slate-100';
  }, [primeTrust]);

  const cognitoStateColor = useMemo(() => {
    if (cognito === 'KYC_REQUIRED') {
      return 'text-gray-500 dark:text-slate-100';
    } else if (cognito === 'KYC_PENDING') {
      return 'text-orange-500 dark:text-orange-100';
    } else if (cognito === 'KYC_FAILED') {
      return 'text-red-500  dark:text-red-100';
    } else if (cognito === 'KYC_PASSED') {
      return 'text-green-500 dark:text-green-100';
    }

    return 'text-gray-500 dark:text-slate-100';
  }, [cognito]);

  const cognitoStateBackgroundColor = useMemo(() => {
    if (cognitoStateLabel === 'Required') {
      return 'bg-gray-100 dark:bg-slate-600';
    } else if (cognitoStateLabel === 'Pending') {
      return 'bg-orange-100 dark:bg-orange-600';
    } else if (cognitoStateLabel === 'Failed') {
      return 'bg-red-100 dark:bg-red-600';
    } else if (cognitoStateLabel === 'Passed') {
      return 'bg-green-100 dark:bg-green-600';
    }

    return 'bg-gray-100 dark:bg-slate-600';
  }, [cognitoStateLabel]);

  const ptStateBackgroundColor = useMemo(() => {
    if (ptStateLabel === 'Required') {
      return 'bg-gray-100 dark:bg-slate-600';
    } else if (ptStateLabel === 'Pending') {
      return 'bg-orange-100 dark:bg-orange-600';
    } else if (ptStateLabel === 'Failed') {
      return 'bg-red-100 dark:bg-red-600';
    } else if (ptStateLabel === 'Passed') {
      return 'bg-green-100 dark:bg-green-600';
    }

    return 'bg-gray-100 dark:bg-slate-600';
  }, [ptStateLabel]);

  return {
    wyre,
    primeTrust: {
      serverState: primeTrust,
      stateLabel: ptStateLabel,
      stateColor: ptStateColor,
      stateBackgroundColor: ptStateBackgroundColor,
    },
    cognito: {
      serverState: cognito,
      stateLabel: cognitoStateLabel,
      stateColor: cognitoStateColor,
      stateBackgroundColor: cognitoStateBackgroundColor,
    },
  };
};

export default useUserKYC;
