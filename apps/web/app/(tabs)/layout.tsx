import SideNavbar from "../../components/shell/SideNavbar";
import Topbar from "../../components/shell/Topbar";

export default function TabLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <SideNavbar />
        </div>
      </div>
      <div className="flex flex-col">
        <Topbar />
        {children}
      </div>
    </div>
  );
}
