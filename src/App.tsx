import './App.css';
import Widget from './components/Widget';

export interface AppProps {
	campaign: string;
}

function App(props: AppProps) {
	return (
		<div className="App">
			<Widget campaign={props.campaign} />
		</div>
	);
}

export default App;
