import { useEffect, useState } from 'react';
import { User } from 'types';

// TODO: rename to toUserKYCSelector
const useUserKYC = ({ user }: { user: User }) => {
  const [primeTrust, setPrimeTrust] = useState('KYC_REQUIRED');
  const [wyre, setWyre] = useState('KYC_REQUIRED');
  const [cognito, setCognito] = useState('KYC_REQUIRED');

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

  return {
    wyre,
    primeTrust,
    cognito,
  };
};

export default useUserKYC;
