import { useAppSelector } from "../../app/hooks";
import { FeatureWrapper } from "../../components/FeatureWrapper";

import { selectAccountCreated, selectTicks } from "./statsSlice";

export default function ShowStats() {
  const ticks = useAppSelector(selectTicks);
  const created = useAppSelector(selectAccountCreated);
  return (
<FeatureWrapper>      <h1>Stats</h1>
      <p>Ticks: {ticks}</p>
      <p>Created: {new Date(created).toString()}</p>
    </FeatureWrapper>
  );
}
