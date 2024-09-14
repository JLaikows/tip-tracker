"use client";

import PayoutCreateForm from "@/lib/components/PayoutCreateForm";
import PayoutTable from "@/lib/components/PayoutTable";
import axios from "axios";
import { Dropdown } from "primereact/dropdown";
import { useCallback, useEffect, useState } from "react";

export default function Home() {
  const [payouts, setPayouts] = useState<[]>([]);
  const [selectedId, setSelectedId] = useState({ name: "1", code: 1 });

  const getPayouts = useCallback(async () => {
    const { data } = await axios.get(`/api/users/${selectedId.code}/payouts`);

    setPayouts(data.payouts);
  }, [selectedId]);

  useEffect(() => {
    getPayouts();
  }, [selectedId, getPayouts, selectedId.code, selectedId.name]);

  const options = [
    { name: "0", code: 0 },
    { name: "1", code: 1 },
    { name: "2", code: 2 },
  ];

  return (
    <div className="flex items-center justify-items-center max-h-screen font-[family-name:var(--font-geist-sans)] p-4 ">
      <main className="flex flex-col gap-8 row-start-2 items-center min-h-80 sm:items-start md:flex-row">
        <PayoutCreateForm />
        <Dropdown
          value={selectedId.code}
          options={options}
          onChange={(e) => setSelectedId(e.target.value)}
          optionLabel="name"
        />
        <PayoutTable payouts={payouts} />
      </main>
    </div>
  );
}
