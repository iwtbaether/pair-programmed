import { useMemo } from "react";
import { useAppSelector } from "../../app/hooks";
import { FeatureWrapper } from "../../components/FeatureWrapper";
import { UpgradeKeys, upgrades } from "../../data/jsontypes";
import { selectMaterials } from "../resources/materialsSlice";
import UpgradeModel from "./UpgradeModel";

export default function UpgradesList() {
  //const dispatch = useAppDispatch();
  const resources = useAppSelector(selectMaterials);
  const keys = Object.keys(upgrades) as UpgradeKeys[];

  const Upgrades = useMemo(() => {
    return keys.reduce((acc, key) => {
      acc[key] = new UpgradeModel(upgrades[key]);
      return acc;
    }, {} as Record<UpgradeKeys, UpgradeModel>);
    // return keys.map((key) => new UpgradeModel(upgrades[key]));
  }, [keys])

  return (
    <FeatureWrapper>

      <h1>Upgrades</h1>
      {keys.map((key) => (
        <p key={key} style={{ border: '1px solid black' }}>
          {key}: {JSON.stringify(upgrades[key])}
          <p>
            Cost: {JSON.stringify(Upgrades[key].getCost())}
          </p>
          <p>
            Can Purchase: {JSON.stringify(Upgrades[key].canPurchase(resources))}
          </p>
        </p>
      ))}
    </FeatureWrapper>
  );
}
