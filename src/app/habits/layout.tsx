import Sidebar from "@/components/shared/Sidebar";

export default function HabitsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <aside className="fixed inset-y-0 left-0 w-64 hidden md:block">
        <Sidebar />
      </aside>
      <main className="flex-1 md:ml-64 p-8 lg:p-12">{children}</main>
    </div>
  );
}
