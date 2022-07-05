import { UnlocksKey } from "../../data/jsontypes";
import { UnlocksState } from "./unlocksSlice";

type aRUUParams = {
  requiredUnlocks: UnlocksKey[];
  unlocks: UnlocksState;
};
const areRequiredUnlocksUnlocked = ({
  requiredUnlocks,
  unlocks,
}: aRUUParams) => {
  return requiredUnlocks.every((unlockKey) => unlocks[unlockKey]);
};

export { areRequiredUnlocksUnlocked };
