import React, { ReactNode } from "react";

// A react component that wraps its children in a div with a border.

export interface FeatureWrapperProps {
    children: ReactNode;
}

export function FeatureWrapper ({children}: FeatureWrapperProps) {
  return (
    <div style={{border:"5px solid black"}}>
      {children}
    </div>
  );
}

