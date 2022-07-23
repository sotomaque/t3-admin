const SingleColumnContentWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <>
      {
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="lg:col-span-2">
            <section aria-labelledby="section-1-title">
              <h2 className="sr-only" id="section-1-title">
                Section title
              </h2>
              <div className="rounded-lg bg-white dark:bg-slate-800 overflow-hidden shadow dark:shadow-slate-600">
                <div className="p-6">{children}</div>
              </div>
            </section>
          </div>
        </div>
      }
    </>
  );
};

export default SingleColumnContentWrapper;
