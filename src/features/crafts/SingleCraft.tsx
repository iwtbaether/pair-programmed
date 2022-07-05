import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { CraftKeys, crafts, MatStorage } from "../../data/jsontypes";
import { haveMaterials } from "../resources/resourceHelpers";
import { areRequiredUnlocksUnlocked } from "../unlocks/unlocks";
import styles from "../upgrades/upgrades.module.css";
import { attemptCraft } from "./craftingActions";

interface SingleCraftProps {
  craftKey: CraftKeys;
  resources: MatStorage;
}

const SingleCraft = ({ craftKey, resources }: SingleCraftProps) => {
  const dispatch = useAppDispatch();
  const unlocks = useAppSelector((state) => state.unlocks);
  const craft = crafts[craftKey];
  const { name, creates, resources: required, requireUnlocks } = craft;

  const unlocked = areRequiredUnlocksUnlocked({
    requiredUnlocks: requireUnlocks || [],
    unlocks,
  });

  const canBuy = haveMaterials({
    materials: resources,
    requiredMaterials: required,
  });

  // if canBuy and unlocked are true, then we attempCraft
  const onClick = () => {
    if (canBuy && unlocked) {
      dispatch(attemptCraft(craftKey));
    }
  };

  if (!unlocked) return null;

  return (
    <div className={styles.UpgradeBox}>
      <div>
        <button disabled={!canBuy} onClick={onClick}>
          {name}
        </button>
      </div>
      <div>Gives: {JSON.stringify(creates)}</div>
      <div>Costs: {JSON.stringify(required)}</div>
    </div>
  );
};

export { SingleCraft };
