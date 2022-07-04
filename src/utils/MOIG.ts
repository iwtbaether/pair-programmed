import { GrowthTypes } from "../data/jsontypes";

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
        break;

      case "flat":
        return this.flatGrowth(params);
        break;

      case "linear":
        return this.linearGrowth(params);
        break;

      default:
        throw new Error(`Unknown growt type ${growthType}`);
        break;
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
