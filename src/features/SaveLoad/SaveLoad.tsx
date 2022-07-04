import { useAppDispatch } from "../../app/hooks";
import LoadFileButton from "../../components/LoadFileButton";

// Allows the user to save or load the redux state using the functions from localStorageStore.ts
export function SaveLoad() {
    const dispatch = useAppDispatch();
    // function that dispatches the save state action
    const saveState = () => {
        dispatch({ type: "SAVE_STATE" });
    }
    const loadState = () => {
        dispatch({ type: "LOAD_STATE" });
    }
    const saveFile = () => {
        dispatch({ type: "SAVE_FILE" });
    }
    const loadFile = () => {
        dispatch({ type: "LOAD_FILE" });
    }
    return (
        <div>
            <button onClick={saveState}>Save State</button>
            <button onClick={loadState}>Load State</button>
            <button onClick={saveFile}>Save File</button>
            <LoadFileButton/>
        </div>
    );
}