import { create } from "zustand";
import axios from "axios";
import { client } from "@prisma/client";

export interface IClientState {
  clients: client[];
  getClients: () => Promise<void | string>;
  addClient: (client: client) => void;
}

export const useClientStore = create<IClientState>()((set) => ({
  clients: [],
  getClients: async () => {
    const res = await axios.get(`/api/clients`);
    if (res.data.error) return res.data.error;

    set((state: IClientState) => {
      return {
        ...state,
        clients: res.data.clients,
      };
    });
  },
  addClient: (client: client) =>
    set((state: IClientState) => {
      const updatedClients: client[] = [...state.clients];

      updatedClients.push(client);

      return { ...state, clients: updatedClients };
    }),
}));
