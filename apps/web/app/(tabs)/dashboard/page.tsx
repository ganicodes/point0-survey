import Link from "next/link";
import PageWrapper from "../../../components/PageWrapper";

const Dashboard = () => {
  return (
    <PageWrapper title="Dashboard">
      <div className="flex flex-col items-center gap-1 text-center">
        <h3 className="text-2xl font-bold tracking-tight">
          You have no products
        </h3>
        <p className="text-sm text-muted-foreground">
          You can start selling as soon as you add a product.
        </p>
        <Link href={"/"} className="bg-muted px-4 py-2 rounded-lg">
          Go to Home
        </Link>
      </div>
    </PageWrapper>
  );
};

export default Dashboard;
