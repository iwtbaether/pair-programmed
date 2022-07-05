import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

import { unlocks, UnlocksKey } from "../../data/jsontypes";

export type UnlocksState = { [key in UnlocksKey]: boolean };

const initialState: UnlocksState = (
  Object.keys(unlocks) as UnlocksKey[]
).reduce((record, unlockKey) => {
  record[unlockKey] = false;
  return record;
}, {} as Record<UnlocksKey, boolean>);

export const unlocksSlice = createSlice({
  name: "unlocks",
  initialState,
  reducers: {
    unlock: (state, action: PayloadAction<UnlocksKey>) => {
      state[action.payload] = true;
    },
    unlockUnlocks: (state, action: PayloadAction<UnlocksKey[]>) => {
      action.payload.forEach((unlockKey) => {
        state[unlockKey] = true;
      });
    },
  },
});

export const { unlock, unlockUnlocks } = unlocksSlice.actions;
export const selectUnlocks = (state: RootState) => state.unlocks;
