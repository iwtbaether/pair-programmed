import { AppThunk } from "../../app/store";
import {
  CraftKeys,
  crafts,
  MatStorage,
  ResourceKeys,
} from "../../data/jsontypes";
import {
  clearCurrentAction,
  setCurrentAction,
} from "../playerActions/playerActionsSlice";
import { addResources, removeResources } from "../resources/materialsSlice";
import { unlockUnlocks } from "../unlocks/unlocksSlice";

export const attemptCraft =
  (key: CraftKeys): AppThunk =>
  (dispatch, getState) => {
    const { materials } = getState();
    const craft = crafts[key];
    if (haveResourcesToCraft(craft.resources, materials)) {
      dispatch(setCurrentAction({ key, type: "craft" }));
      dispatch(removeResources(craft.resources));
    }
  };

export const finishCraft =
  (key: CraftKeys): AppThunk =>
  (dispatch, getState) => {
    const craft = crafts[key];
    dispatch(addResources(craft.creates));
    dispatch(clearCurrentAction());
    if (craft.triggerUnlocks) dispatch(unlockUnlocks(craft.triggerUnlocks));
  };

export const haveResourcesToCraft = (
  required: Partial<MatStorage>,
  resources: MatStorage
): boolean => {
  const keys = Object.keys(required) as ResourceKeys[];
  for (const key of keys) {
    if (resources[key] < (required[key] || 0)) {
      return false;
    }
  }
  return true;
};
