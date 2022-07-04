import json from "./pigs.json";

const materials = json.resources;
type mats = keyof typeof materials;
type UpgradeKeys = keyof typeof json.upgrades;
type CraftKeys = keyof typeof json.crafts;

type GrowthTypes = "flat" | "linear" | "exponential";
type GainTypes = "flat" | "increased" | "more";

type MatStorage = {
  [key in mats]: number;
};
const createMaterialsStorage = (): MatStorage => {
  const obj: Record<string, any> = {};
  for (const key in materials) {
    obj[key] = 0;
  }
  return obj as MatStorage;
};

type PurchasableCost = Partial<MatStorage>;

interface Purchasable {
  name: UpgradeKeys | CraftKeys;
  resources: PurchasableCost;
}

interface UpgradeInterface extends Purchasable {
  gains: Partial<{ [key in mats]: { type: GainTypes; ammount: number } }>;
  growth: { type: GrowthTypes; ammount: number };
}
const upgrades = json.upgrades as { [key in UpgradeKeys]: UpgradeInterface };

interface CraftInterface extends Purchasable {
  time: number;
}
const crafts = json.crafts as { [key in CraftKeys]: CraftInterface };

export type {
  mats,
  MatStorage,
  UpgradeInterface,
  PurchasableCost,
  UpgradeKeys,
  CraftKeys,
  GrowthTypes,
  GainTypes,
};
export { createMaterialsStorage, upgrades, crafts, materials };
