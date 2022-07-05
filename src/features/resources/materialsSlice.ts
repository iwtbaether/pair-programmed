import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "../../app/store";
import {
  materials,
  ResourceKeys,
  MatStorage,
  PurchasableCost,
} from "../../data/jsontypes";

const createMaterialsStorage = (): MatStorage => {
  const obj: Record<string, any> = {};
  for (const key in materials) {
    obj[key] = 0;
  }
  return obj as MatStorage;
};

const initialState: MatStorage = createMaterialsStorage();

const materialsSlice = createSlice({
  name: "materials",
  initialState,

  // The `reducers` field lets us define reducers and generate associated action
  reducers: {
    gainResource: (
      state,
      action: PayloadAction<{ gain: number; key: ResourceKeys }>
    ) => {
      state[action.payload.key] += action.payload.gain;
    },
    loseResource: (
      state,
      action: PayloadAction<{ loss: number; key: ResourceKeys }>
    ) => {
      state[action.payload.key] -= action.payload.loss;
    },
    removeResources: (state, action: PayloadAction<PurchasableCost>) => {
      for (const key in action.payload) {
        const resourceKey = key as ResourceKeys;
        state[resourceKey] -= action.payload[resourceKey] || 0;
      }
    },
    addResources: (state, action: PayloadAction<PurchasableCost>) => {
      for (const key in action.payload) {
        const resourceKey = key as ResourceKeys;
        state[resourceKey] += action.payload[resourceKey] || 0;
      }
    },
    addResourcesWithMulti: (
      state,
      action: PayloadAction<{ base: PurchasableCost; multi: number }>
    ) => {
      console.log(action.payload);
      for (const key in action.payload.base) {
        const resourceKey = key as ResourceKeys;
        state[resourceKey] +=
          (action.payload.base[resourceKey] || 0) * action.payload.multi;
      }
    },
  },
});

const selectMaterials = (state: RootState) => state.materials;

export const {
  gainResource,
  loseResource,
  removeResources,
  addResources,
  addResourcesWithMulti,
} = materialsSlice.actions;
export { materialsSlice, selectMaterials };
