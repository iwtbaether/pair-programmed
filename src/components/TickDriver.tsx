import React from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  selectLastTickTime,
  tickAction,
} from "../features/playerActions/playerActionsSlice";

// A react component that dispatchs a tick action every second.
// This component has children that are passed to it.
const TickDriver = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    const interval = setInterval(() => {
      console.log("tick");
      dispatch(tickAction());
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [dispatch]);
  return <>{children}</>;
};

export { TickDriver };
