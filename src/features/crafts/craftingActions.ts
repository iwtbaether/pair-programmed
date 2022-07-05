import { AppThunk } from "../../app/store";
import {
  CraftKeys,
  crafts,
  MatStorage,
  ResourceKeys,
} from "../../data/jsontypes";
import { addResources, removeResources } from "../resources/materialsSlice";
import { unlockUnlocks } from "../unlocks/unlocksSlice";

//
export const attemptCraft =
  (key: CraftKeys): AppThunk =>
  (dispatch, getState) => {
    const { materials } = getState();
    const craft = crafts[key];
    if (haveResourcesToCraft(craft.resources, materials)) {
      dispatch(removeResources(craft.resources));
      dispatch(addResources(craft.creates));
      if (craft.triggerUnlocks) dispatch(unlockUnlocks(craft.triggerUnlocks));
      // Todo: Impletement actions in slice
      // dispatch(craftStarted(key));
      // dispatch(craftFinished(key));
    }
  };

//
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