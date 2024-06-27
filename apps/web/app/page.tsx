import Link from "next/link";

const Home = () => {
  return (
    <main className="flex h-screen items-center justify-center">
      <div className="">
        <h1>Point 0 Survey App</h1>
        <Link
          href={"/dashboard"}
          className="bg-muted px-4 py-2 rounded-lg mt-4"
        >
          Go to Dashbaord
        </Link>
      </div>
    </main>
  );
};

export default Home;
