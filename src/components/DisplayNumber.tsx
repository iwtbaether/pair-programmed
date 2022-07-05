import { useMemo } from "react";

type numberDisplayFormat = "decimal" | "percent" | "time";
interface DisplayNumberProps {
  children: number;
  displayAs: numberDisplayFormat;
}
export const DisplayNumber = ({ children, displayAs }: DisplayNumberProps) => {
  const displayValue = useMemo(() => {
    switch (displayAs) {
      case "decimal":
        return children.toFixed(2);
      case "percent":
        return (children * 100).toFixed(2) + "%";
      case "time":
        return (children / 1000).toFixed(0) + "s";
      default:
        return children.toFixed(2);
    }
  }, [children, displayAs]);
  return <>{displayValue}</>;
};
