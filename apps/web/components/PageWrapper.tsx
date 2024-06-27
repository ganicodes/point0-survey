const PageWrapper = ({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}): JSX.Element => {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">{title}</h1>
      </div>
      {children}
    </main>
  );
};

export default PageWrapper;
