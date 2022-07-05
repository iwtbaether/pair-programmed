import { useContext } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { FeatureWrapper } from "../../components/FeatureWrapper";
import { materials, ResourceKeys } from "../../data/jsontypes";
import { UpgradeContext } from "../upgrades/Upgrade-context";
import { gainResource, selectMaterials } from "./materialsSlice";
import SingleResource from "./SingleResource";

export default function ResourceList() {
  const dispatch = useAppDispatch();
  const gains = useContext(UpgradeContext);
  const resources = useAppSelector(selectMaterials);
  const keys = Object.keys(resources) as ResourceKeys[];
  console.log("what are keys?", keys);

  return (
    <FeatureWrapper>
      <h1>Materials</h1>
      {keys.map((key) => (
        <SingleResource
          key={key}
          resourceKey={key}
          count={resources[key]}
          material={materials[key]}
          gain={gains[key].total}
          onClick={() =>
            dispatch(gainResource({ key, gain: gains[key].total }))
          }
        />
      ))}
    </FeatureWrapper>
  );
}
