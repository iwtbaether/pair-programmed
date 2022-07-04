import { useAppSelector } from "../../app/hooks";
import { FeatureWrapper } from "../../components/FeatureWrapper";
import { UpgradeKeys, upgrades } from "../../data/jsontypes";
import { SingleUpgrade } from "./SingleUpgrade";
import { selectAvailableUpgradeCount } from "./upgradesSlice";

export default function UpgradesList() {
  const upgCount = useAppSelector(selectAvailableUpgradeCount)
  const keys = Object.keys(upgrades) as UpgradeKeys[];

  return (
    <FeatureWrapper>
      <h1>Upgrades ({upgCount})</h1>
      {keys.map((key) => (
        <SingleUpgrade upgradeKey={key} key={key}/>
      ))}
    </FeatureWrapper>
  );
}
