import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { DisplayNumber } from "../../components/DisplayNumber";
import { DisplayTime } from "../../components/DisplayTime";
import { ResourcePair } from "../../components/ResourceDisplay";
import { CraftKeys, crafts, MatStorage } from "../../data/jsontypes";
import {
  selectCurrentAction,
  selectSpentTime,
} from "../playerActions/playerActionsSlice";
import { haveMaterials } from "../resources/resourceHelpers";
import { areRequiredUnlocksUnlocked } from "../unlocks/unlocks";
import styles from "../upgrades/upgrades.module.css";
import { attemptCraft, finishCraft } from "./craftingActions";

interface SingleCraftProps {
  craftKey: CraftKeys;
  resources: MatStorage;
}

const SingleCraft = ({ craftKey, resources }: SingleCraftProps) => {
  const dispatch = useAppDispatch();
  const unlocks = useAppSelector((state) => state.unlocks);
  const currentAction = useAppSelector(selectCurrentAction);
  const spentTime = useAppSelector(selectSpentTime);
  const craft = crafts[craftKey];
  const { name, creates, resources: required, requireUnlocks } = craft;

  const inProgress = currentAction === craftKey;
  const done = spentTime >= craft.time;

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

  const finish = () => {
    dispatch(finishCraft(craftKey));
  };

  if (!unlocked) return null;

  return (
    <div className={styles.UpgradeBox}>
      <div>{name}</div>
      <div>
        {!inProgress && (
          <button disabled={!canBuy} onClick={onClick}>
            Start Crafting{" "}
            <DisplayNumber displayAs="time">{craft.time}</DisplayNumber>
          </button>
        )}
        {inProgress && !done && (
          <button disabled>In Progress {`(${spentTime}/${craft.time})`}</button>
        )}
        {inProgress && done && <button onClick={finish}>Get</button>}
      </div>
      <ResourcePair gain={creates} loss={required} />
    </div>
  );
};

export { SingleCraft };
