import React from "react";
import { Counter } from "./features/counter/Counter";
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
        <ShowStats />
        <ResourceList />
        <UpgradesList />
      </UpgradeProvider>
    </div>
  );
}

export default App;
