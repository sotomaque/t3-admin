const TwoColumnContentWrapper = ({
  mainContent,
  sidebarContent,
}: {
  mainContent: React.ReactNode;
  sidebarContent: React.ReactNode;
}) => {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <div className="grid grid-cols-1 gap-4 items-start lg:grid-cols-3 lg:gap-8">
        {/* Left column */}
        <div className="grid grid-cols-1 gap-4 lg:col-span-2">
          <section aria-labelledby="section-1-title">
            <h2 className="sr-only" id="section-1-title">
              Section title
            </h2>
            <div className="rounded-lg bg-white dark:bg-slate-800 overflow-hidden shadow dark:shadow-slate-600">
              <div className="p-6">{mainContent}</div>
            </div>
          </section>
        </div>
        {/* Right column */}
        <div className="grid grid-cols-1 gap-4">
          <section aria-labelledby="section-2-title">
            <h2 className="sr-only" id="section-2-title">
              Section title
            </h2>
            <div className="rounded-lg bg-white dark:bg-slate-800 overflow-hidden shadow dark:shadow-slate-600">
              <div className="p-6">{sidebarContent}</div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TwoColumnContentWrapper;
