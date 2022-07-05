import React from "react";
import { materials, MatStorage } from "../data/jsontypes";
import styles from "./ResourceDisplay.module.css";

interface ResourceDisplayProps {
  resources: Partial<MatStorage>;
  type: "gain" | "loss";
}

//display component for a Partial<MatStorage>
export const ResourceDisplay = ({ resources, type }: ResourceDisplayProps) => {
  const resourceData = materials;
  const keys = Object.keys(resources) as (keyof MatStorage)[];
  const sign = type === "gain" ? "+" : "-";
  const className = type === "gain" ? styles.PositiveBox : styles.NegativeBox;
  return (
    <div>
      {keys.map((key) => (
        <div key={key} className={styles.SingleResourceDisplay}>
          <span className={className}>
            <span>{resourceData[key].name}</span>
            <span>
              <span>{sign}</span>
              <span>{resources[key]}</span>
            </span>
          </span>
        </div>
      ))}
    </div>
  );
};

interface ResourcePairProps {
  gain: Partial<MatStorage>;
  loss: Partial<MatStorage>;
}
export const ResourcePair = ({ gain, loss }: ResourcePairProps) => {
  return (
    <div className={styles.ResourcePair}>
      <ResourceDisplay resources={gain} type="gain" />
      <ResourceDisplay resources={loss} type="loss" />
    </div>
  );
};
