import { create } from "zustand";
import axios from "axios";
import { TClient } from "../types";

export interface IClientState {
  clients: TClient[];
  getClients: () => Promise<void | string>;
  addClient: (client: TClient) => void;
}

export const useClientStore = create<IClientState>()((set) => ({
  clients: [],
  getClients: async () => {
    const res = await axios.get(`/api/clients`);
    if (res.data.error) return res.data.error;
    if (!res.data.clients.length) return "Create a client to continue!!";

    set((state: IClientState) => {
      return {
        ...state,
        clients: res.data.clients,
      };
    });
  },
  addClient: (client: TClient) =>
    set((state: IClientState) => {
      const updatedClients: TClient[] = [...state.clients];

      updatedClients.push(client);

      return { ...state, clients: updatedClients };
    }),
}));
