import { mats, MatStorage, PurchasableCost, UpgradeInterface } from "../../data/jsontypes";

export default class UpgradeModel {

    count: number = 0;
    constructor(public upgrade: UpgradeInterface, count?: number){
        if (count) {
            this.count = count;
        }
    }
    
    setCount = (count: number) => {
        this.count = count;
    }

    getCost = (): PurchasableCost => {
        return Object.keys(this.upgrade.resources).reduce<PurchasableCost>((acc, key) => {
            const res = key as mats;
            acc[res] = this.upgrade.resources[res] || 0 * (1 + this.count);
            return acc;
        }, {} as Record<string, number>);
    }

    canPurchase = (resources: MatStorage): boolean => {
        const cost = this.getCost();
        return Object.keys(cost).every((key) => resources[key as mats] >= (cost[key as mats] || 0));
    }
}