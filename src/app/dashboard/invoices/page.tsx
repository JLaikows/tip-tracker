import UnpaidPayoutCreateForm from "@/lib/components/Forms/unpaidPayoutCreateForm";

export default function Home() {
  return (
    <div className="flex items-center justify-items-center font-[family-name:var(--font-geist-sans)] p-4 ">
      <main className="flex flex-col gap-8 row-start-2 items-center w-screen min-h-80 sm:items-start md:flex-row">
        <UnpaidPayoutCreateForm />
      </main>
    </div>
  );
}
