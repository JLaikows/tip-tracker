import { create } from "zustand";
import axios from "axios";
import { client } from "@prisma/client";

export interface IPayoutState {
  clients: client[];
  getClients: () => void;
}

export const usePayoutStore = create<IPayoutState>()((set) => ({
  clients: [],
  getClients: async () => {
    const res = await axios.get(`/api/clients`);
    if (res.data.error) return res.data.error;

    set((state: IPayoutState) => {
      return {
        ...state,
        payouts: res.data.clients,
      };
    });
  },
}));
