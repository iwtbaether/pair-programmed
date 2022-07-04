import json from './pigs.json';

const materials = json.resources;
type mats = keyof typeof materials;
type MatStorage = {
    [key in mats]: number;
}
const createMaterialsStorage = (): MatStorage => {
    const obj: Record<string,any> = {};
    for (const key in materials) {
        obj[key] = 0;
    }
    return obj as MatStorage;
}

interface Purchasable {
    name: string;
    resources: Partial<{[key in mats]: number}>;
}

interface UpgradeInterface extends Purchasable {
    gains: Partial<{[key in mats]: {type: string, ammount: number}}>;
}
const upgrades = json.upgrades as {[key: string]: UpgradeInterface};

interface CraftInterface extends Purchasable{
    time: number;
}
const crafts = json.crafts as {[key: string]: CraftInterface};

export type {mats, MatStorage}
export {createMaterialsStorage, upgrades, crafts}