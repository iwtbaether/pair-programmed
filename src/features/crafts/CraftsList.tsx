import { useAppSelector } from "../../app/hooks";
import { CraftKeys } from "../../data/jsontypes";
import { selectMaterials } from "../resources/materialsSlice";

import { crafts } from "../../data/jsontypes";
import { SingleCraft } from "./SingleCraft";
import styles from "../upgrades/upgrades.module.css";
import { FeatureWrapper } from "../../components/FeatureWrapper";
import { useHideArrow } from "../../hooks/useHideArrow";

function CraftsList(): JSX.Element {
  const resources = useAppSelector(selectMaterials);
  const { hide, toggleHide, arrow } = useHideArrow();
  const keys = Object.keys(crafts) as CraftKeys[];
  return (
    <FeatureWrapper>
      <h1>
        Crafts <button onClick={toggleHide}>{arrow}</button>
      </h1>
      <div
        className={styles.UpgradesContainer}
        style={{ display: hide ? "none" : "flex" }}
      >
        {keys.map((key) => (
          <SingleCraft craftKey={key} resources={resources} key={key} />
        ))}
      </div>
    </FeatureWrapper>
  );
}

export { CraftsList };
