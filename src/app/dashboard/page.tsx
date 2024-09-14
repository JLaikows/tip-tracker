"use client";

import PayoutCreateForm from "@/lib/components/PayoutCreateForm";
import { payout } from "@prisma/client";
import axios from "axios";
import { Dropdown } from "primereact/dropdown";
import { Panel } from "primereact/panel";
import { useCallback, useEffect, useState } from "react";

const now = new Date(Date.now());

const defaultPayout = {
  amount: 0,
  taxable: false,
  state: "NJ",
  userId: 0,
  date: now.toISOString().slice(0, 10),
  client: "",
  owed: 0,
};

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
        <Panel header="Payouts">
          <Dropdown
            value={selectedId.code}
            options={options}
            onChange={(e) => setSelectedId(e.target.value)}
            optionLabel="name"
          />
          {payouts.length > 0 &&
            payouts.map((payout: payout) => (
              <div
                className="flex flex-row gap-1"
                key={`${payout.amount}-${payout.day}-${payout.client}`}
              >
                <div>{payout.amount}</div>
                <div>{payout.year}</div>
                <div>{payout.month}</div>
                <div>{payout.day}</div>
                <div>{payout.client}</div>
                <div>{payout.state}</div>
              </div>
            ))}
        </Panel>
      </main>
    </div>
  );
}
