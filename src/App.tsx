import React from "react";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import { SaveLoad } from "./features/SaveLoad/SaveLoad";
import ShowStats from "./features/stats/ShowStats";
import ResourceList from "./features/resources/ResourceList";
import UpgradesList from "./features/upgrades/UpgradesList";

function App() {
  return (
    <div className="App">
      <SaveLoad />
      <ShowStats />
      <ResourceList />
      <UpgradesList />
    </div>
  );
}

export default App;
