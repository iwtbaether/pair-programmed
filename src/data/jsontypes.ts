import craftsJson from "./json/crafts.json";
import resourcesJson from "./json/resources.json";
import unlocksJson from "./json/unlocks.json";
import upgradesJson from "./json/upgrades.json";

type ResourceKeys = keyof typeof resourcesJson;
type UpgradeKeys = keyof typeof upgradesJson;
type CraftKeys = keyof typeof craftsJson;
type UnlocksKey = keyof typeof unlocksJson;

type GrowthTypes = "flat" | "linear" | "exponential";
type GainTypes = "flat" | "increased" | "more";
type ResourceType = "raw" | "crafted";

type MatStorage = {
  [key in ResourceKeys]: number;
};

type PurchasableCost = Partial<MatStorage>;

interface Purchasable {
  name: UpgradeKeys | CraftKeys;
  resources: PurchasableCost;
}

interface UpgradeInterface extends Purchasable {
  gains: Partial<{
    [key in ResourceKeys]: { type: GainTypes; ammount: number };
  }>;
  growth: { type: GrowthTypes; ammount: number };
}

interface CraftInterface extends Purchasable {
  time: number;
}

interface ResourceInterface {
  name: ResourceKeys;
  type: ResourceType;
}

const materials = resourcesJson as { [key in ResourceKeys]: ResourceInterface };

const upgrades = upgradesJson as { [key in UpgradeKeys]: UpgradeInterface };

const crafts = craftsJson as { [key in CraftKeys]: CraftInterface };

const unlocks = unlocksJson as { [key in UnlocksKey]: typeof unlocksJson[key] };

export type {
  ResourceKeys,
  MatStorage,
  UpgradeInterface,
  PurchasableCost,
  UpgradeKeys,
  CraftKeys,
  GrowthTypes,
  GainTypes,
  UnlocksKey,
  ResourceInterface,
};
export { upgrades, crafts, materials, unlocks };
