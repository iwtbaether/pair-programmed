import { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { AppThunk } from "../../app/store";
import { ResourceKeys, UpgradeKeys, upgrades } from "../../data/jsontypes";
import { loseResource, selectMaterials } from "../resources/materialsSlice";
import UpgradeModel from "./UpgradeModel";
import { getUpgrade } from "./upgradesSlice";
import styles from "./upgrades.module.css";

interface SingleUpgradeProps {
  upgradeKey: UpgradeKeys;
}
export function SingleUpgrade({ upgradeKey }: SingleUpgradeProps) {
  const dispatch = useAppDispatch();
  const resources = useAppSelector(selectMaterials);
  const count = useAppSelector((state) => state.upgrades[upgradeKey]);
  const upgrade = upgrades[upgradeKey];
  const Upgrade = useMemo(
    () => new UpgradeModel(upgrade, count),
    [count, upgrade]
  );
  const canPurchase = Upgrade.canPurchase(resources);
  return (
    <div
      key={upgradeKey}
      style={{ border: "1px solid black" }}
      className={styles.UpgradeBox}
      onClick={() => {
        attemptUpgrade(upgradeKey);
      }}
    >
      <span>{upgrade.name}</span>
      <div>Gains: {JSON.stringify(upgrade.gains)}</div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>Cost: {JSON.stringify(Upgrade.getCost())}</div>
        <div>Growth: {JSON.stringify(upgrade.growth)}</div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>{`Owned: ${count}`}</div>
        <button
          disabled={!canPurchase}
          onClick={() => {
            dispatch(attemptUpgrade(upgradeKey));
          }}
        >
          buy
        </button>
      </div>
    </div>
  );
}

export const attemptUpgrade =
  (key: UpgradeKeys): AppThunk =>
  (dispatch, getState) => {
    const state = getState();
    const currentamount = state.upgrades[key];
    const Upgrade = new UpgradeModel(upgrades[key], currentamount);
    const canBuy = Upgrade.canPurchase(state.materials);
    if (canBuy) {
      console.log(`Buying ${key}`);
      dispatch(getUpgrade({ key }));
      const costs = Upgrade.getCost();
      Object.keys(costs).forEach((resourceKey) => {
        const matKey = resourceKey as ResourceKeys;
        const cost = costs[matKey];
        if (cost) dispatch(loseResource({ key: matKey, loss: cost }));
      });
    } else {
      console.log("You cant buy this");
    }
  };
