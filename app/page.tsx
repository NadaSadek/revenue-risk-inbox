import InboxTable from "./components/InboxTable";

export default function Home() {
  return (
    <main className="py-16 px-16 bg-white">
      <h1 className="text-3xl font-semibold leading-10">Revenue Risk Inbox</h1>
      <InboxTable />
    </main>
  );
}
