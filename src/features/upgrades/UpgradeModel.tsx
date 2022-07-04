import {
  mats,
  MatStorage,
  PurchasableCost,
  UpgradeInterface,
} from "../../data/jsontypes";
import MOIG from "../../utils/MOIG";

export default class UpgradeModel {
  count: number = 0;
  constructor(public upgrade: UpgradeInterface, count?: number) {
    if (count) {
      this.count = count;
    }
  }

  setCount = (count: number) => {
    this.count = count;
  };

  getCost = (): PurchasableCost => {
    const growthRate = this.upgrade.growth.ammount;
    const ammount = this.count;
    const growthType = this.upgrade.growth.type;
    return Object.keys(this.upgrade.resources).reduce<PurchasableCost>(
      (acc, key) => {
        const res = key as mats;
        const cost = this.upgrade.resources[res]
        if (cost) acc[res] = MOIG.getGrowingCost(cost, growthRate, ammount, growthType)
        else throw new Error(`Unknown cost key ${res}`)
        return acc;
      },
      {} as Record<string, number>
    );
  };

  canPurchase = (resources: MatStorage): boolean => {
    const cost = this.getCost();
    return Object.keys(cost).every(
      (key) => resources[key as mats] >= (cost[key as mats] || 0)
    );
  };
}
