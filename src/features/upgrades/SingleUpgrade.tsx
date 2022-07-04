import { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { AppThunk } from "../../app/store";
import { mats, UpgradeKeys, upgrades } from "../../data/jsontypes";
import { loseResource, selectMaterials } from "../resources/materialsSlice";
import UpgradeModel from "./UpgradeModel";
import { getUpgrade } from "./upgradesSlice";

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
    [upgradeKey, count]
  );
  return (
    <div
      key={upgradeKey}
      style={{ border: "1px solid black" }}
      onClick={() => {
        attemptUpgrade(upgradeKey);
      }}
    >
      <p>
        {upgradeKey}: {JSON.stringify(upgrade)}
      </p>
      <p>Cost: {JSON.stringify(Upgrade.getCost())}</p>
      <p>Can Purchase: {JSON.stringify(Upgrade.canPurchase(resources))}</p>
      <button
        onClick={() => {
          dispatch(attemptUpgrade(upgradeKey));
        }}
      >
        buy
      </button>
    </div>
  );
}

export const attemptUpgrade =
  (key: UpgradeKeys): AppThunk =>
  (dispatch, getState) => {
    const state = getState();
    const currentAmmount = state.upgrades[key];
    const Upgrade = new UpgradeModel(upgrades[key], currentAmmount);
    const canBuy = Upgrade.canPurchase(state.materials);
    if (canBuy) {
      console.log(`Buying ${key}`);
      dispatch(getUpgrade({ key }));
      const costs = Upgrade.getCost();
      Object.keys(costs).forEach((resourceKey) => {
        const matKey = resourceKey as mats;
        const cost = costs[matKey];
        if (cost) dispatch(loseResource({ key: matKey, loss: cost }));
      });
    } else {
      console.log("You cant buy this");
    }
  };
