import { useAppSelector } from "../../app/hooks";
import { mats } from "../../data/jsontypes";
import { selectMaterials } from "./materialsSlice";

export const ResourceList = () => {
  const resources = useAppSelector(selectMaterials);
  const keys = Object.keys(resources) as mats[];
    return (
        <div>
            <h1>Materials</h1>
            {keys.map(key => (<p>{key}: {resources[key]}</p>))}
        </div>
    )
}