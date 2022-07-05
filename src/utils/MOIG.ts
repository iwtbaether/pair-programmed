import { GainTypes, GrowthTypes } from "../data/jsontypes";

interface GrowthParams {
  cost: number;
  growthRate: number;
  amount: number;
}

export default class MOIG {
  static getGrowingCost(
    cost: number,
    growthRate: number,
    amount: number,
    growthType: GrowthTypes
  ): number {
    const params = { cost, growthRate, amount };
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
    amount: number,
    gainType: GainTypes
  ): number {
    switch (gainType) {
      case "flat":
      case "increased":
        return this.flatGrowth({
          cost: current,
          growthRate: gainRate,
          amount,
        });

      case "more":
        return this.linearGrowth({
          cost: current,
          growthRate: gainRate,
          amount,
        });

      default:
        throw new Error(`Unexpected gainType ${gainType}`);
    }
  }

  // Static function that calculates linear growth of a resource cost
  static linearGrowth({ cost, growthRate, amount }: GrowthParams): number {
    return cost * (1 + growthRate * amount);
  }

  static flatGrowth({ cost, growthRate, amount }: GrowthParams): number {
    return cost + growthRate * amount;
  }

  static exponentialGrowth({ cost, growthRate, amount }: GrowthParams): number {
    return cost * Math.pow(1 + growthRate, amount);
  }
}
