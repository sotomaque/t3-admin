import { useMemo } from 'react';
import { BankConnection } from 'types/bankConnections';

const useBankConnectionsSelector = ({
  connection,
}: {
  connection: BankConnection;
}) => {
  const formattedInstitutionName = useMemo(() => {
    return connection.institutionName;
  }, [connection]);

  const formattedInstitutionID = useMemo(() => {
    return connection.institutionID;
  }, [connection]);

  const formattedItemID = useMemo(() => {
    return connection.itemID;
  }, [connection]);

  const formattedLinkStatus = useMemo(() => {
    return connection.linkStatus;
  }, [connection]);

  const formattedProviderItemID = useMemo(() => {
    return connection.providerItemID;
  }, [connection]);

  const formattedCreatedAt = useMemo(() => {
    return new Date(connection.createdAt).toDateString();
  }, [connection]);

  const linkStatusForegroundColor = useMemo(() => {
    if (formattedLinkStatus) {
      if (formattedLinkStatus === 'LINK_OK') {
        return 'text-green-500 dark:text-green-100';
      } else if (formattedLinkStatus === 'REQUIRES_RELINK') {
        return 'text-red-500 dark:text-red-100';
      }
    }

    return 'text-gray-500 dark:text-slate-100';
  }, [formattedLinkStatus]);

  const linkStatusBackgroundColor = useMemo(() => {
    if (formattedLinkStatus) {
      if (formattedLinkStatus === 'LINK_OK') {
        return 'bg-green-100 dark:bg-green-600';
      } else if (formattedLinkStatus === 'REQUIRES_RELINK') {
        return 'bg-red-100 dark:bg-red-600';
      }
    }
    return 'bg-gray-100 dark:bg-slate-600';
  }, [formattedLinkStatus]);

  return {
    formattedInstitutionName,
    formattedInstitutionID,
    formattedItemID,
    formattedLinkStatus,
    formattedProviderItemID,
    formattedCreatedAt,
    linkStatusForegroundColor,
    linkStatusBackgroundColor,
  };
};

export default useBankConnectionsSelector;
