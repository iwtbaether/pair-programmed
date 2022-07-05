import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { AppThunk } from "../../app/store";
import { DisplayNumber } from "../../components/DisplayNumber";
import {
  ResourceDisplay,
  ResourcePair,
} from "../../components/ResourceDisplay";
import { PlayerActionKeys, playerActions } from "../../data/jsontypes";
import { useHideArrow } from "../../hooks/useHideArrow";
import { addResourcesWithMulti } from "../resources/materialsSlice";
import { haveMaterials } from "../resources/resourceHelpers";
import styles from "../upgrades/upgrades.module.css";
import {
  beginPlayerAction,
  clearCurrentAction,
  resetCurrentAction,
  selectCurrentAction,
  selectSpentTime,
} from "./playerActionsSlice";

type SinglePlayerActionProps = {
  actionKey: PlayerActionKeys;
};
const SinglePlayerAction = ({ actionKey }: SinglePlayerActionProps) => {
  const { hide, toggleHide, arrow } = useHideArrow();
  const materials = useAppSelector((state) => state.materials);

  const dispatch = useAppDispatch();
  const currentAction = useAppSelector(selectCurrentAction);
  const isActive = currentAction === actionKey;
  const spentTime = useAppSelector(selectSpentTime);
  const thisAction = playerActions[actionKey];
  const isDone = spentTime >= thisAction.time;

  const dispatchBeginPlayerAction = () => {
    dispatch(beginPlayerAction(actionKey));
  };

  const dispatchStopPlayerAction = () => {
    dispatch(clearCurrentAction());
  };

  const dispatchClaimPlayerAction = () => {
    dispatch(claimPlayerAction(actionKey));
  };

  const completions = spentTime / thisAction.time;
  const canDo = haveMaterials({
    requiredMaterials: thisAction.requires || {},
    materials,
  });

  if (!canDo) return null;

  return (
    <div className={styles.UpgradeBox}>
      <div>{thisAction.name}</div>
      <div>
        {!isActive && (
          <button onClick={dispatchBeginPlayerAction}>Start</button>
        )}
        {isActive && !isDone && (
          <button onClick={dispatchStopPlayerAction}>Stop</button>
        )}
        {isActive && isDone && (
          <button onClick={dispatchClaimPlayerAction}>Get</button>
        )}{" "}
        {isActive && (
          <span>
            <DisplayNumber displayAs="time">{spentTime}</DisplayNumber>/
            <DisplayNumber displayAs="time">{thisAction.time}</DisplayNumber> (
            <DisplayNumber displayAs="percent">{completions}</DisplayNumber>)
          </span>
        )}
        {!isActive && (
          <span>
            <DisplayNumber displayAs="time">{thisAction.time}</DisplayNumber>
          </span>
        )}
      </div>
      <div>{thisAction.description}</div>
      <div>
        <ResourcePair gain={thisAction.creates} neutral={thisAction.requires} />
      </div>
      <div>
        <div>
          Silly Details<button onClick={toggleHide}>{arrow}</button>
        </div>
        <div style={!hide ? { display: "none" } : undefined}>
          {JSON.stringify(thisAction)}
        </div>
      </div>
    </div>
  );
};

export { SinglePlayerAction };

// AppThunk to dispatch all the actions needed to complete a player action.
// This is called from the SinglePlayerAction component.
// it does not clear the current action, so the player can keep using the action.
// it does set the spent time to 0.
// it does not check if the player has enough resources to complete the action.
// it does check if there has been enough spentTime to complete the action
// it calculates how many times the action has been completed based off the spent time and the time it takes to complete the action.
const claimPlayerAction =
  (actionKey: PlayerActionKeys): AppThunk =>
  (dispatch, getState) => {
    const spentTime = getState().playerActions.spentTime;
    const action = playerActions[actionKey];
    const timesCompleted = Math.floor(spentTime / action.time);
    dispatch(
      addResourcesWithMulti({ base: action.creates, multi: timesCompleted })
    );
    // dispatch reset action
    dispatch(resetCurrentAction());
  };
