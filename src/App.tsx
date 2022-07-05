import React from "react";
import "./App.css";
import { SaveLoad } from "./features/SaveLoad/SaveLoad";
import ShowStats from "./features/stats/ShowStats";
import ResourceList from "./features/resources/ResourceList";
import UpgradesList from "./features/upgrades/UpgradesList";
import { UpgradeProvider } from "./features/upgrades/Upgrade-context";
import { CraftsList } from "./features/crafts/CraftsList";
import { TickDriver } from "./components/TickDriver";

function App() {
  return (
    <div className="App">
      <TickDriver>
        <UpgradeProvider>
          <SaveLoad />
          <ResourceList />
          <CraftsList />
          <UpgradesList />
          <ShowStats />
        </UpgradeProvider>
      </TickDriver>
    </div>
  );
}

export default App;
