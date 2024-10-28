import { create } from "zustand";
import { TParsedPayout, TParsedPayouts } from "../types";
import axios from "axios";

export interface IPayoutState {
  payouts: TParsedPayouts;
  weeks: (keyof TParsedPayouts)[];
  addPayout: (payout: TParsedPayout) => void;
  setPayouts: (payouts: TParsedPayouts) => void;
  getPayouts: () => Promise<void | string>;
}

export const usePayoutStore = create<IPayoutState>()((set) => ({
  payouts: {},
  weeks: [],
  addPayout: (payout: TParsedPayout) =>
    set((state: IPayoutState) => {
      const newState = { ...state };
      const label = payout.weekLabel as keyof typeof newState.payouts;
      debugger;
      if (!newState.payouts[label]) {
        newState.payouts[label] = [];
        newState.weeks.push(label);
      }

      newState.payouts[label].push(payout);
      debugger;
      return newState;
    }),
  setPayouts: (payouts: TParsedPayouts) =>
    set((state: IPayoutState) => {
      const newState = { ...state };

      newState.payouts = payouts;

      return newState;
    }),
  getPayouts: async () => {
    const res = await axios.get(`/api/payouts`);
    if (res.data.error) return res.data.error;

    set((state: IPayoutState) => {
      return {
        ...state,
        payouts: res.data.payouts,
        weeks: Object.keys(res.data.payouts),
      };
    });
  },
}));
