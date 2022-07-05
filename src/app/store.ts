import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
  PayloadAction,
} from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import { materialsSlice } from "../features/resources/materialsSlice";
import { statsSlice } from "../features/stats/statsSlice";
import { unlocksSlice } from "../features/unlocks/unlocksSlice";
import { upgradesSlice } from "../features/upgrades/upgradesSlice";

import {
  loadFile,
  loadState,
  saveFile,
  saveState,
} from "../utils/localStorageStore";

var merge = require("lodash.merge");

const appReducer = combineReducers({
  counter: counterReducer,
  stats: statsSlice.reducer,
  materials: materialsSlice.reducer,
  upgrades: upgradesSlice.reducer,
  unlocks: unlocksSlice.reducer,
});

export const rootReducer = (
  state: ReturnType<typeof appReducer> | undefined,
  action: PayloadAction<any>
) => {
  if (action.type === "LOAD_STATE") {
    console.log("loading inside reducer");

    let loaded = loadState();
    return merge({}, appReducer(undefined, { type: "noop" }), loaded);
  } else if (action.type === "RESET_STATE") {
    let updatedState = appReducer(undefined, action);
    return updatedState;
  } else if (action.type === "SAVE_STATE") {
    if (state) saveState(state);
    return state;
  } else if (action.type === "SAVE_FILE") {
    if (state) saveFile(state);
    return state;
  } else if (action.type === "LOAD_FILE") {
    if (typeof action.payload === "string") {
      let loaded = loadFile(action.payload);
      return merge({}, appReducer(undefined, { type: "noop" }), loaded);
    } else return state;
  } else return appReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
