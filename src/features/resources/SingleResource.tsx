import React from "react";
import { MatStorage, ResourceInterface } from "../../data/jsontypes";

interface SingleResourceProps {
  resourceKey: string;
  count: MatStorage[keyof MatStorage];
  material: ResourceInterface;
  gain: number;
  onClick: () => void;
}

export default function SingleResource({
  resourceKey,
  count,
  material,
  gain,
  onClick,
}: SingleResourceProps) {
  if (count === 0 && material.type !== "raw") return null;

  return (
    <p key={resourceKey}>
      {material.name}: {count}
      <button onClick={onClick}>(+{gain})</button>
    </p>
  );
}
