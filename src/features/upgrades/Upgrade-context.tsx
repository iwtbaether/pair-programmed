import React, { ReactNode, useEffect } from "react";
import { useAppSelector } from "../../app/hooks";
import {
  GainTypes,
  materials,
  ResourceKeys,
  UpgradeKeys,
  upgrades,
} from "../../data/jsontypes";
import MOIG from "../../utils/MOIG";
import { selectUpgrades } from "./upgradesSlice";

interface Gains {
  key: ResourceKeys;
  flat: number;
  increased: number;
  more: number;
  total: number;
}

interface sumGainsParams {
  flat: number;
  increased: number;
  more: number;
}
const sumGains = ({ flat, increased, more }: sumGainsParams) => {
  return flat * (1 + increased) * more;
};

const getInitialGains = (key: ResourceKeys): Gains => ({
  key,
  flat: 1,
  increased: 0,
  more: 1,
  total: 1,
});

const createInitialGains = () => {
  const gains: Record<string, Gains> = {};
  for (const key in materials) {
    gains[key] = getInitialGains(key as ResourceKeys);
  }

  return gains as Record<ResourceKeys, Gains>;
};

export const UpgradeContext = React.createContext(createInitialGains());

interface addGainsParams {
  current: Gains;
  gainData: { type: GainTypes; amount: number };
  count: number;
}
const addGains = ({ current, gainData, count }: addGainsParams): Gains => {
  current[gainData.type] = MOIG.getGains(
    current[gainData.type],
    gainData.amount,
    count,
    gainData.type
  );
  return current;
};

interface UpgradeProviderProps {
  children: ReactNode;
}
export function UpgradeProvider({ children }: UpgradeProviderProps) {
  const upgradeCounts = useAppSelector(selectUpgrades);
  const [gains, setGains] = React.useState<Record<ResourceKeys, Gains>>(
    createInitialGains()
  );

  useEffect(() => {
    const baseGains = createInitialGains();
    for (const upg in upgrades) {
      const upgrade = upgrades[upg as UpgradeKeys];
      const amount = upgradeCounts[upg as UpgradeKeys];
      for (const res in upgrade.gains) {
        const gainData = upgrade.gains[res as ResourceKeys];
        if (gainData) {
          baseGains[res as ResourceKeys] = addGains({
            current: baseGains[res as ResourceKeys],
            gainData,
            count: amount,
          });
        }
      }
      console.log("Setting gains ----->", JSON.stringify(baseGains));
    }
    for (const gn in baseGains) {
      baseGains[gn as ResourceKeys].total = sumGains(
        baseGains[gn as ResourceKeys]
      );
    }
    setGains(baseGains);
  }, [upgradeCounts]);

  return (
    <UpgradeContext.Provider value={gains}>{children}</UpgradeContext.Provider>
  );
}
