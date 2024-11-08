"use client";

import ClientCreateForm from "@/lib/components/ClientCreateForm";
import { IClientState, useClientStore } from "@/lib/hooks/clients";
import axios from "axios";
import { Button } from "primereact/button";
import { Panel } from "primereact/panel";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Home() {
  const state = useClientStore((state: IClientState) => state);
  const [isLoading, setIsLoading] = useState(false);
  const { getClients, addClient } = useClientStore.getState();

  const handleClick = async (id: number | string) => {
    setIsLoading(true);
    const res = await axios.patch(`/api/clients/${id}`, {
      generateSerialCode: true,
    });

    addClient(res.data.client);
    setIsLoading(false);
  };

  const getClientsCall = useCallback(async () => {
    const error = await getClients();
    if (error) {
      toast.error(error);
    }
  }, [getClients]);

  useEffect(() => {
    getClientsCall();
  }, [getClientsCall]);

  console.table(state.clients);

  return (
    <div className="flex items-center justify-items-center font-[family-name:var(--font-geist-sans)] p-4 ">
      <main className="flex flex-col gap-8 row-start-2 items-center w-screen min-h-80 sm:items-start md:flex-row">
        <ClientCreateForm />
        <Panel
          header="Clients"
          className="w-11/12 border-2 rounded-md max-w-[91.666667%]"
        >
          {!Object.values(state.clients).length && <>No Clients To Show</>}
          {Object.values(state.clients).map((client) => (
            <div
              key={`${client.name}-client`}
              className="flex flex-row justify-between border-gray-600 pb-4"
            >
              {client.serial ? (
                <div>{client.serial}</div>
              ) : (
                <Button
                  size="small"
                  raised
                  onClick={() => handleClick(client.id)}
                >
                  {isLoading ? "wait..." : "Generate Serial"}
                </Button>
              )}
              <div>{client.name}</div>
              <div>{client.state}</div>
            </div>
          ))}
        </Panel>
      </main>
    </div>
  );
}
