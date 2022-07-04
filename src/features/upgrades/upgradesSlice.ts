import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "../../app/store";
import { mats, UpgradeKeys, upgrades } from "../../data/jsontypes";
import UpgradeModel from "./UpgradeModel";

export type UpgradeState = {
  [key in UpgradeKeys]: number;
};
const createUpgradeState = (): UpgradeState => {
  const obj: Record<string, any> = {};
  for (const key in upgrades) {
    obj[key] = 0;
  }
  return obj as UpgradeState;
};

const initialState: UpgradeState = createUpgradeState();

const upgradesSlice = createSlice({
  name: "upgrades",
  initialState,

  // The `reducers` field lets us define reducers and generate associated action
  reducers: {
    getUpgrade: (state, action: PayloadAction<{ key: UpgradeKeys }>) => {
      state[action.payload.key]++;
    },
  },
});

const selectUpgrades = (state: RootState) => state.upgrades;

const selectAvailableUpgradeCount = (state: RootState) => {
  return (Object.keys(state.upgrades) as UpgradeKeys[]).reduce(
    (count, upgKey) => {
      const Upg = new UpgradeModel(
        upgrades[upgKey],
        state.upgrades[upgKey]
      ).canPurchase(state.materials);
      if (Upg) return count + 1;
      else return count;
    },
    0
  );
};

export { upgradesSlice, selectUpgrades, selectAvailableUpgradeCount };
export const { getUpgrade } = upgradesSlice.actions;

const calculateGainsByResourceKey = (key: mats) => {
  for (const upgrade in upgrades) {
  }
};
