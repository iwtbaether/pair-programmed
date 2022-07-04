import { useContext } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { FeatureWrapper } from "../../components/FeatureWrapper";
import type { mats } from "../../data/jsontypes";
import { UpgradeContext } from "../upgrades/Upgrade-context";

import { materialsSlice, selectMaterials } from "./materialsSlice";

export default function ResourceList() {
  const dispatch = useAppDispatch();
  const gains = useContext(UpgradeContext);
  const resources = useAppSelector(selectMaterials);
  const keys = Object.keys(resources) as mats[];
  return (
    <FeatureWrapper>
      <h1>Materials</h1>
      {keys.map((key) => (
        <p
          key={key}
          onClick={() => {
            const gain = gains[key].total;
            dispatch(materialsSlice.actions.gainResource({ gain, key }));
          }}
        >
          {key}: {resources[key]}
        </p>
      ))}
    </FeatureWrapper>
  );
}
