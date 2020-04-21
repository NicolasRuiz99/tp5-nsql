import React,{Fragment} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './components/Home';

const App = () => {
	return (
		<Fragment>
			<Router>
			<Switch>
				<Route exact path="/" render={()=>(
					<Home 
						type = {1}
					/>
				)} />
				<Route exact path="/top5" render={()=>(
					<Home 
						type = {2}
					/>
				)} />
				<Route exact path="/top20" render={()=>(
					<Home 
						type = {3}
					/>
				)} />
			</Switch>
			</Router>
		</Fragment>
	);
}

export default App;