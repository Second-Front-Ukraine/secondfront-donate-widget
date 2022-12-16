import React from 'react';
import logo from './logo.svg';
import './App.css';
import Widget from './components/Widget';

export interface AppProps {
  campaign: string;
  hideCollections?: boolean;
}

function App(props: AppProps) {
  return (
    <div className="App">
      <Widget campaign={props.campaign} showCollections={!props.hideCollections} />
    </div>
  );
}

export default App;
