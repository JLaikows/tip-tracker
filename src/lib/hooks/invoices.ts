import { create } from "zustand";
import { TInvoices, TParsedInvoice } from "../types";
import axios from "axios";

export interface IInvoiceState {
  invoices: TInvoices;
  addInvoice: (invoice: TParsedInvoice) => void;
  getInvoices: () => Promise<void | string>;
}

export const useInvoiceStore = create<IInvoiceState>()((set) => ({
  invoices: {},
  addInvoice: (invoice: TParsedInvoice) =>
    set((state: IInvoiceState) => {
      const newState = { ...state };

      newState.invoices[`${invoice.id}` as keyof typeof newState] = invoice;
      return newState;
    }),
  getInvoices: async () => {
    const res = await axios.get(`/api/invoices`);
    if (res.data.error) return res.data.error;

    set((state: IInvoiceState) => {
      return {
        ...state,
        invoices: res.data.invoices,
      };
    });
  },
}));
