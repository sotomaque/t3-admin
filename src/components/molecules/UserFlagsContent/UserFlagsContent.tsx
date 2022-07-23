const UserFlagsContent = ({
  userFlag,
  idx,
  totalFlags,
}: {
  userFlag: string;
  idx: number;
  totalFlags: number;
}) => {
  const isFirst = idx === 0;
  const isLast = idx === totalFlags - 1;

  return (
    <div className={`py-2 ${isFirst && 'mt-2'}`}>
      <p className={`dark:text-slate-200 pb-4`}>{userFlag}</p>
      {!isLast && <hr />}
    </div>
  );
};

export default UserFlagsContent;
