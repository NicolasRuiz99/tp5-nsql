import React,{Fragment} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './components/Home';

const App = () => {
	return (
		<Fragment>
			<Router>
			<Switch>
				<Route exact path="/" component={Home} />
			</Switch>
			</Router>
		</Fragment>
	);
}

export default App;