import { create } from "zustand";
import { TPayout, TPayouts, TPayoutsWeek } from "../types";
import axios from "axios";
import _ from "lodash";

export interface IPayoutState {
  payouts: TPayouts;
  addPayout: (payout: TPayout) => void;
  setPayouts: (payouts: TPayouts) => void;
  getPayouts: () => Promise<void | string>;
  deletePayout: (id: keyof TPayoutsWeek, week: keyof TPayouts) => void;
}

export const usePayoutStore = create<IPayoutState>()((set) => ({
  payouts: {},
  addPayout: (payout: TPayout) =>
    set((state: IPayoutState) => {
      const newState = _.cloneDeep(state);
      const weekLabel = payout.weekLabel as keyof typeof newState.payouts;

      if (!newState.payouts[weekLabel]) {
        newState.payouts[weekLabel] = {
          payouts: {},
          earned: 0,
        };
      }

      newState.payouts[weekLabel].payouts[payout.id] = payout;
      newState.payouts[weekLabel].earned += payout.amount;
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
  deletePayout: (id, week) =>
    set((state: IPayoutState) => {
      const newState = _.cloneDeep(state);
      delete newState.payouts[week].payouts[id];

      if (!Object.values(newState.payouts[week].payouts).length) {
        delete newState.payouts[week];
      }

      return newState;
    }),
}));
