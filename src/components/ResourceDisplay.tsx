import React from "react";
import { materials, MatStorage } from "../data/jsontypes";
import styles from "./ResourceDisplay.module.css";

type ResourceDisplayStyles = "gain" | "loss" | "neutral";

interface ResourceDisplayProps {
  resources: Partial<MatStorage>;
  type: ResourceDisplayStyles;
}

// map object for resourcedisplay styles to css classes
const resourceDisplayStyles: { [key in ResourceDisplayStyles]: string } = {
  gain: styles.gain,
  loss: styles.loss,
  neutral: styles.neutral,
};

// map object for resourcedisplay styles to symbols
const resourceDisplaySymbols: { [key in ResourceDisplayStyles]: string } = {
  gain: "+",
  loss: "-",
  neutral: "",
};

//display component for a Partial<MatStorage>
export const ResourceDisplay = ({ resources, type }: ResourceDisplayProps) => {
  const resourceData = materials;
  const keys = Object.keys(resources) as (keyof MatStorage)[];
  const sign = resourceDisplaySymbols[type];
  const className = resourceDisplayStyles[type];
  return (
    <div className={styles.ResourceDisplay}>
      {keys.map((key) => (
        <span className={className}>
          <span>{resourceData[key].name}</span>
          <span>
            <span>{sign}</span>
            <span>{resources[key]}</span>
          </span>
        </span>
      ))}
    </div>
  );
};

interface ResourcePairProps {
  gain?: Partial<MatStorage>;
  loss?: Partial<MatStorage>;
  neutral?: Partial<MatStorage>;
}
export const ResourcePair = ({ gain, loss, neutral }: ResourcePairProps) => {
  return (
    <div className={styles.ResourcePair}>
      {neutral && <ResourceDisplay resources={neutral} type="neutral" />}
      {loss && <ResourceDisplay resources={loss} type="loss" />}
      {gain && <ResourceDisplay resources={gain} type="gain" />}
    </div>
  );
};
