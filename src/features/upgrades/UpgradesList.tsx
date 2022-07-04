import { useContext, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { FeatureWrapper } from "../../components/FeatureWrapper";
import { UpgradeKeys, upgrades } from "../../data/jsontypes";
import { SingleUpgrade } from "./SingleUpgrade";
import { UpgradeContext } from "./Upgrade-context";
import { selectAvailableUpgradeCount } from "./upgradesSlice";
import styles from "./upgrades.module.css";

export default function UpgradesList() {
  const [hideUpgrades, setHideUpgrades] = useState(false);
  const upgCount = useAppSelector(selectAvailableUpgradeCount);
  const upkContext = useContext(UpgradeContext);
  const keys = Object.keys(upgrades) as UpgradeKeys[];

  const toggleHideUpgrades = () => {
    setHideUpgrades(!hideUpgrades);
  };

  // ascii code for up arrow
  const upArrow = String.fromCharCode(9660);
  // ascii code for down arrow
  const downArrow = String.fromCharCode(9650);

  return (
    <FeatureWrapper>
      <h1>
        Upgrades ({upgCount})
        <button onClick={toggleHideUpgrades}>
          {hideUpgrades ? downArrow : upArrow}
        </button>
      </h1>
      <div
        style={{ display: hideUpgrades ? "none" : "flex" }}
        className={styles.UpgradesContainer}
      >
        {keys.map((key) => (
          <SingleUpgrade upgradeKey={key} key={key} />
        ))}
      </div>
    </FeatureWrapper>
  );
}
