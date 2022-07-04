import React, { ReactNode, useEffect } from "react";
import { useAppSelector } from "../../app/hooks";
import {
  GainTypes,
  materials,
  mats,
  UpgradeKeys,
  upgrades,
} from "../../data/jsontypes";
import MOIG from "../../utils/MOIG";
import { selectUpgrades } from "./upgradesSlice";

interface Gains {
  key: mats;
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
  return flat * (1 + increased) * (more);
};

const getInitialGains = (key: mats): Gains => ({
  key,
  flat: 1,
  increased: 0,
  more: 1,
  total: 1,
});

const createInitialGains = () => {
  const gains: Record<string, Gains> = {};
  for (const key in materials) {
    gains[key] = getInitialGains(key as mats);
  }

  return gains as Record<mats, Gains>;
};

export const UpgradeContext = React.createContext(createInitialGains());

interface addGainsParams {
  current: Gains;
  gainData: { type: GainTypes; ammount: number };
  count: number;
}
const addGains = ({ current, gainData, count }: addGainsParams): Gains => {
  current[gainData.type] = MOIG.getGains(
    current[gainData.type],
    gainData.ammount,
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
  const [gains, setGains] = React.useState<Record<mats, Gains>>(
    createInitialGains()
  );

  useEffect(() => {
    const baseGains = createInitialGains();
    for (const upg in upgrades) {
      const upgrade = upgrades[upg as UpgradeKeys];
      const ammount = upgradeCounts[upg as UpgradeKeys];
      for (const res in upgrade.gains) {
        const gainData = upgrade.gains[res as mats];
        if (gainData) {
          baseGains[res as mats] = addGains({
            current: baseGains[res as mats],
            gainData,
            count: ammount,
          });
        }
      }
      console.log("Setting gains ----->", JSON.stringify(baseGains));
    }
    for (const gn in baseGains) {
      baseGains[gn as mats].total = sumGains(baseGains[gn as mats]);
    }
    setGains(baseGains);
  }, [upgradeCounts]);

  return (
    <UpgradeContext.Provider value={gains}>{children}</UpgradeContext.Provider>
  );
}
