import { useMemo } from "react";

type componentProps = {
  time: number;
};
const DisplayTime = ({ time }: componentProps) => {
  const date = useMemo(() => new Date(time), [time]);
  const ms = date.getMilliseconds();
  const s = date.getSeconds();
  return (
    <div>
      {time}- {s} - {ms}
    </div>
  );
};

export { DisplayTime };
