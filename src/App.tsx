import React from "react";
import "./App.css";
import { SaveLoad } from "./features/SaveLoad/SaveLoad";
import ShowStats from "./features/stats/ShowStats";
import ResourceList from "./features/resources/ResourceList";
import UpgradesList from "./features/upgrades/UpgradesList";
import { UpgradeProvider } from "./features/upgrades/Upgrade-context";

function App() {
  return (
    <div className="App">
      <UpgradeProvider>
        <SaveLoad />
        <ResourceList />
        <UpgradesList />
        <ShowStats />
      </UpgradeProvider>
    </div>
  );
}

export default App;
