import { useContext } from "react";
import { useAppSelector } from "../../app/hooks";
import { FeatureWrapper } from "../../components/FeatureWrapper";
import { UpgradeKeys, upgrades } from "../../data/jsontypes";
import { SingleUpgrade } from "./SingleUpgrade";
import { UpgradeContext } from "./Upgrade-context";
import { selectAvailableUpgradeCount } from "./upgradesSlice";

export default function UpgradesList() {
  const upgCount = useAppSelector(selectAvailableUpgradeCount);
  const upkContext = useContext(UpgradeContext);
  const keys = Object.keys(upgrades) as UpgradeKeys[];

  return (
    <FeatureWrapper>
      <h1>
        Upgrades ({upgCount}) ({JSON.stringify(upkContext)})
      </h1>
      {keys.map((key) => (
        <SingleUpgrade upgradeKey={key} key={key} />
      ))}
    </FeatureWrapper>
  );
}
