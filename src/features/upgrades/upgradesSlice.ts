import { createSlice, PayloadAction} from "@reduxjs/toolkit";

import type { RootState } from "../../app/store";
import { mats, MatStorage , createMaterialsStorage, UpgradeKeys, upgrades } from "../../data/jsontypes";

export type UpgradeState ={
  [key in UpgradeKeys]: number;
}
const createUpgradeState = (): UpgradeState=>{
  const obj: Record<string, any> = {};
  for (const key in upgrades) {
    obj[key] = 0;
  }
  return obj as UpgradeState;
}


const initialState: UpgradeState = createUpgradeState();

const upgradesSlice = createSlice({
  name: "upgrades",
  initialState,

  // The `reducers` field lets us define reducers and generate associated action
  reducers: {
    getUpgrade: (
      state,
      action: PayloadAction<{ key: UpgradeKeys }>
    ) => {
      state[action.payload.key] ++;
    },
  },
});

const selectUpgrades = (state: RootState) => state.upgrades;

export {
  upgradesSlice, selectUpgrades
}