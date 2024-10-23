import { create } from "zustand";
import { TParsedPayout, TParsedPayouts } from "../types";

export interface IPayoutState {
  payouts: TParsedPayouts;
  addPayout: (payout: TParsedPayout) => void;
  setPayouts: (payouts: TParsedPayouts) => void;
}

export const usePayoutStore = create<IPayoutState>()((set) => ({
  payouts: {},
  addPayout: (payout: TParsedPayout) =>
    set((state: IPayoutState) => {
      const newState = { ...state };

      if (payout.weekLabel) {
        if (typeof newState.payouts[payout.weekLabel] === undefined) {
          newState.payouts[payout.weekLabel] = [];
        }
        newState.payouts[payout.weekLabel].push(payout);
      }

      return newState;
    }),
  setPayouts: (payouts: TParsedPayouts) =>
    set((state: IPayoutState) => {
      const newState = { ...state };

      newState.payouts = payouts;

      return newState;
    }),
}));
