import { Sidebar } from "../sidebar/Sidebar";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex">
      <Sidebar />
      <div className="mb-[5rem] flex pt-[4rem] md:mb-0">{children}</div>
    </section>
  );
}
