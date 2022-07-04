import craftsJson from "./json/crafts.json";
import resourcesJson from './json/resources.json';
import unlocksJson from './json/unlocks.json';
import upgradesJson from './json/upgrades.json';

const materials = resourcesJson as { [key in mats]: typeof resourcesJson[key] };

type mats = keyof typeof resourcesJson;
type UpgradeKeys = keyof typeof upgradesJson;
type CraftKeys = keyof typeof craftsJson;
type UnlocksKey = keyof typeof unlocksJson;

type GrowthTypes = "flat" | "linear" | "exponential";
type GainTypes = "flat" | "increased" | "more";

type MatStorage = {
  [key in mats]: number;
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
const upgrades = upgradesJson as { [key in UpgradeKeys]: UpgradeInterface };

interface CraftInterface extends Purchasable {
  time: number;
}
const crafts = craftsJson as { [key in CraftKeys]: CraftInterface };

const unlocks = unlocksJson as { [key in UnlocksKey]: typeof unlocksJson[key] };

export type {
  mats,
  MatStorage,
  UpgradeInterface,
  PurchasableCost,
  UpgradeKeys,
  CraftKeys,
  GrowthTypes,
  GainTypes,
  UnlocksKey,
};
export { upgrades, crafts, materials, unlocks };
