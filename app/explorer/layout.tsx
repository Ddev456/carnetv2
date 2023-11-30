import { Sidebar } from "../sidebar/Sidebar";

export default function ExplorerLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <section className="md:flex">
        <Sidebar />
        {/* <div className="mb-[5rem] flex w-full pt-[4rem] md:mb-0"> */}
        <div className="w-full pt-[4rem] md:pl-[12rem] ">{children}</div>
        {/* </div> */}
      </section>
    </>
  );
}
