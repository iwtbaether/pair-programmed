import { useAppSelector } from "../../app/hooks";
import { selectAccountCreated, selectTicks } from "./statsSlice";

export const ShowStats = () => {
  const ticks = useAppSelector(selectTicks);
  const created = useAppSelector(selectAccountCreated);
  return (
    <div>
      <h1>Stats</h1>
      <p>Ticks: {ticks}</p>
      <p>Created: {new Date(created).toString()}</p>
    </div>
  );
};
