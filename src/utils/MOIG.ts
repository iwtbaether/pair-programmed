import { GainTypes, GrowthTypes } from "../data/jsontypes";

interface GrowthParams {
  cost: number;
  growthRate: number;
  ammount: number;
}

export default class MOIG {
  static getGrowingCost(
    cost: number,
    growthRate: number,
    ammount: number,
    growthType: GrowthTypes
  ): number {
    const params = { cost, growthRate, ammount };
    switch (growthType) {
      case "exponential":
        return this.exponentialGrowth(params);

      case "flat":
        return this.flatGrowth(params);

      case "linear":
        return this.linearGrowth(params);

      default:
        throw new Error(`Unknown growt type ${growthType}`);
    }
  }

  static getGains(
    current: number,
    gainRate: number,
    ammount: number,
    gainType: GainTypes
  ): number {
    switch (gainType) {
      case "flat":
      case "increased":
        return this.flatGrowth({
          cost: current,
          growthRate: gainRate,
          ammount,
        });

      case "more":
        return this.linearGrowth({
          cost: current,
          growthRate: gainRate,
          ammount,
        });

      default:
        throw new Error(`Unexpected gainType ${gainType}`);
    }
  }

  // Static function that calculates linear growth of a resource cost
  static linearGrowth({ cost, growthRate, ammount }: GrowthParams): number {
    return cost * (1 + growthRate * ammount);
  }

  static flatGrowth({ cost, growthRate, ammount }: GrowthParams): number {
    return cost + growthRate * ammount;
  }

  static exponentialGrowth({
    cost,
    growthRate,
    ammount,
  }: GrowthParams): number {
    return cost * Math.pow(1 + growthRate, ammount);
  }
}
