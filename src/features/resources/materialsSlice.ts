import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "../../app/store";
import { mats, MatStorage, createMaterialsStorage } from "../../data/jsontypes";

const initialState: MatStorage = createMaterialsStorage();

const materialsSlice = createSlice({
  name: "materials",
  initialState,

  // The `reducers` field lets us define reducers and generate associated action
  reducers: {
    gainResource: (
      state,
      action: PayloadAction<{ gain: number; key: mats }>
    ) => {
      state[action.payload.key] += action.payload.gain;
    },
    loseResource: (
      state,
      action: PayloadAction<{ loss: number; key: mats }>
    ) => {
      state[action.payload.key] -= action.payload.loss;
    },
  },
});

const selectMaterials = (state: RootState) => state.materials;

export const { gainResource, loseResource } = materialsSlice.actions;
export { materialsSlice, selectMaterials };
