import React from "react";
import "./App.css";
import { SaveLoad } from "./features/SaveLoad/SaveLoad";
import ShowStats from "./features/stats/ShowStats";
import ResourceList from "./features/resources/ResourceList";
import UpgradesList from "./features/upgrades/UpgradesList";
import { UpgradeProvider } from "./features/upgrades/Upgrade-context";
import { CraftsList } from "./features/crafts/CraftsList";
import { TickDriver } from "./components/TickDriver";
import { ActionsList } from "./features/playerActions/ActionsList";
import { SimpleRouter } from "./components/SimpleRouter";

function App() {
  return (
    <div className="App">
      <TickDriver>
        <UpgradeProvider>
          <SimpleRouter>
            <SaveLoad />
            <ResourceList />
            <ActionsList />
            <CraftsList />
            <UpgradesList />
            <ShowStats />
          </SimpleRouter>
        </UpgradeProvider>
      </TickDriver>
    </div>
  );
}

export default App;
