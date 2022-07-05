import { useAppSelector } from "../../app/hooks";
import { FeatureWrapper } from "../../components/FeatureWrapper";
import { UpgradeKeys, upgrades } from "../../data/jsontypes";
import { SingleUpgrade } from "./SingleUpgrade";
import { selectAvailableUpgradeCount } from "./upgradesSlice";
import styles from "./upgrades.module.css";
import { useHideArrow } from "../../hooks/useHideArrow";

export default function UpgradesList() {
  const { hide, toggleHide, arrow } = useHideArrow();
  const upgCount = useAppSelector(selectAvailableUpgradeCount);
  const keys = Object.keys(upgrades) as UpgradeKeys[];

  return (
    <FeatureWrapper>
      <h1>
        Upgrades ({upgCount})<button onClick={toggleHide}>{arrow}</button>
      </h1>
      <div
        style={{ display: hide ? "none" : "flex" }}
        className={styles.UpgradesContainer}
      >
        {keys.map((key) => (
          <SingleUpgrade upgradeKey={key} key={key} />
        ))}
      </div>
    </FeatureWrapper>
  );
}
