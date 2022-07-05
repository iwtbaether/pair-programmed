import { AsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { AppThunk, RootState } from "../../app/store";
import { PlayerActionKeys, CraftKeys } from "../../data/jsontypes";

type playerActionsState = {
  currentAction: PlayerActionKeys | CraftKeys | null;
  actionType: "craft" | "action" | null;
  spentTime: number;
  lastTickTime: number;
};

const initialState: playerActionsState = {
  currentAction: null,
  actionType: null,
  spentTime: 0,
  lastTickTime: Date.now(),
};

const playerActionsSlice = createSlice({
  name: "playerActions",
  initialState,
  reducers: {
    setCurrentAction: (
      state,
      action: PayloadAction<{
        key: PlayerActionKeys | CraftKeys | null;
        type: "craft" | "action";
      }>
    ) => {
      state.currentAction = action.payload.key;
      state.actionType = action.payload.type;
      state.spentTime = 0;
      state.lastTickTime = Date.now();
    },
    clearCurrentAction: (state) => {
      state.currentAction = null;
      state.actionType = null;
      state.spentTime = 0;
      state.lastTickTime = Date.now();
    },
    addTime: (
      state,
      action: PayloadAction<{ time: number; timestamp: number }>
    ) => {
      state.spentTime += action.payload.time;
      state.lastTickTime = action.payload.timestamp;
    },
  },
});

export const { setCurrentAction, clearCurrentAction, addTime } =
  playerActionsSlice.actions;
export const selectCurrentAction = (state: RootState) =>
  state.playerActions.currentAction;
export const selectActionType = (state: RootState) =>
  state.playerActions.actionType;
export const selectSpentTime = (state: RootState) =>
  state.playerActions.spentTime;
export const selectLastTickTime = (state: RootState) =>
  state.playerActions.lastTickTime;

export { playerActionsSlice };

export const tickAction = (): AppThunk => (dispatch, getState) => {
  const state = getState();
  const tickTime = Date.now();
  const lastTickTime = selectLastTickTime(state);
  const delta = tickTime - lastTickTime;
  const currentAction = selectCurrentAction(state);
  const actionType = selectActionType(state);
  console.log("tickAction", currentAction, actionType, delta);
  if (currentAction && actionType) {
    dispatch(addTime({ time: delta, timestamp: tickTime }));
  }
};
