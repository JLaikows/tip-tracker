"use client";

import ClientCreateForm from "@/lib/components/ClientCreateForm";
import { client } from "@prisma/client";
import axios from "axios";
import { Panel } from "primereact/panel";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Home() {
  const [clients, setClients] = useState<client[]>([]);

  const getClients = useCallback(async () => {
    const { data } = await axios.get(`/api/clients`);

    if (data.error) {
      toast.error(data.error);
    } else {
      setClients(data.clients);
    }
  }, []);

  useEffect(() => {
    getClients();
  }, [getClients]);

  return (
    <div className="flex items-center justify-items-center font-[family-name:var(--font-geist-sans)] p-4 ">
      <main className="flex flex-col gap-8 row-start-2 items-center w-screen min-h-80 sm:items-start md:flex-row">
        <ClientCreateForm />
        <Panel
          header="Clients"
          className="w-11/12 border-2 rounded-md max-w-[91.666667%]"
        >
          {!clients.length && <>No Clients To Show</>}
          {clients.map((client) => (
            <div
              key={`${client.name}-client`}
              className="flex flex-row justify-between"
            >
              <div>{client.name}</div>
              <div>{client.state}</div>
            </div>
          ))}
        </Panel>
      </main>
    </div>
  );
}
