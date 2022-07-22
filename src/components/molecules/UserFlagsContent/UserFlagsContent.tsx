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
    <div className={`${isFirst && 'mt-2'} ${isLast && 'pb-2'}`}>
      {!isFirst && <hr className="my-2" />}
      <p>{userFlag}</p>
    </div>
  );
};

export default UserFlagsContent;
