import { useEffect, useMemo, useState } from 'react';
import { AccountEntity, User } from 'types';

const useUserAccounts = ({ user }: { user: User }) => {
  const [primeTrustAccount, setPrimeTrustAccount] =
    useState<AccountEntity | null>(null);
  const [ecoAccount, setEcoAccount] = useState<AccountEntity | null>(null);

  const filteredPrimeTrustAccount = user?.accounts?.filter(
    (accounts) => accounts.provider === 'PRIME_TRUST'
  );
  const filteredEcoTokenAccount = user?.accounts?.filter(
    (accounts) => accounts.provider === 'ECO_TOKEN'
  );

  useEffect(() => {
    if (
      filteredPrimeTrustAccount &&
      Array.isArray(filteredPrimeTrustAccount) &&
      filteredPrimeTrustAccount.length === 1
    ) {
      let _ptAccount = filteredPrimeTrustAccount[0];
      if (_ptAccount && typeof _ptAccount !== 'undefined') {
        setPrimeTrustAccount(_ptAccount);
      }
    }
  }, [filteredPrimeTrustAccount]);

  useEffect(() => {
    if (
      filteredEcoTokenAccount &&
      Array.isArray(filteredEcoTokenAccount) &&
      filteredEcoTokenAccount.length === 1
    ) {
      let _ecoAccount = filteredEcoTokenAccount[0];
      if (_ecoAccount && typeof _ecoAccount !== 'undefined') {
        setEcoAccount(_ecoAccount);
      }
    }
  }, [filteredEcoTokenAccount]);

  const usdcBalances = useMemo(() => {
    if (primeTrustAccount) {
      // primetrustdata -> balances -> .reduce -> .settled
      let settledBalance = primeTrustAccount?.primeTrustData?.balances?.reduce(
        (previousValue, currentValue) => previousValue + currentValue.settled,
        0
      );
      let disbursableBalance =
        primeTrustAccount?.primeTrustData?.balances?.reduce(
          (previousValue, currentValue) =>
            previousValue + currentValue.disbursable,
          0
        );
      let pendingBalance = primeTrustAccount?.primeTrustData?.balances?.reduce(
        (previousValue, currentValue) =>
          previousValue + currentValue['pending-transfer'],
        0
      );
      return {
        settled: settledBalance,
        disbursable: disbursableBalance,
        pending: pendingBalance,
      };
    } else {
      return {
        settled: 0.0,
        disbursable: 0.0,
        pending: 0.0,
      };
    }
  }, [primeTrustAccount]);

  const ecoBalances = useMemo(() => {
    if (ecoAccount) {
      let totalBalance: number =
        ecoAccount?.ecoTokenData?.balances?.reduce(
          (previousValue: number, currentValue: { totalBalance: string }) =>
            previousValue + parseFloat(currentValue.totalBalance),
          0.0
        ) ?? 0.0;
      let availableBalance: number =
        ecoAccount?.ecoTokenData?.balances?.reduce(
          (previousValue: number, currentValue: { availableBalance: string }) =>
            previousValue + parseFloat(currentValue.availableBalance),
          0.0
        ) ?? 0.0;
      return {
        totalBalance,
        availableBalance,
      };
    } else {
      return {
        totalBalance: 0.0,
        availableBalance: 0.0,
      };
    }
  }, [ecoAccount]);

  const apy = useMemo(() => {
    if (primeTrustAccount) {
      // primetrustdata -> balances -> .reduce -> .settled
      return parseFloat(primeTrustAccount.apy);
    } else {
      return 2.5;
    }
  }, [primeTrustAccount]);

  return {
    balances: {
      usdcBalances,
      ecoBalances,
    },
    apy,
  };
};

export default useUserAccounts;
