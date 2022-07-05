import { MatStorage, ResourceKeys } from "../../data/jsontypes";

type haveMaterialsProps = {
  requiredMaterials: Partial<MatStorage>;
  materials: MatStorage;
};
const haveMaterials = ({
  requiredMaterials,
  materials,
}: haveMaterialsProps): boolean => {
  for (const key in requiredMaterials) {
    const resourceKey = key as ResourceKeys;
    if ((requiredMaterials[resourceKey] || 0) > materials[resourceKey]) {
      return false;
    }
  }
  return true;
};

export { haveMaterials };
