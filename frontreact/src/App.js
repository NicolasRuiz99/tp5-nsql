import React,{Fragment,useState} from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import { search } from './functions';
import Error from './components/Error';
import CoinInfo from './components/CoinInfo';

const App = () => {

	const [search_query,setSearch_query] = useState ("");
	const [search_result,setSearch_result] = useState (null);
	const [error,setError] = useState (false);

	const searchItem = () => {
		search (search_query)
		.then((res)=>{
			setSearch_result (res);
		})
		.catch((err)=>{
			setError (true);
			return;
		})
		
	}

	return (
		<Fragment>
			<Router>
			<Navbar setSearch_query = {setSearch_query} searchItem={searchItem}/>
			{(error)? <Error mensaje={"Ocurrió un error en el servidor"}/> :null}
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
				<Route exact path="/search_result" render={()=>(
					<CoinInfo 
						item = {search_result}
					/>
				)} />
				<Route exact path="/get_coin/:id" render={(props)=>(
					<CoinInfo 
						id = {props.match.params.id}
					/>
				)} />
			</Switch>
			</Router>
		</Fragment>
	);
}

export default App;