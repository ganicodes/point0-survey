import PageWrapper from "../../../components/PageWrapper";

const Agents = () => {
  return (
    <PageWrapper title="Agents">
      <div className="flex flex-col items-center gap-1 text-center">
        <h3 className="text-2xl font-bold tracking-tight">
          You have no products
        </h3>
        <p className="text-sm text-muted-foreground">
          You can start selling as soon as you add a product.
        </p>
      </div>
    </PageWrapper>
  );
};

export default Agents;
