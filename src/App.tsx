import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import { SaveLoad } from './features/SaveLoad/SaveLoad';
import { selectTicks } from './features/stats/statsSlice';
import { ShowStats } from './features/stats/ShowStats';
import { ResourceList } from './features/resources/ResourceList';

function App() {
  return (
    <div className="App">
        
        <Counter />
          <SaveLoad/>
          <ShowStats/>
          <ResourceList/>
    </div>
  );
}

export default App;
