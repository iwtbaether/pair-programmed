import React from "react";
import { PlayerActionKeys } from "../../data/jsontypes";
import { playerActions } from "../../data/jsontypes";
import styles from "../upgrades/upgrades.module.css";
import { FeatureWrapper } from "../../components/FeatureWrapper";
import { useHideArrow } from "../../hooks/useHideArrow";
import { SinglePlayerAction } from "./SinglePlayerAction";

// A component that maps over the playerActionKeys and renders a SinglePlayerAction component for each one.
// It uses useHideArrow to hide the list when hide is true.
function ActionsList(): JSX.Element {
  const { hide, toggleHide, arrow } = useHideArrow();
  const keys = Object.keys(playerActions) as PlayerActionKeys[];
  return (
    <FeatureWrapper>
      <h1>
        Player Actions <button onClick={toggleHide}>{arrow}</button>
      </h1>
      <div
        className={styles.UpgradesContainer}
        style={{ display: hide ? "none" : "flex" }}
      >
        {keys.map((key) => (
          <SinglePlayerAction actionKey={key} key={key} />
        ))}
      </div>
    </FeatureWrapper>
  );
}

export { ActionsList };
