import craftsJson from "./json/crafts.json";
import resourcesJson from "./json/resources.json";
import unlocksJson from "./json/unlocks.json";
import upgradesJson from "./json/upgrades.json";
import playerActionsJson from "./json/playerActions.json";
import skillsJson from "./json/skills.json";
import { AppThunk } from "../app/store";

type ResourceKeys = keyof typeof resourcesJson;
type UpgradeKeys = keyof typeof upgradesJson;
type CraftKeys = keyof typeof craftsJson;
type UnlocksKey = keyof typeof unlocksJson;
type PlayerActionKeys = keyof typeof playerActionsJson;
type SkillKeys = keyof typeof skillsJson;

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
    [key in ResourceKeys]: { type: GainTypes; amount: number };
  }>;
  growth: { type: GrowthTypes; amount: number };
}

interface CraftInterface extends Purchasable {
  time: number;
  creates: Partial<MatStorage>;
  requireUnlocks?: UnlocksKey[];
  triggerUnlocks?: UnlocksKey[];
}

interface ResourceInterface {
  name: ResourceKeys;
  type: ResourceType;
}

const materials = resourcesJson as { [key in ResourceKeys]: ResourceInterface };

const upgrades = upgradesJson as { [key in UpgradeKeys]: UpgradeInterface };

const crafts = craftsJson as { [key in CraftKeys]: CraftInterface };

const unlocks = unlocksJson as { [key in UnlocksKey]: typeof unlocksJson[key] };
const playerActions = playerActionsJson as {
  [key in PlayerActionKeys]: typeof playerActionsJson[key];
};
const skills = skillsJson as { [key in SkillKeys]: typeof skillsJson[key] };

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
  CraftInterface,
  PlayerActionKeys,
  SkillKeys,
};
export { upgrades, crafts, materials, unlocks, playerActions, skills };
