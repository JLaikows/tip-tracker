import { create } from "zustand";
import { TPayout, TPayouts } from "../types";
import axios from "axios";

export interface IPayoutState {
  weekTotalEarned: number;
  weekTotalOwed: number;
  payouts: TPayouts;
  weeks: (keyof TPayouts)[];
  addPayout: (payout: TPayout) => void;
  setPayouts: (payouts: TPayouts) => void;
  getPayouts: () => Promise<void | string>;
}

export const usePayoutStore = create<IPayoutState>()((set) => ({
  weekTotalEarned: 0,
  weekTotalOwed: 0,
  payouts: {},
  weeks: [],
  addPayout: (payout: TPayout) =>
    set((state: IPayoutState) => {
      const newState = { ...state };
      const label = payout.weekLabel as keyof typeof newState.payouts;

      if (!newState.payouts[label]) {
        newState.payouts[label] = {
          payouts: [],
          earned: 0,
          owed: 0,
        };
        newState.weeks.push(label);
      }

      newState.payouts[label].payouts.push(payout);
      newState.payouts[label].earned += payout.amount;
      newState.payouts[label].owed += payout.owed;
      return newState;
    }),
  setPayouts: (payouts: TPayouts) =>
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
