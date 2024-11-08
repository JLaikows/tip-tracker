"use client";

import ClientCreateForm from "@/lib/components/ClientCreateForm";
import { IClientState, useClientStore } from "@/lib/hooks/clients";
import { Panel } from "primereact/panel";
import { useCallback, useEffect } from "react";
import { toast } from "react-toastify";

export default function Home() {
  const state = useClientStore((state: IClientState) => state);
  const { getClients } = useClientStore.getState();

  const getClientsCall = useCallback(async () => {
    const error = await getClients();
    if (error) {
      toast.error(error);
    }
  }, [getClients]);

  useEffect(() => {
    getClientsCall();
  }, [getClientsCall]);

  return (
    <div className="flex items-center justify-items-center font-[family-name:var(--font-geist-sans)] p-4 ">
      <main className="flex flex-col gap-8 row-start-2 items-center w-screen min-h-80 sm:items-start md:flex-row">
        <ClientCreateForm />
        <Panel
          header="Clients"
          className="w-11/12 border-2 rounded-md max-w-[91.666667%]"
        >
          {!state.clients.length && <>No Clients To Show</>}
          {state.clients.map((client) => (
            <div
              key={`${client.name}-client`}
              className="flex flex-row justify-between"
            >
              <div>{client.name}</div>
              <div>{client.serial}</div>
              <div>{client.state}</div>
            </div>
          ))}
        </Panel>
      </main>
    </div>
  );
}
