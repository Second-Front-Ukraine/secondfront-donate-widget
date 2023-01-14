import React from 'react';
import logo from './logo.svg';
import './App.css';
import Widget from './components/Widget';

export interface AppProps {
  campaign: string;
  hideCollections?: boolean;
  targetCollections?: number;
}

function App(props: AppProps) {
  return (
    <div className="App">
      <Widget campaign={props.campaign} showCollections={!props.hideCollections} targetCollections={props.targetCollections} />
    </div>
  );
}

export default App;
