import {
  ClipboardCheckIcon,
  ClipboardCopyIcon,
} from '@heroicons/react/outline';
import { useState } from 'react';
import { useLayout } from 'store';

const CopyableRow = ({
  rowName,
  rowData,
  disableCopying = false,
  className = '',
  chip = false,
  chipColor = 'bg-green-100 text-green-800',
  onClick,
}: {
  rowName: string;
  rowData: string;
  disableCopying?: boolean;
  className?: string;
  chip?: boolean;
  chipColor?: string;
  onClick?: () => void;
}) => {
  const [hasCopied, setHasCopied] = useState(false);
  const { setShowNotification } = useLayout();

  const handleCopy = () => {
    if (disableCopying) return;
    navigator.clipboard.writeText(rowData);
    setHasCopied(true);
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
      setHasCopied(false);
    }, 3000);
  };

  return (
    <div
      className={`flex justify-between mt-4 ${className != '' && className}`}
    >
      <p className="text-left text-xs hidden md:flex">{rowName}</p>

      <div className="flex items-center">
        {onClick ? (
          <button
            onClick={onClick}
            className={`text-sm text-center md:text-right text-blue-500 ${
              chip ? `px-2.5 py-0.5 rounded-full ${chipColor}` : 'pr-1'
            }`}
          >
            {rowData}
          </button>
        ) : (
          <p
            className={`text-sm text-center md:text-right ${
              chip ? `px-2.5 py-0.5 rounded-full ${chipColor}` : 'pr-1'
            }`}
          >
            {rowData}
          </p>
        )}

        {!disableCopying && (
          <div onClick={() => handleCopy()} className="cursor-pointer">
            {hasCopied ? (
              <ClipboardCheckIcon color="green" height={15} width={15} />
            ) : (
              <ClipboardCopyIcon height={15} width={15} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CopyableRow;
