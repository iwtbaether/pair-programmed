import React, { createContext } from "react";

interface RouterContextInterface {
  path: string;
  setPath: (path: string) => void;
}

const createInitialContext = (): RouterContextInterface => ({
  path: "/",
  setPath: (path: string) => {},
});

export const RouterContext = createContext(createInitialContext());

type SimpleRouterProps = {
  children: React.ReactNode;
};

//wraps children components in a RouterContext.Provider
const SimpleRouter = ({ children }: SimpleRouterProps) => {
  const [path, setPath] = React.useState("/");
  return (
    <RouterContext.Provider value={{ path, setPath }}>
      {children}
    </RouterContext.Provider>
  );
};

export { SimpleRouter };
