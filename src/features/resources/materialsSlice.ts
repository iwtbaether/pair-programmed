import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { createMaterialsStorage, mats, MatStorage } from '../../data/jsontypes';
import data from '../../data/pigs.json';

const initialState: MatStorage = createMaterialsStorage();


export const materialsSlice = createSlice({
    name: 'materials',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
      gainResource: (state, action: PayloadAction<{ gain: number, key: mats }>) => {
        state[action.payload.key] += action.payload.gain;
      },
    },
  });

export const selectMaterials = (state: RootState) => state.materials;