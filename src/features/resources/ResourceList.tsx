import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { FeatureWrapper } from "../../components/FeatureWrapper";
import type { mats } from "../../data/jsontypes";

import { materialsSlice, selectMaterials } from "./materialsSlice";

export default function ResourceList() {
  const dispatch = useAppDispatch();
  const resources = useAppSelector(selectMaterials);
  const keys = Object.keys(resources) as mats[];
  return (
    <FeatureWrapper>
      <h1>Materials</h1>
      {keys.map((key) => (
        <p key={key} onClick={() => { dispatch(materialsSlice.actions.gainResource({ gain: 1, key })) }}>
          {key}: {resources[key]}
        </p>
      ))}
    </FeatureWrapper>
  );
}
